export type ColorTheme = 'blue' | 'pink' | 'green' | 'yellow' | 'purple'
export type IconName = 'code' | 'brain' | 'bot' | 'lightbulb' | 'palette' | 'rocket' | 'zap' | 'globe'

export interface DetailCard {
    title: string
    icon: IconName
    content: string
    highlights: string[]
}

export interface NewsItem {
    id: string
    title: string
    titleHighlight?: string[]
    score: string
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

const TODAY = getDayStr(0)
const YESTERDAY = getDayStr(1)

// Sample data for today
const TODAY_DATA: Omit<NewsItem, 'date'>[] = [
    {
        id: '1',
        title: '智谱AI发布 GLM-4.7 模型',
        titleHighlight: ['GLM-4.7'],
        score: '9.9',
        theme: 'blue',
        manufacturer: 'Zhipu AI',
        details: [
            {
                title: '编码突破',
                icon: 'code',
                content: 'GLM-4.7 在 SWE-bench 得分 73.8%，位列开源模型第一。',
                highlights: ['GLM-4.7', 'SWE-bench']
            },
            {
                title: '推理增强',
                icon: 'brain',
                content: '在 AIME 2025 中超越 Claude Sonnet 4.5，HLE 得分 42.8%。',
                highlights: ['AIME 2025', 'Claude Sonnet 4.5', 'HLE']
            },
            {
                title: 'Agent 能力',
                icon: 'bot',
                content: '在 τ²-Bench 评价中获 87.4 分，接近 Claude Sonnet 4.5 水平。',
                highlights: ['τ²-Bench', 'Claude Sonnet 4.5']
            },
            {
                title: '思考模式',
                icon: 'lightbulb',
                content: '引入 Interleaved Thinking 等模式，提升指令遵循与长程任务处理能力。',
                highlights: ['Interleaved Thinking']
            },
            {
                title: 'Vibe Coding',
                icon: 'palette',
                content: '增强前端视觉审美，生成布局和谐、配色现代的网页与幻灯片。',
                highlights: []
            },
            {
                title: '开源上线',
                icon: 'rocket',
                content: '已在 HuggingFace 和 ModelScope 开源，支持 vLLM 本地部署。',
                highlights: ['HuggingFace', 'ModelScope', 'vLLM']
            }
        ]
    },
    {
        id: '2',
        title: 'MiniMax Agent 平台上线 MiniMax M2.1 模型',
        titleHighlight: ['MiniMax', 'M2.1'],
        score: '9.8',
        theme: 'pink',
        manufacturer: 'MiniMax',
        details: [
            {
                title: '性能提升',
                icon: 'zap',
                content: 'M2.1 在复杂逻辑推理任务上速度提升 30%。',
                highlights: ['M2.1']
            },
            {
                title: '平台集成',
                icon: 'globe',
                content: '无缝集成至 MiniMax Agent 平台，支持一键部署。',
                highlights: ['MiniMax Agent']
            }
        ]
    },
    {
        id: '3',
        title: '月之暗面分享Kimi K2 企业Agent应用',
        titleHighlight: ['Kimi', 'K2'],
        score: '9.8',
        theme: 'purple',
        manufacturer: 'Moonshot',
        details: [
            {
                title: '企业级安全',
                icon: 'bot',
                content: 'K2 模型引入了全新的企业级数据隔离技术。',
                highlights: ['K2']
            }
        ]
    },
    {
        id: '4',
        title: 'Wan发布商用级图像生成模型 Wan2.6-Image',
        titleHighlight: ['Wan2.6-Image'],
        score: '9.7',
        theme: 'yellow',
        manufacturer: 'Alibaba',
        details: [
            {
                title: '高分辨率',
                icon: 'palette',
                content: '支持原生 4K 分辨率生成，细节丰富。',
                highlights: ['4K']
            }
        ]
    },
    {
        id: '5',
        title: 'Anthropic开源官方Agent Skills仓库',
        titleHighlight: ['Agent Skills'],
        score: '9.6',
        theme: 'yellow',
        manufacturer: 'Anthropic',
        details: [
            {
                title: '开发者生态',
                icon: 'code',
                content: '提供超过 50+ 官方验证的 Tool Use 案例。',
                highlights: ['Tool Use']
            }
        ]
    },
    {
        id: '6',
        title: 'Codex新增后台进程实验性功能',
        titleHighlight: [],
        score: '9.5',
        theme: 'green',
        manufacturer: 'OpenAI',
        details: [
            {
                title: '后台执行',
                icon: 'zap',
                content: '允许 Codex 在后台持续运行长耗时任务。',
                highlights: ['Codex']
            }
        ]
    },
    {
        id: '7',
        title: 'OpenAI推出年度回顾功能"Your Year with ChatGPT"',
        titleHighlight: ['ChatGPT'],
        score: '9.5',
        theme: 'green',
        manufacturer: 'OpenAI',
        details: [
            {
                title: '个性化报告',
                icon: 'lightbulb',
                content: '基于用户全年的对话数据生成个性化总结。',
                highlights: []
            }
        ]
    },
    {
        id: '8',
        title: 'Google Colab 预装 Gemini CLI',
        titleHighlight: ['Colab', 'Gemini CLI'],
        score: '9.3',
        theme: 'blue',
        manufacturer: 'Google',
        details: [
            {
                title: '便捷开发',
                icon: 'code',
                content: '开发者无需安装即可直接在 Notebook 中调用 Gemini。',
                highlights: ['Gemini', 'Notebook']
            }
        ]
    }
]

// Sample data for yesterday
const YESTERDAY_DATA: Omit<NewsItem, 'date'>[] = [
    {
        id: 'y1',
        title: 'Mistral发布 Mistral Large 2',
        titleHighlight: ['Mistral Large 2'],
        score: '9.8',
        theme: 'yellow',
        manufacturer: 'Mistral',
        details: [
            {
                title: '旗舰模型',
                icon: 'brain',
                content: '123B 参数，在代码生成和推理能力上比肩 GPT-4o。',
                highlights: ['123B', 'GPT-4o']
            }
        ]
    },
    {
        id: 'y2',
        title: 'Stability AI推出 Stable Video 4D',
        titleHighlight: ['Stable Video 4D'],
        score: '9.6',
        theme: 'purple',
        manufacturer: 'Stability AI',
        details: [
            {
                title: '多视角视频',
                icon: 'palette',
                content: '可以从单一视频生成多个视角的动态3D视频内容。',
                highlights: ['3D视频']
            }
        ]
    },
    {
        id: 'y3',
        title: 'Apple Intelligence 开发者预览版更新',
        titleHighlight: ['Apple Intelligence'],
        score: '9.4',
        theme: 'pink',
        manufacturer: 'Apple',
        details: [
            {
                title: 'Siri 升级',
                icon: 'bot',
                content: 'Siri 获得了屏幕感知能力，可跨应用执行复杂指令。',
                highlights: ['Siri', '屏幕感知']
            }
        ]
    }
]

// Combine and add date fields
export const NEWS_DATA: NewsItem[] = [
    ...TODAY_DATA.map(item => ({ ...item, date: TODAY })),
    ...YESTERDAY_DATA.map(item => ({ ...item, date: YESTERDAY })),
]

// Filter news by date
export function getNewsByDate(date: string): NewsItem[] {
    return NEWS_DATA.filter(item => item.date === date)
}
