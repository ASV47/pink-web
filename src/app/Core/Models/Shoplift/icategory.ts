export interface ICategory {
  id: number;
  number: string;
  name: string;
  description: string | null;
  childs: unknown | null;
  level: number;
  parentId: number;
  isContainChild: boolean;
  totalChildern: number | null;
  difinitionId: string;
  genralId: number;
  nameArabic: string | null;
  descriptionAr: string | null;
  nameEnglish: string | null;
  descriptionEn: string | null;
  parentName: string | null;
}
