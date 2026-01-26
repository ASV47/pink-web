import { Component, computed, inject } from '@angular/core';
import { PopupService, PopupType } from '../../Core/Services/popup/popup-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartFacadeService } from '../../Core/Services/cart/cart-facade-service';
import { ICartItem } from '../../Core/Models/Cart/icart-item';
import { WishListFacadeService } from '../../Core/Services/wichlist/wish-list-facade-service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  activePopup: PopupType | null = null;
  accountView: 'login' | 'signup' | 'reset' = 'login';
  private cartFacade = inject(CartFacadeService);
  cart = this.cartFacade.cart;
  items = this.cartFacade.items;
  totalQty = this.cartFacade.totalQty;
  totalPrice = this.cartFacade.totalPrice;
  private wishFacade = inject(WishListFacadeService);

  isCartLoading = this.cartFacade.isCartLoading;
  isItemLoading = this.cartFacade.isItemLoading;
  // ! wishlist
  wishItems = this.wishFacade.items;
  wishTotalQty = this.wishFacade.totalQty;
  isWishLoading = this.wishFacade.isWishListLoading;
  isWishItemLoading = this.wishFacade.isItemLoading;
  // ! freeShippingThreshold
  freeShippingThreshold = this.cartFacade.freeShippingThreshold;
  shippingProgress = this.cartFacade.shippingProgress;
  remainingToFreeShipping = this.cartFacade.remainingToFreeShipping;
  hasFreeShipping = this.cartFacade.hasFreeShipping;
  constructor(private popupService: PopupService) {
    this.popupService.popup$.pipe(takeUntilDestroyed()).subscribe((type) => {
      this.activePopup = type;
      if (type === 'login' || type === 'signup') this.accountView = type;
      if (type === 'cart') this.refresh();
      if (type === 'wishlist') this.refreshWishlist();
    });
  }
  customerId = 3;
  refresh() {
    this.cartFacade.refresh(this.customerId).subscribe();
  }
  refreshWishlist() {
    this.wishFacade.refresh(this.customerId).subscribe();
  }
  add(item: ICartItem) {
    this.cartFacade.add(item);
  }
  decrease(item: ICartItem) {
    this.cartFacade.decrease(item);
  }
  removeItem(item: ICartItem) {
    this.cartFacade.remove(item);
  }
  canClick() {
    return this.cartFacade.canClick();
  }
  displayName(item: ICartItem) {
    return this.cartFacade.displayName(item);
  }
  removeWishItem(wishListItemId: number) {
    this.wishFacade.removeItem(this.customerId, wishListItemId);
    this.refreshWishlist();
  }

  close() {
    this.popupService.close();
    this.accountView = 'login';
  }
}
