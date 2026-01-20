export interface IDataTableResponse<T> {
  draw: number;
  data: T[];
  recordsTotal: number;
  recordsFiltered: number;
}
