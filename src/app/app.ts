import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Preloader } from './Components/preloader/preloader';
import { Popup } from './Components/popup/popup';
import { Header } from './Components/pages/header/header';
import { Footer } from './Components/pages/footer/footer';
import { Update } from './Core/Services/PWA/update';
import { Network } from './Core/Services/PWA/network';
import { CommonModule } from '@angular/common';
import { ToastService } from './Core/Services/Toaster/toaster';
import { Toast } from './Components/PWA/toast/toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Preloader, Popup, CommonModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  constructor(
    private networkService: Network,
    private updateService: Update,
    public toastService: ToastService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, 600);
  }
}
