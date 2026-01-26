import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../Environment/environment';
import { Observable } from 'rxjs';
import { IDataTableRequest } from '../../Models/Shoplift/IDataTableRequest';
import { IDataTableResponse } from '../../Models/Shoplift/IData-table-response';
import { IShopliftItem } from '../../Models/Shoplift/ishoplift-item';
import { BaseService } from '../baseServices/base-service';

@Injectable({
  providedIn: 'root',
})
export class ShopliftService extends BaseService<IShopliftItem> {
  protected override apiUrl = `${environment.apiUrl}/api/Catalog/EcomItem`;
  constructor(http: HttpClient) {
    super(http);
  }

  // getDataTablePagenationFromBody(
  //   request: IDataTableRequest,
  // ): Observable<IDataTableResponse<IShopliftItem>> {
  //   return this.http.post<IDataTableResponse<IShopliftItem>>(
  //     `${environment.apiUrl}/api/Catalog/EcomItem/GetDataTablePaginationFromBody`,
  //     request,
  //   );
  // }
}
