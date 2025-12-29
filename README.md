# AIFLASH

每日 AI 行业动态速览，Neo-Pop 风格设计的 VitePress 站点。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产构建
npm run docs:preview
```

## 内容创作

### 添加每日早报

在 `docs/news/` 目录下创建 Markdown 文件，文件名格式为 `YYYY-MM-DD.md`：

```bash
# 创建今日早报
touch docs/news/2024-12-29.md
```

### Markdown 格式

```yaml
---
date: 2024-12-29
news:
  - title: 新闻标题
    titleHighlight: [需要高亮的关键词]
    score: "9.5"
    theme: blue          # blue | pink | green | yellow | purple
    manufacturer: OpenAI # 厂商名称
    details:
      - title: 要点标题
        icon: code       # code | brain | bot | lightbulb | palette | rocket | zap | globe
        content: 详细内容描述
        highlights: [内容中的高亮词]
      - title: 第二个要点
        icon: brain
        content: 另一段详细内容
---
```

### 支持的厂商

自带 Logo：`OpenAI`、`Google`、`Microsoft`、`Apple`

自动首字母：`Anthropic`、`Nvidia`、`Zhipu AI`、`MiniMax`、`Moonshot`、`Alibaba`、`Mistral`、`Stability AI`、`Jan`、`Meta`

### 更新流程

1. 在 `docs/news/` 下创建 `YYYY-MM-DD.md` 文件
2. 填写 frontmatter（参考上方格式）
3. 运行 `npm run docs:dev` 预览
4. 提交更改：
   ```bash
   git add .
   git commit -m "news: 2024-12-29 AIFLASH"
   ```

## 项目结构

```
docs/
├── index.md              # 首页入口
└── news/                 # 📝 每日早报 Markdown 文件
    ├── 2024-12-28.md
    └── 2024-12-27.md
.vitepress/
├── config.mts            # VitePress 配置
└── theme/
    ├── components/       # Vue 组件
    ├── layouts/          # 布局组件
    └── data/
        └── news.data.ts  # 数据加载器
```

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成
- [Vue 3](https://vuejs.org/) - 前端框架
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Lucide Icons](https://lucide.dev/) - 图标库
