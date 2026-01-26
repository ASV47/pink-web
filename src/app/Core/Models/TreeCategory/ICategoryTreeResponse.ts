import { IApiFieldError } from './iapi-field-error';

export interface ICategoryTreeResponse<T> {
  isSuccess: boolean;
  message: string | null;
  object: T;
  errors: IApiFieldError[] | null;
}
