/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './docs/**/*.{md,vue}',
        './.vitepress/**/*.{js,ts,vue}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans SC"', 'sans-serif'],
            },
            colors: {
                'neo-pink': '#ff9aa2',
                'neo-blue': '#aed9e0',
                'neo-green': '#b5e48c',
                'neo-yellow': '#fde4cf',
                'neo-purple': '#d0d1ff',
                'neo-bg': '#fcfbf7',
                // Dark theme colors
                'dark-neo-pink': '#c4556a',
                'dark-neo-blue': '#3b82f6',
                'dark-neo-green': '#22c55e',
                'dark-neo-yellow': '#fbbf24',
                'dark-neo-purple': '#8b5cf6',
                'dark-neo-bg': '#1a1a1a',
                'dark-neo-card': '#2a2a2a',
            }
        },
    },
    plugins: [],
}
