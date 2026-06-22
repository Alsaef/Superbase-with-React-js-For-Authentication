import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
}

export function extractHeadings(content: string) {
  const headingRegex = /#{2,4}\s+(.+?)(?=\n|$)/g;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      id: slugify(match[1]),
      text: match[1],
      level: match[0].split("#").length - 1,
    });
  }

  return headings;
}

export function generateTableOfContents(headings: Array<{ id: string; text: string; level: number }>) {
  const toc: any = [];
  let lastLevel = 2;
  let lastParent: any = null;

  headings.forEach((heading) => {
    const item = { id: heading.id, text: heading.text, level: heading.level, children: [] };

    if (heading.level > lastLevel) {
      if (lastParent) {
        lastParent.children.push(item);
      } else {
        toc.push(item);
      }
      lastParent = item;
    } else if (heading.level === lastLevel) {
      if (lastParent?.children) {
        lastParent.children.push(item);
      } else {
        toc.push(item);
      }
    } else {
      toc.push(item);
      lastParent = null;
    }

    lastLevel = heading.level;
  });

  return toc;
}
