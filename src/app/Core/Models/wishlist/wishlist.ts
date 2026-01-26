import { IWishListItems } from './IWish-list-items';

export interface Wishlist {
  id: number;
  name: string;
  customerId: number;
  wishListItems: IWishListItems[];
  difinitionId: string | null;
  genralId: number | null;
}
