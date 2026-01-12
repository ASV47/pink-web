import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  imports: [],
  templateUrl: './preloader.html',
  styleUrl: './preloader.css',
})
export class Preloader implements OnInit {
  visible = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = false;
    }, 300);
  }
}
