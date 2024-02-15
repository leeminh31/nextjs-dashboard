export interface LoginResponseModel {
    tokenResponse: {
        id: number,
        expireTimeUTC: string,
        accessToken: string,
        role: null
    }
    maTaiKhoan:number ,
    maNhanVien:string ,
    tenDangNhap:string ,
    matKhau:string ,
    phanQuyen:string , 
}