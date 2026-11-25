import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NewsItem } from '../utils/newsUtils'
import { parseRssFeed, RSS_URL } from '../utils/rssParser'

declare const data: NewsItem[]
export { data }

const here = path.dirname(fileURLToPath(import.meta.url))
const CACHE_FILE = path.resolve(here, '../../cache/news-rss.json')

/**
 * 构建时抓取 RSS 并解析。网络不可用时回退到上次成功抓取的缓存，
 * 避免线上构建因为源站抖动而失败。
 */
export default {
    async load(): Promise<NewsItem[]> {
        let xml: string | null = null

        try {
            const response = await fetch(RSS_URL, {
                headers: { 'User-Agent': 'AIFLASH-static-site-builder' },
                signal: AbortSignal.timeout(30_000)
            })
            if (!response.ok) {
                throw new Error(`RSS 请求失败: HTTP ${response.status}`)
            }
            xml = await response.text()
        } catch (error) {
            console.warn(`[news] 抓取 RSS 失败，尝试使用缓存: ${error}`)
        }

        if (xml) {
            try {
                const items = parseRssFeed(xml).flatMap(issue => issue.items)
                fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
                fs.writeFileSync(CACHE_FILE, JSON.stringify(items, null, 2), 'utf-8')
                return items
            } catch (error) {
                console.warn(`[news] 解析 RSS 失败，尝试使用缓存: ${error}`)
            }
        }

        if (fs.existsSync(CACHE_FILE)) {
            const items = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as NewsItem[]
            console.warn(`[news] 使用缓存数据，共 ${items.length} 条`)
            return items
        }

        console.warn('[news] 无可用数据，返回空列表')
        return []
    }
}
