import { ICategory } from './icategory';

export interface IShopliftItem {
  id: number;
  code: string;
  previousCode: string;
  number: string;
  name: string | null;
  description: string | null;
  barCode: string;
  location: string;
  highlimit: number;
  lowlimit: number;
  orderlimit: number;
  imagePath: string;
  factoryNumber: string;
  lifeSpan: number;
  categoryId: number;
  category: ICategory;
  unitId: number;
  unitName: string;
  itemTypeId: number;
  itemTypeName: string;
  factoryType: string;
  storeId: number;
  storeName: string | null;
  difinitionId: string;
  genralId: number | null;
  nameArabic: string | null;
  descriptionAr: string | null;
  nameEnglish: string | null;
  descriptionEn: string | null;
}
