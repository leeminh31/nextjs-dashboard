import qs from "qs";
import { DanhSachDonList } from "../models/danhsachdon/dachsachdon-list";
import { SearchDanhSachDonRequest } from "../models/danhsachdon/search-danhsachdon-request";
import { CreateDonBuRequest } from "../models/donbu/create-donbu-request";
import { CreateDonConNhoRequest } from "../models/donconnho/create-donconnho-request";
import { CreateDonPhepRequest } from "../models/donphep/create-donphep-request";
import { CreateDonTangCaRequest } from "../models/dontangca/create-dontangca-request";
import RestConnection from "./rest";

const DanhSachDonApi = {
  getDanhSachDon: async (data: SearchDanhSachDonRequest) => {
    const rest = new RestConnection();
    const payload: SearchDanhSachDonRequest = data;
    return rest.postAsync("DanhSachDon", JSON.stringify(payload));
  },

  getDanhSachDonByEmployeeId: async (data: string | null) => {
    const rest = new RestConnection();
    return rest.getAsync(
      "DanhSachDon?" + qs.stringify({ maNhanVien: data }, { skipNulls: true }),
    );
  },

  approveRequest: async (data: DanhSachDonList) => {
    const rest = new RestConnection();
    const payload: DanhSachDonList = data;
    return rest.postAsync(
      "DanhSachDon/ApproveRequest",
      JSON.stringify(payload),
    );
  },

  rejectRequest: async (data: DanhSachDonList) => {
    const rest = new RestConnection();
    const payload: DanhSachDonList = data;
    return rest.postAsync("DanhSachDon/RejectRequest", JSON.stringify(payload));
  },

  createDonBu: async (data: CreateDonBuRequest) => {
    const rest = new RestConnection();
    const payload: CreateDonBuRequest = data;
    return rest.postAsync("DanhSachDon/CreateDonBu", JSON.stringify(payload));
  },

  createDonConNho: async (data: CreateDonConNhoRequest) => {
    const rest = new RestConnection();
    const payload: CreateDonConNhoRequest = data;
    return rest.postAsync(
      "DanhSachDon/CreateDonConNho",
      JSON.stringify(payload),
    );
  },

  createDonPhep: async (data: CreateDonPhepRequest) => {
    const rest = new RestConnection();
    const payload: CreateDonPhepRequest = data;
    return rest.postAsync("DanhSachDon/CreateDonPhep", JSON.stringify(payload));
  },

  createDonTangCa: async (data: CreateDonTangCaRequest) => {
    const rest = new RestConnection();
    const payload: CreateDonTangCaRequest = data;
    return rest.postAsync(
      "DanhSachDon/CreateDonTangCa",
      JSON.stringify(payload),
    );
  },
};

export default DanhSachDonApi;
