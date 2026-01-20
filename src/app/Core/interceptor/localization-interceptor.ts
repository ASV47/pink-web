import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Language } from '../Services/language/language';

export const localizationInterceptor: HttpInterceptorFn = (req, next) => {
  const language = inject(Language);
  const culture = language.get();

  return next(
    req.clone({
      setHeaders: {
        'Accept-Language': culture,
      },
    })
  );
};
