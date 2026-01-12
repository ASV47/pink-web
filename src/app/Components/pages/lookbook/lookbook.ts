import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lookbook',
  imports: [RouterLink, TranslateModule],
  templateUrl: './lookbook.html',
  styleUrl: './lookbook.css',
})
export class Lookbook {}
