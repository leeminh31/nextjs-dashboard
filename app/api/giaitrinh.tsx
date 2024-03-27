import qs from "qs";
import { CreateGiaiTrinhRequest } from "../models/giaitrinh/create-giaitrinh-request";
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

  approveExplantion: async (maGiaiTrinh: string, nguoiDuyet: string) => {
    let rest = new RestConnection();
    return rest.postAsync(
      "DanhSachGiaiTrinh/ApproveExplanation?" +
        qs.stringify(
          { maGiaiTrinh: maGiaiTrinh, nguoiDuyet: nguoiDuyet },
          { skipNulls: true },
        ),
      null,
    );
  },

  rejectExplanation: async (maGiaiTrinh: string, nguoiDuyet: string) => {
    let rest = new RestConnection();
    return rest.postAsync(
      "DanhSachGiaiTrinh/RejectExplanation?" +
        qs.stringify(
          { maGiaiTrinh: maGiaiTrinh, nguoiDuyet: nguoiDuyet },
          { skipNulls: true },
        ),
      null,
    );
  },

  createGiaiTrinh: async (data: CreateGiaiTrinhRequest) => {
    let rest = new RestConnection();
    let payload: CreateGiaiTrinhRequest = data;
    return rest.postAsync("DanhSachGiaiTrinh/Create", JSON.stringify(payload));
  },
};

export default GiaiTrinhApi;
