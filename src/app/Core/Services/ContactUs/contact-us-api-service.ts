import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDataTableRequest } from '../../Models/Shoplift/IDataTableRequest';
import { IDataTableResponse } from '../../Models/Shoplift/IData-table-response';
import { IContactInfo } from '../../Models/ContactUs/IContactInfo';
import { environment } from '../../Environment/environment';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';
import { IWorkingHour } from '../../Models/ContactUs/IWorkingHour';

@Injectable({ providedIn: 'root' })
export class ContactUsApiService {
  constructor(private http: HttpClient) {}

  getContactInfo(request: IDataTableRequest): Observable<IDataTableResponse<IContactInfo>> {
    const url = `${environment.apiUrl}/api/Contacts/ContactInfo/GetDataTablePaginationFromBody`;
    return this.http.post<IDataTableResponse<IContactInfo>>(url, request);
  }

  getWorkingHours(request: IDataTableRequest): Observable<IDataTableResponse<IWorkingHour>> {
    const url = `${environment.apiUrl}/api/Contacts/WorkingHour/GetDataTablePaginationFromBody`;
    return this.http.post<IDataTableResponse<IWorkingHour>>(url, request);
  }
}
