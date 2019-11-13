import { mapGetters,mapMutations } from 'vuex'
import {saveLocation} from '@/utils/myStorage.js'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ])
  },
  methods: {
    ...mapMutations({
      setFileName:'SET_FILENAME',
      setMenuVisible:'SET_MENU_VISIBLE',
      setSettingVisible:'SET_SETTING_VISIBLE',
      setDefaultFontSize:'SET_DEFAULT_FONT_SIZE',
      setFDefaultFontFamily:'SET_DEFAULT_FONT_FAMILY',
      setFontFamilyVisible:'SET_FONT_FAMILY_VISIBLE',
      setDefaultTheme:'SET_DEFAULT_THEME',
      setBookAvailable:'SET_BOOK_AVAILABLE',
      setProgress:'SET_PROGRESS',
      setSection:'SET_SECTION',
      setIsPaginating:'SET_IS_PAGINATING',
      setCurrentBook:'SET_CURRENT_BOOK',
      setNavigation:'SET_NAVIGATION',
      setCover:'SET_COVER',
      setMetadata:'SET_METADATA',
      setPaginate:'SET_PAGINATE',
      setPageList:'SET_PAGELIST',
      setOffsety:'SET_OFFSETY',
      setIsBookMark:'SET_IS_BOOKMARK',
      setSpeakingIconBottom:'SET_SPEAKING_ICON_BOTTOM'
    }),
    
    refreshLocation() {
      // 获取当前进度对象，当前页面的cfi
      const currentLocation = this.currentBook.rendition.currentLocation()
      console.log(currentLocation, '当前进度对象')
      const startCfi = currentLocation.start.cfi
      saveLocation(this.fileName,startCfi)  // 把当前页面的cfi索引存入本地缓存，用于初始化
      // 获取百分比，传入当前页面的cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))  //转为百分值，并取整存入vuex
      this.setSection(currentLocation.start.index)  // 当前章节存入vuex，用于初始化显示章节名
    }
  }
}
