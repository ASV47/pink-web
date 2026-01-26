import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartFacadeService } from '../../../Core/Services/cart/cart-facade-service';
import { ICartItem } from '../../../Core/Models/Cart/icart-item';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslateModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartFacade = inject(CartFacadeService);
  private router = inject(Router);

  cart = this.cartFacade.cart;
  items = this.cartFacade.items;
  totalQty = this.cartFacade.totalQty;
  totalPrice = this.cartFacade.totalPrice;

  isCartLoading = this.cartFacade.isCartLoading;
  isItemLoading = this.cartFacade.isItemLoading;

  freeShippingThreshold = this.cartFacade.freeShippingThreshold;
  shippingProgress = this.cartFacade.shippingProgress;
  remainingToFreeShipping = this.cartFacade.remainingToFreeShipping;
  hasFreeShipping = this.cartFacade.hasFreeShipping;

  customerId = 3;

  ngOnInit() {
    this.refresh();

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.router.url.startsWith('/cart')) {
          this.refresh();
        }
      });
  }

  refresh() {
    this.cartFacade.refresh(this.customerId).subscribe();
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
}
