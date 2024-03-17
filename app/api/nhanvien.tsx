import qs from "qs";
import { CreateNhanVienRequest } from "../models/nhanvien/create-nhanvien-request";
import { SearchNhanVienRequest } from "../models/nhanvien/search-nhanvien-request";
import { UpdateNhanVienRequest } from "../models/nhanvien/update-nhanvien-request";
import RestConnection from "./rest";

const NhanVienApi = {
  addNhanVien: async (data: CreateNhanVienRequest) => {
    let rest = new RestConnection();
    let payload: CreateNhanVienRequest = data;
    return rest.postAsync("NhanVien/create", JSON.stringify(payload));
  },

  updateNhanVien: async (data: UpdateNhanVienRequest) => {
    let rest = new RestConnection();
    let payload: UpdateNhanVienRequest = data;
    return rest.postAsync("NhanVien/update", JSON.stringify(payload));
  },

  getNhanVien: async (data: SearchNhanVienRequest) => {
    let rest = new RestConnection();
    return rest.getAsync(`NhanVien?` + qs.stringify(data, { skipNulls: true }));
  },

  getByIdNhanVien: async (maNhanVien: string) => {
    let rest = new RestConnection();
    return rest.getAsync(`NhanVien/${maNhanVien}`);
  },

  getAllEmployeeIdByName: async (hoTen: string) => {
    let rest = new RestConnection();
    return rest.getAsync(`NhanVien/HoTen/${hoTen}`);
  },
};

export default NhanVienApi;
