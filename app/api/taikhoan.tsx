import qs from "qs";
import { HRMSystemApi } from "../constant/constant";
import { ChangePasswordRequest } from "../models/taikhoan/change-password-request";
import { LoginRequestModel } from "../models/taikhoan/login-request";
import RestConnection from "./rest";

export const LoginApi = {
    login: async (tenDangNhap: any, matKhau: any) => {
      let login: LoginRequestModel = {
        tenDangnNhap: tenDangNhap,
        matKhau: matKhau,
      };
      try {
        const response = await fetch(
          HRMSystemApi + "access-token/login",
          {
            method: "post",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
          }
        )
          .then((res) => {
            return res.clone().json();
          })
          .then((resData) => {
            const loginRes = resData.data
            if(loginRes){
              localStorage.setItem('token', JSON.stringify(loginRes.tokenResponse))
              localStorage.setItem('user', JSON.stringify(loginRes))
            }
            return resData;
          })
          .catch((err) => {
            console.log("fetch error" + err);
          });
        return response;
      } catch (err) {
        console.log(`LoginApi.login function thrown error ${err}`);
      }
    },
    changePassword: async(data: ChangePasswordRequest) => {
      let rest = new RestConnection()
      let payload: ChangePasswordRequest = data
      return rest.postAsync("TaiKhoan/change-password", JSON.stringify(payload))
    },
    getEmployeeId: async() => {
      let rest = new RestConnection()
      return rest.getAsync("TaiKhoan/search")
    }
  };