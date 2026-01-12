import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { Observable } from 'rxjs';

import { routes } from './app.routes';
import { Language } from './Core/Services/language/language';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/i18n/${lang}.json`);
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

export function initLang(langService: Language) {
  return () => langService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initLang,
      deps: [Language],
      multi: true,
    },

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
