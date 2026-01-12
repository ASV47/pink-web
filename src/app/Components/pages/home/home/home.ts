import { CommonModule } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Language } from '../../../../Core/Services/language/language';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  isSwiperReady: boolean = false;
  constructor(public langService: Language) {}

  ngOnInit() {
    this.langService.lang$.subscribe(() => {
      this.isSwiperReady = false;

      setTimeout(() => {
        this.isSwiperReady = true;
      }, 0);
    });
  }
}
