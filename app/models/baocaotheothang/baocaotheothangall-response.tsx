import { BaoCaoTheoThangEmployeeResponse } from "./baocaotheothang-employee-response";

export interface BaoCaoTheoThangAllResponse {
  maNhanVien: string;
  tongCong: number;
  duLieuChamCongResponses: BaoCaoTheoThangEmployeeResponse[];
}
