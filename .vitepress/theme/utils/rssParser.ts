import { XMLParser } from 'fast-xml-parser'
import { parse } from 'node-html-parser'
import type { HTMLElement } from 'node-html-parser'
import type { ColorTheme, IconName, NewsItem } from './newsUtils'

export const RSS_URL = 'https://daily.juya.uk/rss.xml'

/** 分类 -> 配色 / 图标，用于替代 RSS 未提供的 theme、manufacturer */
const CATEGORY_STYLE: Record<string, { theme: ColorTheme; icon: IconName }> = {
    '要闻': { theme: 'pink', icon: 'zap' },
    '模型发布': { theme: 'green', icon: 'rocket' },
    '开发生态': { theme: 'blue', icon: 'code' },
    '产品应用': { theme: 'yellow', icon: 'lightbulb' },
    '技术与洞察': { theme: 'purple', icon: 'brain' },
    '行业动态': { theme: 'blue', icon: 'globe' },
    '前瞻与传闻': { theme: 'yellow', icon: 'lightbulb' },
    '其他': { theme: 'purple', icon: 'globe' }
}

const FALLBACK_STYLE = { theme: 'blue' as ColorTheme, icon: 'globe' as IconName }

/** 只保留 http(s) 链接，丢弃 javascript: 等协议 */
function safeUrl(href: string | null | undefined): string | null {
    if (!href) return null
    return /^https?:\/\//i.test(href) ? href : null
}

interface RawEntry {
    category: string
    title: string
    url: string | null
    summary: string
    paragraphs: string[]
    images: string[]
    links: string[]
}

/**
 * 把一期早报的 content:encoded HTML 切成条目。
 * 结构固定：<h2>概览</h2> + <h3>分类</h3>/<ul>…</ul>，随后每类一个
 * <h2>分类名</h2>，每条目为 <h3>标题 <code>#N</code></h3> 加摘要/正文/图片/链接。
 */
function parseIssueContent(html: string): RawEntry[] {
    const root = parse(html)
    const container = root.querySelector('div') || root
    const nodes = container.childNodes.filter(n => n.nodeType === 1) as HTMLElement[]

    const entries: RawEntry[] = []
    let inDetail = false
    let category: string | null = null
    let current: RawEntry | null = null

    const flush = () => {
        if (current) entries.push(current)
        current = null
    }

    for (const node of nodes) {
        const tag = node.rawTagName

        if (tag === 'h2') {
            flush()
            const heading = node.text.trim()
            inDetail = heading !== '概览'
            category = inDetail ? heading : null
            continue
        }

        if (!inDetail) continue

        if (tag === 'h3') {
            flush()
            current = {
                category: category ?? '其他',
                title: node.text.replace(/#\d+/g, '').trim(),
                url: safeUrl(node.querySelector('a')?.getAttribute('href')),
                summary: '',
                paragraphs: [],
                images: [],
                links: []
            }
            continue
        }

        if (!current) continue

        if (tag === 'blockquote') {
            current.summary = node.text.trim()
        } else if (tag === 'p') {
            const imgNodes = node.querySelectorAll('img')
            if (imgNodes.length > 0) {
                for (const img of imgNodes) {
                    const src = safeUrl(img.getAttribute('src'))
                    if (src) current.images.push(src)
                }
            } else {
                const text = node.text.trim()
                if (text) current.paragraphs.push(text)
            }
        } else if (tag === 'ul') {
            for (const li of node.querySelectorAll('li')) {
                const href = safeUrl(li.querySelector('a')?.getAttribute('href'))
                if (href && !current.links.includes(href)) current.links.push(href)
            }
        }
    }

    flush()
    return entries
}

export interface ParsedIssue {
    date: string
    link: string | null
    title: string
    items: NewsItem[]
}

export function parseRssFeed(xml: string): ParsedIssue[] {
    const parser = new XMLParser({
        ignoreAttributes: false,
        trimValues: true,
        processEntities: true
    })
    const doc = parser.parse(xml)
    const rawItems = doc?.rss?.channel?.item
    const list = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : []

    const issues: ParsedIssue[] = []

    for (const raw of list) {
        const content = raw['content:encoded'] ?? ''
        if (!content) continue

        // item 的 title 是日期（2026-11-25），缺失时回退到 pubDate
        const dateRaw = String(raw.title ?? '').trim()
        const date = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw)
            ? dateRaw
            : new Date(String(raw.pubDate ?? '')).toISOString().slice(0, 10)

        // fast-xml-parser 已通过 processEntities 解码实体，node-html-parser
        // 也会解码残余实体，这里不能再手动解一次，否则 URL 里的 &times;
        // 会被转成 ×，破坏链接
        const entries = parseIssueContent(String(content))
        if (entries.length === 0) continue

        const items: NewsItem[] = entries.map((entry, index) => {
            const style = CATEGORY_STYLE[entry.category] ?? FALLBACK_STYLE
            return {
                id: `${date}-${index}`,
                date,
                title: entry.title,
                // RSS 未提供高亮词，凭空推断会在中文标点周围产生多余间距
                titleHighlight: [],
                theme: style.theme,
                category: entry.category,
                summary: entry.summary,
                images: entry.images,
                links: entry.links,
                details: [{
                    title: entry.category,
                    icon: style.icon,
                    content: entry.summary || entry.paragraphs[0] || entry.title,
                    highlights: [],
                    paragraphs: entry.paragraphs
                }]
            }
        })

        issues.push({
            date,
            link: safeUrl(raw.link),
            title: date,
            items
        })
    }

    return issues.sort((a, b) => b.date.localeCompare(a.date))
}
