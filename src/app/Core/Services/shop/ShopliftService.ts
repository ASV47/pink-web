import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../Environment/environment';
import { Observable } from 'rxjs';
import { IDataTableRequest } from '../../Models/Shoplift/IDataTableRequest';
import { IDataTableResponse } from '../../Models/Shoplift/IData-table-response';
import { IShopliftItem } from '../../Models/Shoplift/ishoplift-item';

@Injectable({
  providedIn: 'root',
})
export class ShopliftService {
  constructor(private http: HttpClient) {}

  getDataTablePagenationFromBody(
    request: IDataTableRequest
  ): Observable<IDataTableResponse<IShopliftItem>> {
    return this.http.post<IDataTableResponse<IShopliftItem>>(
      `${environment.apiUrl}/api/WareHouse/Items/GetDataTablePaginationFromBody`,
      request
    );
  }
}
