import { computed, inject, Injectable } from '@angular/core';
import { CartApiService } from './cart-api-service';
import { CartItemApiService } from './cart-item-api-service';
import { ICartItem } from '../../Models/Cart/icart-item';
import { ICartItemAddRequest } from '../../Models/Cart/icart-item-add-request';
import { ICartItemDecreaseRequest } from '../../Models/Cart/icart-item-decrease-request';
import { catchError, EMPTY, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartFacadeService {
  private cartApi = inject(CartApiService);
  private cartItemApi = inject(CartItemApiService);

  cart = this.cartApi.cart;
  isCartLoading = this.cartApi.isLoading;
  isItemLoading = this.cartItemApi.isLoading;

  //! computed values
  items = computed(() => this.cart()?.items ?? []);
  totalQty = computed(() => this.items().reduce((sum, it) => sum + (it.quantity ?? 0), 0));
  totalPrice = computed(() =>
    this.items().reduce((sum, it) => sum + (it.quantity ?? 0) * (it.unitPriceSnapshot ?? 0), 0),
  );
  freeShippingThreshold = 500;

  shippingProgress = computed(() => {
    const total = this.totalPrice();
    const pct = (total / this.freeShippingThreshold) * 100;
    return Math.max(0, Math.min(100, pct));
  });

  remainingToFreeShipping = computed(() => {
    const remaining = this.freeShippingThreshold - this.totalPrice();
    return Math.max(0, remaining);
  });

  hasFreeShipping = computed(() => this.totalPrice() >= this.freeShippingThreshold);

  //! ===== API actions =====
  refresh(customerId: number) {
    return this.cartApi.getActiveCart(customerId);
  }

  canClick(): boolean {
    return !this.isCartLoading() && !this.isItemLoading();
  }

  add(item: ICartItem): void {
    const c = this.cart();
    if (!c) return;

    const req: ICartItemAddRequest = {
      cartId: c.id,
      customerId: c.customerId,
      itemId: item.itemId,
      quantity: 1,
      unitPriceSnapshot: item.unitPriceSnapshot ?? 0,
      notes: item.notes ?? null,
    };

    this.cartItemApi
      .add(req)
      .pipe(
        switchMap(() => this.refresh(c.customerId)),
        catchError((err) => {
          console.error('add failed', err);
          return EMPTY;
        }),
      )
      .subscribe();
  }
  decrease(item: ICartItem): void {
    const c = this.cart();
    if (!c) return;

    const req: ICartItemDecreaseRequest = {
      cartId: c.id,
      customerId: c.customerId,
      itemId: item.itemId,
      quantity: 1,
      unitPriceSnapshot: item.unitPriceSnapshot ?? 0,
      notes: item.notes ?? null, // خليه consistent
    };

    this.cartItemApi
      .decrease(req)
      .pipe(
        switchMap(() => this.refresh(c.customerId)),
        catchError((err) => {
          console.error('decrease failed', err);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  remove(item: ICartItem): void {
    const c = this.cart();
    if (!c || !item.id) return;

    this.cartItemApi
      .remove(item.id)
      .pipe(
        switchMap(() => this.refresh(c.customerId)),
        catchError((err) => {
          console.error('remove failed', err);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  //! ===== Display helpers =====
  displayName(item: ICartItem): string {
    return (item as any).productName ?? item.notes ?? `Item #${item.itemId}`;
  }
}
