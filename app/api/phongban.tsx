import qs from "qs";
import { CreatePhongBanRequest } from "../models/phongban/create-phongban-request";
import { SearchPhongBanRequest } from "../models/phongban/search-phongban-request";
import { UpdatePhongBanRequest } from "../models/phongban/update-phongban-request";
import RestConnection from "./rest";

const PhongBanApi = {
  addPhongBan: async (data: CreatePhongBanRequest) => {
    const rest = new RestConnection();
    const payload: CreatePhongBanRequest = data;
    return rest.postAsync("PhongBan/create", JSON.stringify(payload));
  },

  updatePhongBan: async (data: UpdatePhongBanRequest) => {
    const rest = new RestConnection();
    const payload: UpdatePhongBanRequest = data;
    return rest.postAsync("PhongBan/update", JSON.stringify(payload));
  },

  getPhongBan: async (data: SearchPhongBanRequest) => {
    const rest = new RestConnection();
    return rest.getAsync(`PhongBan?` + qs.stringify(data, { skipNulls: true }));
  },

  deletePhongBan: async (data: string) => {
    const rest = new RestConnection();
    return rest.deleteAsync(`PhongBan?id=` + data);
  },
};

export default PhongBanApi;
