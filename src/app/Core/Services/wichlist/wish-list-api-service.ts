import { Injectable, signal } from '@angular/core';
import { environment } from '../../Environment/environment';
import { Wishlist } from '../../Models/wishlist/wishlist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';

@Injectable({
  providedIn: 'root',
})
export class WishListApiService {
  private readonly apiUrl = `${environment.apiUrl}/api/Shopping/WishList`;

  wishList = signal<Wishlist | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getActiveWishList(customerId: number): Observable<Wishlist> {
    this.isLoading.set(true);

    const params = new HttpParams().set('customerId', customerId.toString());

    return this.http
      .get<ICategoryTreeResponse<Wishlist>>(`${this.apiUrl}/GetActiveWishList`, { params })
      .pipe(
        map((res) => {
          if (!res.isSuccess) throw new Error(res.message ?? 'GetActiveWishList failed');
          return res.object;
        }),
        tap((wl) => this.wishList.set(wl)),
        finalize(() => this.isLoading.set(false)),
        catchError((err) => throwError(() => err)),
      );
  }

  clearState(): void {
    this.wishList.set(null);
  }
}
