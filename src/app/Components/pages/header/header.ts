import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PopupService } from '../../../Core/Services/popup/popup-service';
import { Language } from '../../../Core/Services/language/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  currentLang: string = 'en';
  isMobile = window.innerWidth < 1200;
  isSticky = false;
  isMenuOpen = false;

  constructor(private popupService: PopupService, public langService: Language) {
    this.langService.lang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

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
