import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// ! imports
import { IDataTableRequest } from '../../Models/Shoplift/IDataTableRequest';
import { IDataTableResponse } from '../../Models/Shoplift/IData-table-response';
import { ICategoryTreeResponse } from '../../Models/TreeCategory/ICategoryTreeResponse';

export interface BaseEntity {
  id?: number;
  [key: string]: any;
}

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  // Signals for reactive state management
  items = signal<T[]>([]);
  selectedItem = signal<T | null>(null);
  isLoading = signal<boolean>(false);

  // BehaviorSubjects for component communication
  private itemAdded = new BehaviorSubject<T | null>(null);
  itemAdded$ = this.itemAdded.asObservable();

  private itemUpdated = new Subject<T>();
  itemUpdated$ = this.itemUpdated.asObservable();

  private itemDeleted = new Subject<number>();
  itemDeleted$ = this.itemDeleted.asObservable();

  editMode = new BehaviorSubject<boolean>(false);
  editItem = new BehaviorSubject<T | null>(null);

  protected abstract apiUrl: string;
  constructor(protected http: HttpClient) {}

  // ===== Helpers =====
  protected defaultDataTableRequest(): IDataTableRequest {
    return {
      draw: 1,
      start: 0,
      length: 10,
      sortColumnName: 'Name',
      sortColumnDirection: 'asc',
      searchValue: '',
      searchableCloumnsValues: {},
      searchableCloumns: ['Name'],
    };
  }

  /**
   * Get paginated data table results
   */
  getDataTablePagination(request?: Partial<IDataTableRequest>): Observable<IDataTableResponse<T>> {
    this.isLoading.set(true);

    // merge defaults + user request
    const body: IDataTableRequest = {
      ...this.defaultDataTableRequest(),
      ...(request ?? {}),
    };

    return this.http
      .post<IDataTableResponse<T>>(`${this.apiUrl}/GetDataTablePaginationFromBody`, body)
      .pipe(
        tap((response) => {
          this.items.set(response.data ?? []);
          this.isLoading.set(false);
        }),
        catchError((error) => {
          this.isLoading.set(false);
          throw error;
        }),
      );
  }
  /**
   * Get all items (using large page size)
   */
  getAll(): Observable<T[]> {
    return this.getDataTablePagination({ start: 0, length: 9999 }).pipe(
      map((response) => response.data ?? []),
    );
  }

  /**
   * Get item by ID
   */
  getById(id: number): Observable<T> {
    this.isLoading.set(true);

    return this.http.get<ICategoryTreeResponse<T>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (!response.isSuccess) throw new Error(response.message ?? 'Request failed');
        return response.object;
      }),
      tap((item) => {
        this.selectedItem.set(item);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        throw error;
      }),
    );
  }

  /**
   * Create new item
   */
  create(item: T): Observable<T> {
    this.isLoading.set(true);

    const itemToSend = this.beforeSend(item);

    return this.http.post<ICategoryTreeResponse<T>>(`${this.apiUrl}/Create`, itemToSend).pipe(
      map((response) => {
        if (!response.isSuccess) throw new Error(response.message ?? 'Create failed');
        return response.object;
      }),
      tap((newItem) => {
        this.itemAdded.next(newItem);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        throw error;
      }),
    );
  }

  /**
   * Update existing item
   */
  update(id: number, item: T): Observable<T> {
    this.isLoading.set(true);

    const itemToSend = this.beforeSend({ ...item, id });

    return this.http
      .post<ICategoryTreeResponse<T>>(`${this.apiUrl}/Update?id=${id}`, itemToSend)
      .pipe(
        map((response) => {
          if (!response.isSuccess) throw new Error(response.message ?? 'Update failed');
          return response.object;
        }),
        tap((updatedItem) => {
          this.itemUpdated.next(updatedItem);
          this.isLoading.set(false);
        }),
        catchError((error) => {
          this.isLoading.set(false);
          throw error;
        }),
      );
  }
  /**
   * Delete item by ID
   */
  delete(id: number): Observable<void> {
    this.isLoading.set(true);

    const params = new HttpParams().set('id', id.toString());

    return this.http
      .post<ICategoryTreeResponse<number>>(`${this.apiUrl}/Remove`, {}, { params })
      .pipe(
        map((response) => {
          if (!response.isSuccess) throw new Error(response.message ?? 'Delete failed');
          return void 0;
        }),
        tap(() => {
          this.itemDeleted.next(id);
          this.isLoading.set(false);
        }),
        catchError((error) => {
          this.isLoading.set(false);
          throw error;
        }),
      );
  }
  /**
   * Override this method to transform data before sending to API
   * Useful for converting types, formatting fields, etc.
   */
  protected beforeSend(item: T): T {
    return item;
  }

  clearSelection(): void {
    this.selectedItem.set(null);
  }

  setEditMode(item: T | null): void {
    this.editMode.next(!!item);
    this.editItem.next(item);
  }

  clearEditMode(): void {
    this.editMode.next(false);
    this.editItem.next(null);
  }

  /**
   * Patch update (partial update)
   */
  patch(id: number, data: any, endpoint?: string): Observable<T> {
    this.isLoading.set(true);

    const url = endpoint ? `${this.apiUrl}/${endpoint}/${id}` : `${this.apiUrl}/${id}`;

    return this.http.patch<ICategoryTreeResponse<T>>(url, data).pipe(
      map((response) => {
        if (!response.isSuccess) throw new Error(response.message ?? 'Patch failed');
        return response.object;
      }),
      tap((updatedItem) => {
        this.itemUpdated.next(updatedItem);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        this.isLoading.set(false);
        throw error;
      }),
    );
  }
}
