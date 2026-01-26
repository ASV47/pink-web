export interface IWishListItemAddRequest {
  wishListId: number;
  customerId: number;
  itemId: number;
  difinitionId?: string | null;
  genralId?: number | null;
}
