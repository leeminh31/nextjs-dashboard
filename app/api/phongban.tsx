import RestConnection from './rest';
import qs from 'qs';
import { CreatePhongBanRequest } from '../models/phongban/create-phongban-request';
import { UpdatePhongBanRequest } from '../models/phongban/update-phongban-request';
import { SearchPhongBanRequest } from '../models/phongban/search-phongban-request';

const PhongBanApi = {
    addNhanVien: async (data: CreatePhongBanRequest) => {
        let rest = new RestConnection()
        let payload: CreatePhongBanRequest = data;
    return rest.postAsync("PhongBan/create", JSON.stringify(payload))
    },
  
    updateNhanVien: async (data: UpdatePhongBanRequest) => {
      let rest = new RestConnection()
      let payload: UpdatePhongBanRequest = data;
      return rest.postAsync("PhongBan/update", JSON.stringify(payload))
    },
  
    getNhanVien: async (data: SearchPhongBanRequest) => {
      let rest = new RestConnection()
      return rest.getAsync(`PhongBan`+qs.stringify(data, { skipNulls: true }))
    },
  };
  
  export default PhongBanApi;