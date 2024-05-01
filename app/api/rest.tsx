/* eslint-disable @typescript-eslint/no-explicit-any */
import { HRMSystemApi } from "../constant/constant";

class RestConnection {
  constructor() {}

  _fetchAsync = async (
    method: string,
    url: string,
    body: any,
    hasAuth: boolean,
  ) => {
    const strToken = localStorage.getItem("token");
    try {
      let token: any;
      if (strToken) token = JSON.parse(strToken);
      const response = await fetch(HRMSystemApi + url, {
        method: method,
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: body,
      })
        .then(async (res) => {
          if (res.status === 401) {
            const user = JSON.parse(localStorage.getItem("user") ?? "");
            localStorage.clear();
            window.location.href = "/login";
            return;
          }
          return res.clone().json();
        })
        .then((resData) => {
          return resData;
        })
        .catch((err) => {
          console.log("fetch error: " + err);
        });
      return response;
    } catch (err) {
      console.log(`RestApi._fetchAsync function thrown error ${err}`);
    }
  };

  postAsync = async (url: string, payload: any) => {
    return this._fetchAsync("POST", url, payload, true);
  };

  getAsync = async (url: string) => {
    return this._fetchAsync("GET", url, null, true);
  };

  deleteAsync = async (url: string) => {
    return this._fetchAsync("DELETE", url, null, true);
  };
}

export default RestConnection;
