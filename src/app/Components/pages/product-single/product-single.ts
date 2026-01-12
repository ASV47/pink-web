import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-single',
  imports: [RouterLink, TranslateModule],
  templateUrl: './product-single.html',
  styleUrl: './product-single.css',
})
export class ProductSingle {}
