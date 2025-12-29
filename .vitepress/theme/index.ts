// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import custom components
import HomeLayout from './layouts/HomeLayout.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'nav-bar-content-after': () => h(ThemeToggle)
        })
    },
    enhanceApp({ app, router, siteData }) {
        // Register global components
        app.component('HomeLayout', HomeLayout)
    }
} satisfies Theme
