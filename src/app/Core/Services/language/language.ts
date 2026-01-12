import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class Language {
  private readonly STORAGE_KEY = 'lang';
  private readonly DEFAULT_LANG = 'en';
  private langSubject = new BehaviorSubject<string>(this.DEFAULT_LANG);
  public lang$ = this.langSubject.asObservable();

  constructor(private translate: TranslateService) {}

  init(): void {
    const lang = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;

    this.translate.setDefaultLang(this.DEFAULT_LANG);
    this.translate.use(lang);

    this.applyDirection(lang);
    this.langSubject.next(lang);
  }

  toggle(): void {
    const next = this.get() === 'en' ? 'ar' : 'en';

    localStorage.setItem(this.STORAGE_KEY, next);
    this.translate.use(next);
    this.applyDirection(next);
    this.langSubject.next(next);
  }

  get(): string {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
  }

  private applyDirection(lang: string): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
