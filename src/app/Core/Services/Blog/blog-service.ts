import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environment/environment';
import { IBlog } from '../../Models/blog/iblog';
import { BaseService } from '../baseServices/base-service';
@Injectable({
  providedIn: 'root',
})
export class BlogApiService extends BaseService<IBlog> {
  protected override apiUrl = `${environment.apiUrl}/api/Content/Blog`;
  constructor(http: HttpClient) {
    super(http);
  }
}
