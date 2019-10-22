import { mapGetters,mapMutations } from 'vuex'

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
    })
  }
}
