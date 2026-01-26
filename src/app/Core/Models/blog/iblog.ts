export interface IBlog {
  id: number;
  title: string;
  slug: string;
  contentHtml: string;
  excerpt: string;
  coverImageId: number | null;
  isPublished: boolean;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  authorName: string;
  difinitionId: string | null;
  genralId: number | null;
}
