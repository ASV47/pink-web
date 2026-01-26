export interface IShopliftItem {
  id: number;

  itemId: number;
  itemNameArabic: string | null;
  itemNameEnglish: string | null;
  itemName: string | null;

  slug: string | null;

  isPublished: boolean;
  publishedAt: string | null;

  onlinePrice: number;
  compareAtPrice: number | null;

  brandId: number | null;
  brandNameArabic: string | null;
  brandEnglish: string | null;
  brandName: string | null;

  seoTitle: string | null;
  seoDescription: string | null;

  averageRating: number;
  reviewsCount: number;

  difinitionId: string | null;
  genralId: number | null;
}
