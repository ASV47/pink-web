import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../Environment/environment';
import { IDataTableRequest } from '../../../Models/Shoplift/IDataTableRequest';
import { ICategoryTreeNode } from '../../../Models/TreeCategory/icategory-tree-node';
import { ICategoryTreeResponse } from '../../../Models/TreeCategory/ICategoryTreeResponse';

@Injectable({ providedIn: 'root' })
export class CategoryTreeService {
  constructor(private http: HttpClient) {}

 getCategoriesTree(req: IDataTableRequest) {
  return this.http.post<ICategoryTreeResponse<ICategoryTreeNode[]>>(
    `${environment.apiUrl}/api/WareHouse/Categories/GetCategoryTree`,
    req
  );
}

}
