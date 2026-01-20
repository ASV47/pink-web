import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContactMessageCreateRequest } from '../../Models/ContactUs/icontact-message-create-request';
import { Observable } from 'rxjs';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';
import { environment } from '../../Environment/environment';
import { IContactMessage } from '../../Models/ContactUs/icontact-message';

@Injectable({ providedIn: 'root' })
export class ContactMessageApiService {
  constructor(private http: HttpClient) {}

  createContactMessage(
    payload: IContactMessageCreateRequest,
  ): Observable<ICategoryTreeResponse<IContactMessage>> {
    const url = `${environment.apiUrl}/api/Contacts/ContactMessage/Create`;
    return this.http.post<ICategoryTreeResponse<IContactMessage>>(url, payload);
  }
}
