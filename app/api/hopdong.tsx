import qs from "qs";
import { CreateHopDongRequest } from "../models/hopdong/create-hopdong-request";
import { UpdateHopDongRequest } from "../models/hopdong/update-hopdong-request";
import RestConnection from "./rest";

const HopDongApi = {
  addHopDong: async (data: CreateHopDongRequest) => {
    let rest = new RestConnection();
    let payload: CreateHopDongRequest = data;
    return rest.postAsync("HopDong/create", JSON.stringify(payload));
  },

  updateHopDong: async (data: UpdateHopDongRequest) => {
    let rest = new RestConnection();
    let payload: UpdateHopDongRequest = data;
    return rest.postAsync("HopDong/update", JSON.stringify(payload));
  },

  getHopDong: async (tenHopDong: string | null, loaiHopDong: string | null) => {
    let rest = new RestConnection();
    return rest.getAsync(
      "HopDong?" +
        qs.stringify({ tenHopDong, loaiHopDong }, { skipNulls: true }),
    );
  },

  getHopDongByID: async (tenHopDong: string) => {
    let rest = new RestConnection();
    return rest.getAsync("HopDong/" + qs.stringify(tenHopDong));
  },
};

export default HopDongApi;
