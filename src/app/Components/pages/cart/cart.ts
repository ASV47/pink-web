import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslateModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {}
