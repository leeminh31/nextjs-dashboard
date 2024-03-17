import BaoCaoTheoThangApi from "@/app/api/baocaotheothang";
import CaLamViecApi from "@/app/api/calamviec";
import NhanVienApi from "@/app/api/nhanvien";
import { SearchBaoCaoTheoThangByDayRequest } from "@/app/models/baocaotheothang/search-baocaotheothangbyday-request";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { DuLieuChamCongResponse } from "@/app/models/dulieuchamcong/dulieuchamcong-response";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { subTime } from "@/app/utils/subTime";
import { Drawer, Form, Select, Space, Tabs } from "antd";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
const { Option } = Select;

const MonthlyReportDrawer = (props: any) => {
  const { show, close, data, date, dateFull } = props;
  const [form] = Form.useForm();
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [shiftId, setShiftId] = useState(0);
  const [listTimekeeping, setListTimekeeping] = useState<
    DuLieuChamCongResponse[]
  >([]);
  // const [shiftName, setShiftName] = useState("");
  const [timekeepingData, setTimekeepingData] = useState<
    DuLieuChamCongResponse[]
  >([]);

  const getTimekeepingByDay = async (
    searchRequest: SearchBaoCaoTheoThangByDayRequest,
  ) => {
    let response =
      await BaoCaoTheoThangApi.getBaoCaoTheoThangByDay(searchRequest);
    if (response?.statusCode === "200") {
      setListTimekeeping(response?.data);
    } else if (response?.statusCode === "545") {
      setListTimekeeping([]);
    } else {
      console.log(response?.message);
    }
  };

  const getShiftName = async () => {
    let response = await CaLamViecApi.getCaLamViec(null, null);
    if (response?.statusCode === "200") {
      setShiftList(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setShiftList(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200") {
      setEmployeeData(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setEmployeeData(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const refresh = () => {
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });

    getShiftName();
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    console.log(dateFull);

    const getDate = dayjs(new Date(dateFull));
    let startDate = new Date(getDate.year(), getDate.month(), date + 1);
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: startDate,
      });
    }
  }, [date]);

  useEffect(() => {
    console.log(dateFull);
  }, [dateFull]);

  useEffect(() => {
    console.log(data);
    const getDate = dayjs(new Date(dateFull));
    let startDate = new Date(getDate.year(), getDate.month(), date + 1);
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: startDate,
      });
    }
  }, [data]);

  useEffect(() => {
    refresh();
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: date,
      });
      // setShiftName();
    }
    setShiftId(data?.maCa);
  }, []);

  return (
    <Drawer
      className="monthly-drawer"
      size="default"
      placement="right"
      onClose={close}
      open={show}
    >
      <Tabs
        onChange={onChange}
        type="card"
        defaultActiveKey="1"
        items={[
          {
            label: "Thông tin",
            key: "1",
            children: (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space style={{ display: "flex", justifyContent: "center" }}>
                  <h2 style={{ color: "#b98868" }}>Ca Làm Việc</h2>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Tên ca: </span>
                  <span>
                    {
                      shiftList.find((shift) => shift.maCa === data?.maCa)
                        ?.tenCa
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>ID vân tay: </span>
                  <span>
                    {
                      employeeData.find(
                        (employee) => employee.maNhanVien === data?.maNhanVien,
                      )?.idVanTay
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Tổng thời gian ca: </span>
                  <span>
                    {
                      <>
                        {subTime(
                          shiftList.find((shift) => shift.maCa === data?.maCa)
                            ?.gioBatDauCa,
                          shiftList.find((shift) => shift.maCa === data?.maCa)
                            ?.gioKetThucCa,
                        ) -
                          subTime(
                            shiftList.find((shift) => shift.maCa === data?.maCa)
                              ?.gioBatDauNghi,
                            shiftList.find((shift) => shift.maCa === data?.maCa)
                              ?.gioKetThucNghi,
                          ) || undefined}
                      </>
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Giờ bắt đầu ca: </span>
                  <span>
                    {
                      shiftList.find((shift) => shift.maCa === data?.maCa)
                        ?.gioBatDauCa
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Giờ kết thúc ca: </span>
                  <span>
                    {
                      shiftList.find((shift) => shift.maCa === data?.maCa)
                        ?.gioKetThucCa
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Tổng thời gian nghỉ: </span>
                  <span>
                    {
                      <>
                        {subTime(
                          shiftList.find((shift) => shift.maCa === data?.maCa)
                            ?.gioBatDauNghi,
                          shiftList.find((shift) => shift.maCa === data?.maCa)
                            ?.gioKetThucNghi,
                        )}
                      </>
                    }
                  </span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Thời gian làm việc thực tế: </span>
                  <span>{listTimekeeping[0]?.thoiGianLamViecThucTe}</span>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Tính công: </span>
                  <span>480</span>
                </Space>
                <Space style={{ display: "flex", justifyContent: "center" }}>
                  <h2 style={{ color: "#b98868" }}>Lịch sử chấm công</h2>
                </Space>
                {listTimekeeping?.map((item, index) => (
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#996B4D",
                      padding: "8px",
                    }}
                  >
                    <span>Lần {item.lanChamCong}: </span>
                    <span>
                      {
                        listTimekeeping?.find(
                          (timekeeping) =>
                            timekeeping.lanChamCong === item.lanChamCong,
                        )?.gioChamCong
                      }
                    </span>
                  </Space>
                ))}
                <Space style={{ display: "flex", justifyContent: "center" }}>
                  <h2 style={{ color: "#b98868" }}>Lịch sử sửa ca</h2>
                </Space>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#996B4D",
                    padding: "8px",
                  }}
                >
                  <span>Lần 1:</span>
                  <span>8A -{">"} 9A</span>
                </Space>
              </Space>
            ),
          },
          {
            label: "Sửa ca",
            key: "2",
            children: "Sửa ca",
          },
          {
            label: "Đơn",
            key: "3",
            children: "Đơn",
          },
          {
            label: "Giải trình",
            key: "4",
            children: "Giải trình",
          },
        ]}
      />
    </Drawer>
  );
};

export default memo(MonthlyReportDrawer);
