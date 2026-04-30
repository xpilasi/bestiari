import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(markdownItAnchor)

export function renderMarkdown(content) {
  return md.render(content || '')
}
