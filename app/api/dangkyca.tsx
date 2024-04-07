import qs from "qs";
import { CreateDangKyCaRequest } from "../models/dangkyca/create-dangkyca-request";
import { SearchDangKyCaRequest } from "../models/dangkyca/search-dangkyca-request";
import RestConnection from "./rest";

const DangKyCaApi = {
  getDangKyCa: async (data: SearchDangKyCaRequest) => {
    const rest = new RestConnection();
    const payload: SearchDangKyCaRequest = data;
    return rest.postAsync("DangKyCa", JSON.stringify(payload));
  },

  addDangKyCa: async (data: CreateDangKyCaRequest) => {
    const rest = new RestConnection();
    const payload: CreateDangKyCaRequest = data;
    return rest.postAsync("DangKyCa/create", JSON.stringify(payload));
  },

  approve: async (maDangKyCa: string, nguoiDuyet: string) => {
    const rest = new RestConnection();
    return rest.postAsync(
      "DangKyCa/Approve?" +
        qs.stringify(
          { maDangKyCa: maDangKyCa, nguoiDuyet: nguoiDuyet },
          { skipNulls: true },
        ),
      null,
    );
  },

  reject: async (maDangKyCa: string, nguoiDuyet: string) => {
    const rest = new RestConnection();
    return rest.postAsync(
      "DangKyCa/Reject?" +
        qs.stringify(
          { maDangKyCa: maDangKyCa, nguoiDuyet: nguoiDuyet },
          { skipNulls: true },
        ),
      null,
    );
  },
};

export default DangKyCaApi;
