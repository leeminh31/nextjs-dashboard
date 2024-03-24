export interface SearchDanhSachDonRequest {
  tenNhanVien: string | null;
  loaiDon: number | null;
  trangThai: number | null;
  ngayLamViecBatDau: Date | null;
  ngayLamViecKetThuc: Date | null;
  ngayTaoBatDau: Date | null;
  ngayTaoKetThuc: Date | null;
}
