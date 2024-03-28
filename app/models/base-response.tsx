/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseResposne {
  statusCode: number; // 200, 401, 404 ...
  message: string; // 200, 401, 404 ...
  totalSuccess?: number;
  totalElement?: number;
  page?: number;
  pageSize?: number;
  firstPage?: number;
  lastPage?: number;
  totalPages?: number;
  totalRecords?: number;
  nextPage?: number;
  previousPage?: number;
  data?: any;
}
