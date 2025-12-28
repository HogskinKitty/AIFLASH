import fs from 'node:fs'
import matter from 'gray-matter'
import type { NewsItem } from '../utils/newsUtils'

interface NewsMarkdownFrontmatter {
    date: string | Date
    news: Array<Omit<NewsItem, 'id' | 'date'>>
}

declare const data: NewsItem[]
export { data }

export default {
    watch: ['../../../docs/news/*.md'],
    load(watchedFiles: string[]): NewsItem[] {
        const allNews: NewsItem[] = []

        for (const file of watchedFiles) {
            const content = fs.readFileSync(file, 'utf-8')
            const { data: frontmatter } = matter(content) as { data: NewsMarkdownFrontmatter }

            if (!frontmatter?.news || !frontmatter?.date) continue

            // Handle date: YAML may parse it as Date object
            let dateStr: string
            if (frontmatter.date instanceof Date) {
                const d = frontmatter.date
                dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            } else {
                dateStr = String(frontmatter.date)
            }

            frontmatter.news.forEach((item, index) => {
                allNews.push({
                    ...item,
                    id: `${dateStr}-${index}`,
                    date: dateStr,
                    titleHighlight: item.titleHighlight || [],
                    details: (item.details || []).map(d => ({
                        ...d,
                        highlights: d.highlights || []
                    }))
                })
            })
        }

        // Sort by date descending
        return allNews.sort((a, b) => b.date.localeCompare(a.date))
    }
}
