import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carrers',
  imports: [RouterLink, TranslateModule],
  templateUrl: './carrers.html',
  styleUrl: './carrers.css',
})
export class Carrers {}
