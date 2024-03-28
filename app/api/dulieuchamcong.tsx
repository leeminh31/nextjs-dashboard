import RestConnection from "./rest";
// import { CreateHopDongRequest } from '../models/hopdong/create-hopdong-request';
// import { UpdateHopDongRequest } from '../models/hopdong/update-hopdong-request';
import { SearchDuLieuChamCongRequest } from "../models/dulieuchamcong/search-dulieuchamcong-request";

const DuLieuChamCongApi = {
  getHopDong: async (data: SearchDuLieuChamCongRequest) => {
    const rest = new RestConnection();
    const payload: SearchDuLieuChamCongRequest = data;
    return rest.postAsync("DuLieuChamCong", JSON.stringify(payload));
  },
};

export default DuLieuChamCongApi;
