export type ColorTheme = 'blue' | 'pink' | 'green' | 'yellow' | 'purple'
export type IconName = 'code' | 'brain' | 'bot' | 'lightbulb' | 'palette' | 'rocket' | 'zap' | 'globe'

export interface DetailCard {
    title: string
    icon: IconName
    content: string
    highlights?: string[]
    /** 正文段落，RSS 摘要之外的完整内容 */
    paragraphs?: string[]
}

export interface NewsItem {
    id: string
    title: string
    titleHighlight?: string[]
    theme: ColorTheme
    /** 早报分类，如「要闻」「模型发布」 */
    category: string
    /** 一句话摘要 */
    summary: string
    /** 正文配图 */
    images: string[]
    /** 相关链接 */
    links: string[]
    details: DetailCard[]
    date: string
}

// 分类配色
const categoryColors: Record<string, string> = {
    '要闻': '#ff9aa2',
    '模型发布': '#b5e48c',
    '开发生态': '#aed9e0',
    '产品应用': '#fde4cf',
    '技术与洞察': '#d0d1ff',
    '行业动态': '#aed9e0',
    '前瞻与传闻': '#fde4cf',
    '其他': '#94a3b8'
}

export function getCategoryColor(category: string): string {
    return categoryColors[category] || categoryColors['其他']
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

// Generate date list for sidebar from dates that actually have news
export function generateDateList(dateStrings: string[], limit: number = 30) {
    const todayStr = getDayStr(0)

    return Array.from(new Set(dateStrings))
        .sort((a, b) => b.localeCompare(a))
        .slice(0, limit)
        .map(fullDate => {
            const [year, month, date] = fullDate.split('-').map(Number)
            const d = new Date(year, month - 1, date)
            const dayName = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]

            return {
                fullDate,
                displayDate: `${month}月${date}日`,
                weekDay: dayName,
                isToday: fullDate === todayStr
            }
        })
}
