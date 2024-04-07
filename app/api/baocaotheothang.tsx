import { SearchBaoCaoTheoThangRequest } from "../models/baocaotheothang/search-baocaotheothang-request";
import { SearchBaoCaoTheoThangByDayRequest } from "../models/baocaotheothang/search-baocaotheothangbyday-request";
import { SearchDuLieuChamCongRequest } from "../models/dulieuchamcong/search-dulieuchamcong-request";
import RestConnection from "./rest";

const BaoCaoTheoThangApi = {
  getBaoCaoTheoThang: async (data: SearchBaoCaoTheoThangRequest) => {
    const rest = new RestConnection();
    const payload: SearchBaoCaoTheoThangRequest = data;
    return rest.postAsync("BaoCaoTheoThang", JSON.stringify(payload));
  },

  getBaoCaoTheoThangByDay: async (data: SearchBaoCaoTheoThangByDayRequest) => {
    const rest = new RestConnection();
    const payload: SearchBaoCaoTheoThangByDayRequest = data;
    return rest.postAsync(
      "BaoCaoTheoThang/GetWorkHour",
      JSON.stringify(payload),
    );
  },

  getBaoCaoTheoThangAll: async (data: SearchDuLieuChamCongRequest) => {
    const rest = new RestConnection();
    const payload: SearchDuLieuChamCongRequest = data;
    return rest.postAsync("BaoCaoTheoThang/GetAll", JSON.stringify(payload));
  },

  assignShiftToEmployee: async () => {
    const rest = new RestConnection();
    return rest.postAsync("BaoCaoTheoThang/AssignShifts", null);
  },
};

export default BaoCaoTheoThangApi;
