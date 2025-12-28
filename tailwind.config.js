/** @type {import('tailwindcss').Config} */
export default {
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
            }
        },
    },
    plugins: [],
}
