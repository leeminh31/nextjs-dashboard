import { HRMSystemApi } from "../constant/constant"

class RestConnection {
    constructor () {
    }
  
    _fetchAsync = async (method: string, url: string, body: any, hasAuth: boolean) => {
      var strToken = localStorage.getItem("token")
      try {
          let token: any
          console.log("strToken")
          console.log(strToken)
          if (strToken)
            token = JSON.parse(strToken)
  
          const response = await fetch(
            HRMSystemApi + url,
            {
              method: method,
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token.accessToken}`
              },
              body: body,
            }
          )
          .then(async (res) => {
            console.log("res",res)
            if (res.status === 401)
            {
              const user = JSON.parse(localStorage.getItem("user") ?? "")
              return
            }
            return res.clone().json();
          })
          .then((resData) => {
            console.log("response api",resData)
            return resData;
          })
          .catch((err) => {
            console.log("fetch error: " + err);
          });
        return response;
      } catch (err) {
        console.log(`RestApi._fetchAsync function thrown error ${err}`);
      }
    }
  
    postAsync = async (url: string, payload: any) => {
      return this._fetchAsync("POST", url, payload, true)
    }
  
    getAsync = async (url: string) => {
      return this._fetchAsync("GET", url, null, true)
    }
    
  };
  
  export default RestConnection;