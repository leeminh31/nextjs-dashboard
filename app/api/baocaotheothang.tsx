import { SearchBaoCaoTheoThangRequest } from "../models/baocaotheothang/search-baocaotheothang-request";
import { SearchBaoCaoTheoThangByDayRequest } from "../models/baocaotheothang/search-baocaotheothangbyday-request";
import { SearchDuLieuChamCongRequest } from "../models/dulieuchamcong/search-dulieuchamcong-request";
import RestConnection from "./rest";

const BaoCaoTheoThangApi = {
  getBaoCaoTheoThang: async (data: SearchBaoCaoTheoThangRequest) => {
    let rest = new RestConnection();
    let payload: SearchBaoCaoTheoThangRequest = data;
    return rest.postAsync("BaoCaoTheoThang", JSON.stringify(payload));
  },

  getBaoCaoTheoThangByDay: async (data: SearchBaoCaoTheoThangByDayRequest) => {
    let rest = new RestConnection();
    let payload: SearchBaoCaoTheoThangByDayRequest = data;
    return rest.postAsync(
      "BaoCaoTheoThang/GetWorkHour",
      JSON.stringify(payload),
    );
  },

  getBaoCaoTheoThangAll: async (data: SearchDuLieuChamCongRequest) => {
    let rest = new RestConnection();
    let payload: SearchDuLieuChamCongRequest = data;
    return rest.postAsync("BaoCaoTheoThang/GetAll", JSON.stringify(payload));
  },
};

export default BaoCaoTheoThangApi;
