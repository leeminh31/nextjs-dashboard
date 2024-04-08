import { QuyBuThang } from "./quybuthang-response";

export interface QuyBuResponse {
  maNhanVien: string;
  hoTen: string;
  phongBan: string;
  nam: number;
  quyBuThangs: QuyBuThang[];
  phatSinh: number;
  suDung: number;
  conLai: number;
}
