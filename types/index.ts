export interface DocMeta {
  title: string;
  description: string;
  slug: string;
  order: number;
  category?: string;
}

export interface DocPage extends DocMeta {
  content: string;
  headings: HeadingItem[];
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  content: string;
}

export interface NavItem {
  title: string;
  slug?: string;
  items?: NavItem[];
  category?: string;
}
