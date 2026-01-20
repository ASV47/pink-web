export interface ICategoryTreeResponse<T>{
  isSuccess: boolean;
  message: string|null;
  object: T;
  errors: unknown|null;
}

