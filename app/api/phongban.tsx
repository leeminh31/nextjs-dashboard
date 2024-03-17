import RestConnection from './rest';
import qs from 'qs';
import { CreatePhongBanRequest } from '../models/phongban/create-phongban-request';
import { UpdatePhongBanRequest } from '../models/phongban/update-phongban-request';
import { SearchPhongBanRequest } from '../models/phongban/search-phongban-request';

const PhongBanApi = {
    addPhongBan: async (data: CreatePhongBanRequest) => {
        let rest = new RestConnection()
        let payload: CreatePhongBanRequest = data;
    return rest.postAsync("PhongBan/create", JSON.stringify(payload))
    },
  
    updatePhongBan: async (data: UpdatePhongBanRequest) => {
      let rest = new RestConnection()
      let payload: UpdatePhongBanRequest = data;
      return rest.postAsync("PhongBan/update", JSON.stringify(payload))
    },
  
    getPhongBan: async (data: SearchPhongBanRequest) => {
      let rest = new RestConnection()
      return rest.getAsync(`PhongBan?`+qs.stringify(data, { skipNulls: true }))
    },

    deletePhongBan: async (data: string) => {
      let rest = new RestConnection()
      return rest.deleteAsync(`PhongBan?id=`+data)
    },
  };
  
  export default PhongBanApi;