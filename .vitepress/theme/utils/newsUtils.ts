export type ColorTheme = 'blue' | 'pink' | 'green' | 'yellow' | 'purple'
export type IconName = 'code' | 'brain' | 'bot' | 'lightbulb' | 'palette' | 'rocket' | 'zap' | 'globe'

export interface DetailCard {
    title: string
    icon: IconName
    content: string
    highlights?: string[]
}

export interface NewsItem {
    id: string
    title: string
    titleHighlight?: string[]
    score?: string
    theme: ColorTheme
    manufacturer: string
    details: DetailCard[]
    date: string
}

// Brand colors mapping
const brandColors: Record<string, string> = {
    'OpenAI': '#10a37f',
    'Google': '#4285F4',
    'Microsoft': '#00a4ef',
    'Anthropic': '#d97757',
    'Nvidia': '#76b900',
    'Zhipu AI': '#3370ff',
    'MiniMax': '#ff4d4f',
    'Moonshot': '#3A0088',
    'Alibaba': '#ff6a00',
    'Mistral': '#f6c444',
    'Stability AI': '#7D55C7',
    'Apple': '#000000',
    'Jan': '#a3278f',
    'Meta': '#0668E1',
    'Unknown': '#666666'
}

export function getBrandColor(manufacturer: string): string {
    return brandColors[manufacturer] || brandColors['Unknown']
}

// Helper to format date as YYYY-MM-DD
export function getDayStr(offset: number = 0): string {
    const d = new Date()
    d.setDate(d.getDate() - offset)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Generate date list for sidebar
export function generateDateList(days: number = 30) {
    const dateList = []
    for (let i = 0; i < days; i++) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const date = String(d.getDate()).padStart(2, '0')

        const dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]

        dateList.push({
            fullDate: `${year}-${month}-${date}`,
            displayDate: `${parseInt(month)}月${parseInt(date)}日`,
            weekDay: dayName,
            isToday: i === 0
        })
    }
    return dateList
}
