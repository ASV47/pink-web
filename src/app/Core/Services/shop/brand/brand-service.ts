import { Injectable } from '@angular/core';
import { BaseService } from '../../baseServices/base-service';
import { IBrand } from '../../../Models/Shoplift/ibrand';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService<IBrand> {
  protected override apiUrl = `${environment.apiUrl}/api/Content/Brand`;

  constructor(http: HttpClient) {
    super(http);
  }
}
