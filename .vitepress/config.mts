import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "AI 早报",
  description: "每日 AI 行业动态速览",

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    // Disable default navigation
    nav: [],
    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
