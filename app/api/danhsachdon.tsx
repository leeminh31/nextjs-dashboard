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
    let rest = new RestConnection();
    let payload: SearchDanhSachDonRequest = data;
    return rest.postAsync("DanhSachDon", JSON.stringify(payload));
  },

  getDanhSachDonByEmployeeId: async (data: string | null) => {
    let rest = new RestConnection();
    return rest.getAsync(
      "DanhSachDon?" + qs.stringify({ maNhanVien: data }, { skipNulls: true }),
    );
  },

  approveRequest: async (data: DanhSachDonList) => {
    let rest = new RestConnection();
    let payload: DanhSachDonList = data;
    return rest.postAsync(
      "DanhSachDon/ApproveRequest",
      JSON.stringify(payload),
    );
  },

  rejectRequest: async (data: DanhSachDonList) => {
    let rest = new RestConnection();
    let payload: DanhSachDonList = data;
    return rest.postAsync("DanhSachDon/RejectRequest", JSON.stringify(payload));
  },

  createDonBu: async (data: CreateDonBuRequest) => {
    let rest = new RestConnection();
    let payload: CreateDonBuRequest = data;
    return rest.postAsync("DanhSachDon/CreateDonBu", JSON.stringify(payload));
  },

  createDonConNho: async (data: CreateDonConNhoRequest) => {
    let rest = new RestConnection();
    let payload: CreateDonConNhoRequest = data;
    return rest.postAsync(
      "DanhSachDon/CreateDonConNho",
      JSON.stringify(payload),
    );
  },

  createDonPhep: async (data: CreateDonPhepRequest) => {
    let rest = new RestConnection();
    let payload: CreateDonPhepRequest = data;
    return rest.postAsync("DanhSachDon/CreateDonPhep", JSON.stringify(payload));
  },

  createDonTangCa: async (data: CreateDonTangCaRequest) => {
    let rest = new RestConnection();
    let payload: CreateDonTangCaRequest = data;
    return rest.postAsync(
      "DanhSachDon/CreateDonTangCa",
      JSON.stringify(payload),
    );
  },
};

export default DanhSachDonApi;
