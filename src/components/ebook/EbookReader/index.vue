<template>
  <div class="ebook-reader">
    <div id="reader"></div>
    <div class="ebook-mask" 
      @click="onClickMask"
      @touchmove="move"
      @touchend="moveEnd"></div>

    <!-- 设置目录部分 -->
    <ebook-setting-toc 
      v-if="settingVisible==1"
      :navigation="navigation"
      :tocAvailable="bookAvailable"
    ></ebook-setting-toc>
    <!-- 目录半透明蒙板部分 -->
    <transition name="fade">
      <div class="toc-mask" v-show="settingVisible==1" @click="setSettingVisible(null)"></div>
    </transition>
  </div>
</template>

<script>
import EbookSettingToc from '@/components/ebook/EbookSlide'
import { themeList } from '@/utils/config.js'
import { flatten } from '@/utils/flatten.js'
import { addCss } from '@/utils/cssThemes.js'
import { getLocation } from '@/utils/myStorage.js'
import {
  getFontFamily,
  setFontFamily,
  getFontSize,
  saveFontSize,
  saveTheme,
  getTheme} from '@/utils/myStorage.js'
import { ebookMixin } from '@/utils/mixin.js'
import Epub from 'epubjs'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      rendition: '',
      firstOffsetY:''
    }
  },
  components:{
    EbookSettingToc
  },
  methods: {
    move(e){
      let offsetY = 0
      // 获取拖动的起始Y坐标（使用moveStart好像也可以）
      if(!this.firstOffsetY){
        this.firstOffsetY = e.changedTouches[0].clientY
      }else{
        offsetY = e.changedTouches[0].clientY-this.firstOffsetY
        this.setOffsety(offsetY)  // 拖动的长度存入vuex
      }
      e.preventDefault()  // 禁止默认方法
      e.stopPropagation() // 禁止事件传递（冒泡等？）
    },
    moveEnd(){
      this.setOffsety(0)  // 清除vuex
      this.firstOffsetY = 0 // 重置拖动的起始Y坐标
    },
    onClickMask(e){
      const offsetX = e.offsetX // 点击到的x坐标
      const width = window.innerWidth // 项目的窗口宽度（x最大值）
      if(offsetX>0&&offsetX<width*0.3) this.prePage()
      else if(offsetX>0&&offsetX>width*0.7) this.nextPage()
      else this.showControl()
    },
    // 点击中间蒙板，显示隐藏上下控制栏，带动画效果
    showControl() {
      console.log('点击显示上下控制栏');
      this.setMenuVisible(!this.menuVisible)
      this.fontFamilyVisible && this.setFontFamilyVisible(false)  //关闭字体选择器
    },
    // 点击左边蒙板，触发ebook类的上一页方法
    prePage() {
      console.log('上一页');
      if (this.rendition) {
        this.rendition.prev()
        this.menuVisible && (this.setMenuVisible(false))
      }
    },
    // 点击左边蒙板，触发ebook类的下一页方法
    nextPage() {
      console.log('下一页');
      if (this.rendition) {
        this.rendition.next()
        this.menuVisible && (this.setMenuVisible(false))
      }
    },
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/${this.fileName}.epub`
      const book = new Epub(url)
      this.rendition = book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      })
      this.setCurrentBook(book)
      // 把生成的dom渲染进页面
      // 判断本地是否有进度缓存
      const location = getLocation(this.fileName)
      if (location) {
        this.rendition.display(location).then(() => {
          this.refreshLocation()
        })
      } else {
        this.rendition.display().then(() => {
          this.initFont() // 本地缓存中初始化渲染字体
        })
      }
      this.registerTheme()  // 注册主题
      this.registerFontFamily() // 注册字体
      this.setTheme()  // 初始化主题颜色

      this.getBookInfo(book)  // 获取图书信息
      // 获取locations进度对象（异步）
      book.ready.then(() => {
        return book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))  // 进度
      }).then(() => {
        console.log('异步加载进度完成');
        this.setBookAvailable(true)
        this.refreshLocation()  // 初始化获取不到进度的原因
      })
    },
    getBookInfo(book){
      // 获取图书封面
      book.loaded.cover.then(cover=>{
        book.archive.createUrl(cover).then(url=>{
          this.setCover(url)  // 图书封面存入vuex
        })
      })
      // 获取图片
      book.loaded.metadata.then(metadata=>{
        this.setMetadata(metadata)
      })
      book.loaded.navigation.then(nav=>{
        // 把一维数组转换为多维数组
        const newArr = flatten(nav.toc)
        console.log(newArr,'重构后的目录数组');
        function find(item,level=0) {
          return !item.parent?level:find(newArr.filter(parentItem=>{
            return parentItem.id === item.parent
          })[0],++level)
        }
        newArr.forEach(item => {
          item.level = find(item)
        })
        console.log(newArr,'带上层级的目录数组');
        this.setNavigation(newArr)
      })
    },
    // 从本地缓存初始化字体
    initFont() {
      // 字体
      let font = getFontFamily(this.fileName)
      if (!font) setFontFamily(this.fileName, this.defaultFontFamily)
      else {
        this.rendition.themes.font(font)  // 初始化字体
        this.setFDefaultFontFamily(font)  // 本地缓存的设置存入vuex
      }
      // 字号
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) saveFontSize(this.fileName, this.defaultFontSize)
      else {
        this.rendition.themes.fontSize(`${fontSize}px`)  // 初始化字体大小
        this.setDefaultFontSize(fontSize)  // 本地缓存的设置存入vuex
      }
    },
    // 用到hooks钩子注册字体文件
    registerFontFamily() {
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          console.log('字体全部加载完毕')
        })
      })
    },
    // themes实例注册主题颜色列表
    registerTheme() {
      if (this.rendition.themes) {
        themeList(this).forEach(item => {
          this.rendition.themes.register(item.name, item.style)
        })
      }
    },
    // 初始化主题颜色
    setTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        this.setDefaultTheme(0) // 存入vuex
        saveTheme(this.fileName, 0)  // 存入本地缓存
      }
      if (this.rendition.themes) {
        const themeName = themeList(this)[defaultTheme].name
        this.rendition.themes.select(themeName) // epubjs电子书主题颜色
        addCss(`${process.env.VUE_APP_RES_URL}/fonts/themes/${themeName}.css`) // 项目主题颜色
      }
    },
  },
  mounted() {
    const bookName = this.$route.params.filename.split('|').join('/')
    console.log(bookName)
    this.setFileName(bookName)
    this.initEpub()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/global.scss";
.ebook-reader {
  position: relative;
  .ebook-mask {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  // 目录半透明蒙板部分
  .toc-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>