export type SortDir = 'asc' | 'desc' | 'Ascending' | 'Descending';

export interface IDataTableRequest {
  draw: number;
  start: number;
  length: number;
  sortColumnName: string;
  sortColumnDirection: SortDir;
  searchValue: string;
  searchableCloumnsValues: Record<string, string | number | boolean | null>;
  searchableCloumns: string[];
}
