// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { useData } from 'vitepress'

// Import custom components
import HomeLayout from './layouts/HomeLayout.vue'
import Logo from './components/Logo.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'nav-bar-title-before': () => {
                const { isDark } = useData()
                return h(Logo, { isDark: isDark.value, size: 'md' })
            }
        })
    },
    enhanceApp({ app, router, siteData }) {
        // Register global components
        app.component('HomeLayout', HomeLayout)
        app.component('Logo', Logo)
    }
} satisfies Theme
