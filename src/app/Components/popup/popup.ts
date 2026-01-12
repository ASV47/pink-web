import { Component, inject } from '@angular/core';
import { PopupService, PopupType } from '../../Core/Services/popup/popup-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-popup',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  activePopup: PopupType | null = null;
  accountView: 'login' | 'signup' | 'reset' = 'login';

  constructor(private popupService: PopupService) {
    this.popupService.popup$.subscribe((type) => {
      this.activePopup = type;

      if (type === 'login' || type === 'signup') {
        this.accountView = type;
      }
    });
  }

  close() {
    this.popupService.close();
    this.accountView = 'login';
  }
}
