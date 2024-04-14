import { BaoCaoTheoThangEmployeeResponse } from "./baocaotheothang-employee-response";

export interface BaoCaoTheoThangAllResponse {
  maNhanVien: string;
  tongCong: number;
  hoTen: string;
  phong: string;
  idVanTay: number;
  duLieuChamCongResponses: BaoCaoTheoThangEmployeeResponse[];
}
