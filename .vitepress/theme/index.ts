// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { useData } from 'vitepress'
import VPFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue'

// Import custom components
import HomeLayout from './layouts/HomeLayout.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'layout-bottom': () => {
                 // Use VPFooter if HomeLayout is rendered inside Layout
                 // But since we use HomeLayout as a component inside markdown or as a layout replacement
                 // Wait, index.md uses layout: page and <HomeLayout />.
                 // So DefaultTheme.Layout IS rendered.
                 // We can inject the footer into the 'layout-bottom' slot.
                 return h(VPFooter)
            }
        })
    },
    enhanceApp({ app, router, siteData }) {
        // Register global components
        app.component('HomeLayout', HomeLayout)
    }
} satisfies Theme
