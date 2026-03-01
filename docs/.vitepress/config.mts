import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "xiaoya-note",
  description: "小雅指南笔记",
  outDir: '../dist',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      {
        text: '小雅指南',
        items: [
          { text: '一、xiaoya是什么', link: '/what-is-xiaoya' },
          { text: '二、安装xiaoya准备工作', link: '/preparation' },
          { text: '三、安装指南', link: '/installation' },
          { text: '四、使用指南', link: '/usage' },
          { text: '五、进阶指南', link: '/advanced' },
          { text: '六、常见问题', link: '/faq' },
          { text: '七、一些有的没的', link: '/other' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaoya-note' }
    ]
  }
})
