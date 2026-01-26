export interface ICartItemAddRequest {
  cartId: number;
  itemId: number;
  customerId: number;
  quantity: number;
  unitPriceSnapshot: number;
  notes: string | null;
}
