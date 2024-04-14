import qs from "qs";
import { CreateGiaiTrinhRequest } from "../models/giaitrinh/create-giaitrinh-request";
import { SearchGiaiTrinhRequest } from "../models/giaitrinh/search-giaitrinh-request";
import { UpdateGiaiTrinhRequest } from "../models/giaitrinh/update-giaitrinh-request";
import RestConnection from "./rest";

const GiaiTrinhApi = {
  getGiaiTrinh: async (data: SearchGiaiTrinhRequest) => {
    const rest = new RestConnection();
    const payload: SearchGiaiTrinhRequest = data;
    return rest.postAsync("DanhSachGiaiTrinh", JSON.stringify(payload));
  },

  getDanhSachGiaiTrinhByEmployeeId: async (data: string, ngayLamViec: Date) => {
    const rest = new RestConnection();
    return rest.getAsync(
      "DanhSachGiaiTrinh?" +
        qs.stringify(
          { maNhanVien: data, ngayLamViec: ngayLamViec },
          { skipNulls: true },
        ),
    );
  },

  approveExplantion: async (maGiaiTrinh: string, nguoiDuyet: string) => {
    const rest = new RestConnection();
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
    const rest = new RestConnection();
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
    const rest = new RestConnection();
    const payload: CreateGiaiTrinhRequest = data;
    return rest.postAsync("DanhSachGiaiTrinh/Create", JSON.stringify(payload));
  },

  updateGiaiTrinh: async (data: UpdateGiaiTrinhRequest) => {
    const rest = new RestConnection();
    const payload: UpdateGiaiTrinhRequest = data;
    return rest.postAsync("DanhSachGiaiTrinh/Update", JSON.stringify(payload));
  },
};

export default GiaiTrinhApi;
