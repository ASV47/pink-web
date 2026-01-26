import { Component, computed, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PopupService } from '../../../Core/Services/popup/popup-service';
import { Language } from '../../../Core/Services/language/language';
import { CartApiService } from '../../../Core/Services/cart/cart-api-service';
import { Cart } from '../cart/cart';
import { WishListFacadeService } from '../../../Core/Services/wichlist/wish-list-facade-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  currentLang: string = 'en';
  isMobile = window.innerWidth < 1200;
  isSticky = false;
  isMenuOpen = false;

  // ! Cart ****
  private cartApi = inject(CartApiService);

  cart = this.cartApi.cart;
  private wishFacade = inject(WishListFacadeService);
  private readonly customerId = 3;
  wishQty = this.wishFacade.totalQty;

  constructor(
    private popupService: PopupService,
    public langService: Language,
  ) {
    this.langService.lang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }
  ngOnInit(): void {
    this.wishFacade.refresh(this.customerId).pipe(take(1)).subscribe();

    if (!this.cart()) {
      this.cartApi.getActiveCart(this.customerId).pipe(take(1)).subscribe();
    }
  }

  cartCount = computed(() => {
    const c = this.cart();
    if (!c) return 0;
    return (c.items ?? []).reduce((sum, it) => sum + (it.quantity ?? 0), 0);
  });
  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 1200;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isSticky = window.scrollY > 100;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLang(): void {
    this.langService.toggle();
  }

  openLogin(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.popupService.open('login');
  }

  openRegister(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.popupService.open('signup');
  }

  openCart(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.popupService.open('cart');
  }

  openSearch(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.popupService.open('search');
  }

  openWishlist(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.popupService.open('wishlist');
  }

  @HostListener('document:click')
  closePopupOnOutsideClick() {
    this.popupService.close();
  }
}
