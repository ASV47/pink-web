import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, TranslateModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {}
