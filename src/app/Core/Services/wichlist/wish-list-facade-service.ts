import { computed, inject, Injectable } from '@angular/core';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { IWishListItemAddRequest } from '../../Models/wishlist/iwish-list-item-add-request';
import { WishListApiService } from './wish-list-api-service';
import { WishListItemApiService } from './wish-list-item-api-service';

@Injectable({
  providedIn: 'root',
})
export class WishListFacadeService {
  private wlApi = inject(WishListApiService);
  private wlItemApi = inject(WishListItemApiService);

  wishList = this.wlApi.wishList;
  isWishListLoading = this.wlApi.isLoading;
  isItemLoading = this.wlItemApi.isLoading;

  items = computed(() => this.wishList()?.wishListItems ?? []);
  totalQty = computed(() => this.items().length);

  canClick = computed(() => !this.isWishListLoading() && !this.isItemLoading());

  refresh(customerId: number) {
    return this.wlApi.getActiveWishList(customerId);
  }

  hasItem(itemId: number): boolean {
    return this.items().some((x) => x.itemId === itemId);
  }

  addItem(customerId: number, itemId: number): void {
    const wl = this.wishList();
    if (!wl) return;

    if (this.hasItem(itemId)) return;

    const req: IWishListItemAddRequest = {
      wishListId: wl.id,
      customerId,
      itemId,
    };

    this.wlItemApi
      .add(req)
      .pipe(
        switchMap(() => this.refresh(customerId)),
        catchError((err) => {
          console.error('addItem failed', err);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  removeItem(customerId: number, itemId: number): void {
    const wl = this.wishList();
    if (!wl) return;

    this.wlItemApi
      .removeItem(customerId, wl.id, itemId)
      .pipe(
        switchMap(() => this.refresh(customerId)),
        catchError((err) => {
          console.error('removeItem failed', err);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  toggle(customerId: number, itemId: number): void {
    const existing = this.items().find((x) => x.itemId === itemId);
    if (existing) this.removeItem(customerId, itemId);
    else this.addItem(customerId, itemId);
  }

  clear(): void {
    this.wlApi.clearState();
  }
}
