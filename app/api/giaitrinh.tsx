import qs from "qs";
import { SearchGiaiTrinhRequest } from "../models/giaitrinh/search-giaitrinh-request";
import RestConnection from "./rest";

const GiaiTrinhApi = {
  getGiaiTrinh: async (data: SearchGiaiTrinhRequest) => {
    let rest = new RestConnection();
    let payload: SearchGiaiTrinhRequest = data;
    return rest.postAsync("DanhSachGiaiTrinh", JSON.stringify(payload));
  },

  getDanhSachGiaiTrinhByEmployeeId: async (data: string | null) => {
    let rest = new RestConnection();
    return rest.getAsync(
      "DanhSachGiaiTrinh?" +
        qs.stringify({ maNhanVien: data }, { skipNulls: true }),
    );
  },

  approveExplantion: async (data: string) => {
    let rest = new RestConnection();
    return rest.postAsync(
      "DanhSachGiaiTrinh/ApproveExplanation?" +
        qs.stringify({ maGiaiTrinh: data }, { skipNulls: true }),
      null,
    );
  },

  rejectExplanation: async (data: string) => {
    let rest = new RestConnection();
    return rest.postAsync(
      "DanhSachGiaiTrinh/RejectExplanation?" +
        qs.stringify({ maGiaiTrinh: data }, { skipNulls: true }),
      null,
    );
  },
};

export default GiaiTrinhApi;
