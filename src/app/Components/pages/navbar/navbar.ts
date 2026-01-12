import { Component, HostListener } from '@angular/core';
import { PopupService } from '../../../Core/Services/popup/popup-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private popupService: PopupService) {}

  isSticky = false;
  isMenuOpen = false;
  cartCount = 1;
  wishlistCount = 3;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 100;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('toggle clicked');
  }
  openLogin() {
    // console.log('login clicked');

    this.popupService.open('login');
  }

  openCart() {
    this.popupService.open('cart');
  }

  openSearch() {
    this.popupService.open('search');
  }

  openWishlist() {
    this.popupService.open('wishlist');
  }
}
/*
  isSticky = false;
  isMenuOpen = false;

  cartCount = 1;
  wishlistCount = 3;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isSticky = window.scrollY > 100;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openSearch(): void {
    console.log('Open Search');
  }

  openLogin(): void {
    console.log('Open Login');
  }

  openWishlist(): void {
    console.log('Open Wishlist');
  }

  openCart(): void {
    console.log('Open Cart');
  }
}

*/
