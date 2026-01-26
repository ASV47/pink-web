import { ICartItem } from './icart-item';

export interface ICart {
  id: number;
  customerId: number;
  anonymousId: string | null;
  status: number;
  expiresAt: string;
  items: ICartItem[];
  difinitionId: string | null;
  genralId: number | null;
}
