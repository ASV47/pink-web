import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ICartItemAddRequest } from '../../Models/Cart/icart-item-add-request';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { ICartItem } from '../../Models/Cart/icart-item';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';
import { ICartItemDecreaseRequest } from '../../Models/Cart/icart-item-decrease-request';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartItemApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/Shopping/CartItem`;

  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {
    console.log('CartItemApiService apiUrl =', this.apiUrl);
    console.log('environment.apiUrl =', environment.apiUrl);
  }

  add(request: ICartItemAddRequest): Observable<ICartItem> {
    this.isLoading.set(true);
    return this.http.post<ICategoryTreeResponse<ICartItem>>(`${this.apiUrl}/Add`, request).pipe(
      map((res) => {
        if (!res.isSuccess) throw new Error(res.message ?? 'Add failed');
        return res.object;
      }),
      tap(() => this.isLoading.set(false)),
      catchError((err) => {
        this.isLoading.set(false);
        throw err;
      }),
    );
  }
  decrease(req: ICartItemDecreaseRequest): Observable<ICartItem> {
    this.isLoading.set(true);

    return this.http.post<ICategoryTreeResponse<ICartItem>>(`${this.apiUrl}/Decrease`, req).pipe(
      map((res) => {
        if (!res.isSuccess) throw new Error(res.message ?? 'Decrease failed');
        return res.object;
      }),
      tap(() => this.isLoading.set(false)),
      catchError((err) => {
        this.isLoading.set(false);
        throw err;
      }),
    );
  }
  remove(cartItemId: number): Observable<number> {
    this.isLoading.set(true);

    const params = new HttpParams().set('id', cartItemId.toString());

    return this.http
      .post<ICategoryTreeResponse<number>>(`${this.apiUrl}/Remove`, {}, { params })
      .pipe(
        map((res) => {
          if (!res.isSuccess) throw new Error(res.message ?? 'Remove failed');
          return res.object;
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }
}
