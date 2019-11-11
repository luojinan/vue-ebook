export function themeList(vue) {
  return [{
      name: '默认', // 用于传入epubjs切换主题（只传中文）
      desc: vue.$t('book.themeDefault'), // 用于国际化显示主题名（中英文等）
      style: {
        body: {
          color: '#000',
          background: '#fff'
        }
      }
    },
    {
      name: '护眼',
      desc: vue.$t('book.themeEye'),
      style: {
        body: {
          color: '#000',
          background: '#ceeaba'
        }
      }
    },
    {
      name: '夜间',
      desc: vue.$t('book.themeNight'),
      style: {
        body: {
          color: '#fff',
          background: '#000'
        }
      }
    },
    {
      name: '金黄',
      desc: vue.$t('book.themeGold'),
      style: {
        body: {
          color: '#000',
          background: '#FFD700'
        }
      }
    }
  ]
}

export const fontFamilyList = ['Default', 'Cabin', 'Days One', 'Montserrat', 'Tangerine']

export default {
  themeList,
  fontFamilyList
}