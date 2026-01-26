export interface ICartItem {
  id: number;
  cartId: number;
  itemId: number;
  quantity: number;
  unitPriceSnapshot: number;
  notes: string | null;
  difinitionId: string;
  genralId: number;
}
