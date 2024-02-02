export interface SearchGiaiTrinhRequest{
    page: number,
    pageSize: number,
    code: string,
    name: string,
    orderby: string
}