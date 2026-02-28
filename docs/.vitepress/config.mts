import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "xiaoya-note",
  description: "小雅指南笔记",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      {
        text: '小雅指南',
        items: [
          { text: '指南', link: '/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaoya-note' }
    ]
  }
})
