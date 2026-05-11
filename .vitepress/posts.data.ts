/*
 * @Author: Alex yxfacw@163.com
 * @Date: 2025-01-10 13:22:23
 * @LastEditTime: 2026-05-11 14:03:32
 * @LastEditors: parselife@gmail.com
 * @Description: .
 */
import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  date: string;
  // 文章摘要
  excerpt?: string
  tags?: string[];
}

declare const data: Post[];
export { data, type Post };

// 读取 posts 目录下所有 markdown 文件
export default createContentLoader("../src/posts/p-*.md", {
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => {
        return {
          title: frontmatter.title,
          url: `${url}`,
          date: formatDate(frontmatter.date),
          excerpt: frontmatter.excerpt,
          tags: frontmatter.tags || [],
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  },
});

// 格式化日期
function formatDate(raw: string): string {
  const date = new Date(raw);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
