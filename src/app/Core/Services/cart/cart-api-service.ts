import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ICart } from '../../Models/Cart/icart';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';
import { environment } from '../../Environment/environment';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/Shopping/Cart`;

  cart = signal<ICart | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getActiveCart(customerId: number): Observable<ICart> {
    this.isLoading.set(true);

    const params = new HttpParams().set('customerId', customerId.toString());

    return this.http
      .get<ICategoryTreeResponse<ICart>>(`${this.apiUrl}/GetActiveCart`, { params })
      .pipe(
        map((res) => {
          if (!res.isSuccess) throw new Error(res.message ?? 'GetActiveCart failed');
          return res.object;
        }),
        tap((cart) => this.cart.set(cart)),
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          throw err;
        }),
      );
  }

  clearCartState(): void {
    this.cart.set(null);
  }
}
