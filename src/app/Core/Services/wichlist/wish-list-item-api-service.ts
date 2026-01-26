import { Injectable, signal } from '@angular/core';
import { environment } from '../../Environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWishListItemAddRequest } from '../../Models/wishlist/iwish-list-item-add-request';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';
import { IWishListItems } from '../../Models/wishlist/IWish-list-items';

@Injectable({
  providedIn: 'root',
})
export class WishListItemApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/Shopping/WishListItems`;
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  add(req: IWishListItemAddRequest): Observable<IWishListItems> {
    this.isLoading.set(true);

    return this.http.post<ICategoryTreeResponse<IWishListItems>>(`${this.apiUrl}/Add`, req).pipe(
      map((res) => {
        if (!res.isSuccess) throw new Error(res.message ?? 'Add WishListItem failed');
        return res.object;
      }),
      finalize(() => this.isLoading.set(false)),
      catchError((err) => throwError(() => err)),
    );
  }
  removeItem(customerId: number, wishListId: number, itemId: number): Observable<number> {
    this.isLoading.set(true);

    const body = { customerId, wishListId, itemId };

    return this.http.post<ICategoryTreeResponse<number>>(`${this.apiUrl}/RemoveItem`, body).pipe(
      map((res) => {
        if (!res.isSuccess) throw new Error(res.message ?? 'Remove WishListItem failed');
        return res.object;
      }),
      finalize(() => this.isLoading.set(false)),
      catchError((err) => throwError(() => err)),
    );
  }
}
