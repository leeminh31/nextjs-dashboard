export interface SearchNhanViensRequest{
    page: number,
    pageSize: number,
    code: string,
    name: string,
    orderby: string
}