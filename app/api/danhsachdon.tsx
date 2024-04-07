import qs from "qs";
import { DanhSachDonList } from "../models/danhsachdon/dachsachdon-list";
import { SearchDanhSachDonRequest } from "../models/danhsachdon/search-danhsachdon-request";
import { CreateDonBuRequest } from "../models/donbu/create-donbu-request";
import { UpdateDonBuRequest } from "../models/donbu/update-donbu-request";
import { CreateDonConNhoRequest } from "../models/donconnho/create-donconnho-request";
import { UpdateDonConNhoRequest } from "../models/donconnho/update-donconnho-request";
import { CreateDonPhepRequest } from "../models/donphep/create-donphep-request";
import { UpdateDonPhepRequest } from "../models/donphep/update-donphep-request";
import { CreateDonTangCaRequest } from "../models/dontangca/create-dontangca-request";
import { UpdateDonTangCaRequest } from "../models/dontangca/update-dontangca-request";
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

  updateDonPhep: async (data: UpdateDonPhepRequest) => {
    const rest = new RestConnection();
    const payload: UpdateDonPhepRequest = data;
    return rest.postAsync("DanhSachDon/UpdateDonPhep", JSON.stringify(payload));
  },

  updateDonBu: async (data: UpdateDonBuRequest) => {
    const rest = new RestConnection();
    const payload: UpdateDonBuRequest = data;
    return rest.postAsync("DanhSachDon/UpdateDonBu", JSON.stringify(payload));
  },

  updateDonConNho: async (data: UpdateDonConNhoRequest) => {
    const rest = new RestConnection();
    const payload: UpdateDonConNhoRequest = data;
    return rest.postAsync(
      "DanhSachDon/UpdateDonConNho",
      JSON.stringify(payload),
    );
  },

  updateDonTangCa: async (data: UpdateDonTangCaRequest) => {
    const rest = new RestConnection();
    const payload: UpdateDonTangCaRequest = data;
    return rest.postAsync(
      "DanhSachDon/UpdateDonTangCa",
      JSON.stringify(payload),
    );
  },

  getQuyBuHienCo: async (manhanvien: string, nam: number) => {
    const rest = new RestConnection();
    return rest.getAsync(
      "DanhSachDon/GetTotalOTMinutes?" +
        qs.stringify({ maNhanVien: manhanvien, nam: nam }),
    );
  },

  getQuyPhepHienCo: async (manhanvien: string, nam: number) => {
    const rest = new RestConnection();
    return rest.getAsync(
      "DanhSachDon/GetTotalDayOffByYear?" +
        qs.stringify({ maNhanVien: manhanvien, nam: nam }),
    );
  },
};

export default DanhSachDonApi;
