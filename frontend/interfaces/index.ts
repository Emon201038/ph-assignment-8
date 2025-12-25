export interface IResponse<T> {
  success: boolean;
  message: true;
  data: T;
  meta?: IMeta;
}

export interface IMeta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
