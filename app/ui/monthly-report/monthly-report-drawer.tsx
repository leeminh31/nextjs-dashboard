/* eslint-disable @typescript-eslint/no-explicit-any */
import BaoCaoTheoThangApi from "@/app/api/baocaotheothang";
import CaLamViecApi from "@/app/api/calamviec";
import DanhSachDonApi from "@/app/api/danhsachdon";
import GiaiTrinhApi from "@/app/api/giaitrinh";
import NhanVienApi from "@/app/api/nhanvien";
import { SearchBaoCaoTheoThangByDayRequest } from "@/app/models/baocaotheothang/search-baocaotheothangbyday-request";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { DanhSachDonGeneralData } from "@/app/models/danhsachdon/danhsachdon-general-data";
import { DanhSachDonResponse } from "@/app/models/danhsachdon/danhsachdon-response";
import { DuLieuChamCongResponse } from "@/app/models/dulieuchamcong/dulieuchamcong-response";
import { GiaiTrinhResponse } from "@/app/models/giaitrinh/giaitrinh-response";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { subTime } from "@/app/utils/subTime";
import { Button, Card, Drawer, Row, Space, Tabs } from "antd";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import CreateMonthlyReportExplanationModal from "./create-monthly-report-explanation-modal";
import CreateMonthlyReportRequestModal from "./create-monthly-report-request-modal";
import UpdateMonthlyReportExplantionModal from "./update-monthly-report-explantion-modal";
import UpdateMonthlyReportRequestModal from "./update-monthly-report-request-modal";
import ViewMonthReportRequestModal from "./view-month-report-request-modal";
import ViewMonthlyReportExplanationModal from "./view-monthly-report-explanation-modal";
const MonthlyReportDrawer = (props: any) => {
  const { show, close, data, date, dateFull, shiftName } = props;
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [listRequestData, setListRequestData] = useState<DanhSachDonResponse>();
  const [listExplanationData, setListExplanationData] = useState<
    GiaiTrinhResponse[]
  >([]);
  const [createRequestShow, setCreateRequestShow] = useState(false);
  const [updateRequestShow, setUpdateRequestShow] = useState(false);
  const [viewRequestShow, setViewRequestShow] = useState(false);
  const [createExplanationShow, setCreateExplanationShow] = useState(false);
  const [updateExplanationShow, setUpdateExplanationShow] = useState(false);
  const [viewExplanationShow, setViewExplanationShow] = useState(false);
  const [requestData, setRequestData] = useState<any>();
  const [explanationData, setExplanationData] = useState<any>();
  const [generalData, setGeneralData] = useState<DanhSachDonGeneralData>();
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [listTimekeeping, setListTimekeeping] = useState<
    DuLieuChamCongResponse[]
  >([]);

  const getListRequestByParams = async (
    maNhanVien: string,
    ngayLamViec: Date,
  ) => {
    const response = await DanhSachDonApi.getDanhSachDonByEmployeeId(
      maNhanVien,
      ngayLamViec,
    );
    if (response?.statusCode === "200") {
      setListRequestData(response?.data);
    } else if (response?.statusCode === "545") {
      setListRequestData(undefined);
    } else {
      console.log(response?.message);
    }
  };

  const getListExplanationByParams = async (
    maNhanVien: string,
    ngayLamViec: Date,
  ) => {
    const response = await GiaiTrinhApi.getDanhSachGiaiTrinhByEmployeeId(
      maNhanVien,
      ngayLamViec,
    );
    if (response?.statusCode === "200") {
      setListExplanationData(response?.data);
    } else if (response?.statusCode === "545") {
      setListExplanationData([]);
    } else {
      console.log(response?.message);
    }
  };

  const getTimekeepingByDay = async (
    searchRequest: SearchBaoCaoTheoThangByDayRequest,
  ) => {
    const response =
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
    const response = await CaLamViecApi.getCaLamViec(null, null);
    if (response?.statusCode === "200") {
      setShiftList(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setShiftList(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200") {
      setEmployeeData(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setEmployeeData(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const handleUpdateAndViewRequest = (data: any) => {
    setRequestData(data);
    if (data.trangThai === "0") {
      setUpdateRequestShow(true);
    } else {
      setViewRequestShow(true);
    }
  };

  const handleUpdateAndViewExplanation = (data: any) => {
    setExplanationData(data);
    if (data.trangThai === "0") {
      setUpdateExplanationShow(true);
    } else {
      setViewExplanationShow(true);
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

  const onChange = () => {};

  useEffect(() => {
    const getDate = dayjs(new Date(dateFull));
    const startDate = new Date(getDate.year(), getDate.month(), date + 1);
    const currently = new Date(getDate.year(), getDate.month(), date);
    setCurrentDate(currently);
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: startDate,
        tenCa: shiftName,
      });
    }
  }, [date]);

  useEffect(() => {
    console.log(dateFull);
  }, [dateFull]);

  useEffect(() => {
    console.log("Du lieu can xem: ", data);
    const getDate = dayjs(new Date(dateFull));
    const startDate = new Date(getDate.year(), getDate.month(), date + 1);
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: startDate,
        tenCa: shiftName,
      });

      getListRequestByParams(data.maNhanVien, startDate);

      getListExplanationByParams(data.maNhanVien, startDate);
      setGeneralData(data);
    }
  }, [data]);

  useEffect(() => {
    refresh();
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: date,
        tenCa: shiftName,
      });
      // setShiftName();
    }
  }, []);

  return (
    <>
      <Drawer
        className="monthly-drawer"
        // size="default"
        width={350}
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
                    <span>{shiftName ?? ""}</span>
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
                          (employee) =>
                            employee.maNhanVien === data?.maNhanVien,
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
                            shiftList.find((shift) => shift.tenCa === shiftName)
                              ?.gioBatDauCa,
                            shiftList.find((shift) => shift.tenCa === shiftName)
                              ?.gioKetThucCa,
                          ) -
                            subTime(
                              shiftList.find(
                                (shift) => shift.tenCa === shiftName,
                              )?.gioBatDauNghi,
                              shiftList.find(
                                (shift) => shift.tenCa === shiftName,
                              )?.gioKetThucNghi,
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
                    <span>Giờ bắt đầu ca: </span>
                    <span>
                      {
                        shiftList.find((shift) => shift.tenCa === shiftName)
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
                        shiftList.find((shift) => shift.tenCa === shiftName)
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
                            shiftList.find((shift) => shift.tenCa === shiftName)
                              ?.gioBatDauNghi,
                            shiftList.find((shift) => shift.tenCa === shiftName)
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
                    <span>{listTimekeeping[0]?.tinhCong}</span>
                  </Space>
                  <Space style={{ display: "flex", justifyContent: "center" }}>
                    <h2 style={{ color: "#b98868" }}>Lịch sử chấm công</h2>
                  </Space>
                  {listTimekeeping?.map((item, index) => (
                    <Space
                      key={index}
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
                </Space>
              ),
            },
            {
              label: "Đơn",
              key: "3",
              children: (
                <>
                  <Space
                    direction="vertical"
                    className="request-list"
                    size="middle"
                    style={{
                      display: "flex",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        color: "#b98868",
                        margin: "0",
                      }}
                    >
                      Danh sách đơn
                    </h2>
                    {listRequestData?.listDonBu.map((item, index) => (
                      <Card
                        bodyStyle={{ padding: "0 10px", cursor: "pointer" }}
                        key={index}
                        size="small"
                        onClick={() => handleUpdateAndViewRequest(item)}
                      >
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            fontWeight: "bold",
                            color: "#b98868",
                          }}
                        >
                          Đơn bù
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Ngày tạo:{" "}
                          {dayjs(item.ngayTaoDon).format("DD/MM/YYYY")}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Trạng thái:{"   "}
                          {item.trangThai === "0" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                              }}
                            >
                              Chờ duyệt
                            </div>
                          ) : item.trangThai === "1" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#31CD23",
                                color: "#fff",
                              }}
                            >
                              Đã duyệt
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#F95454",
                                color: "#fff",
                              }}
                            >
                              Đã hủy
                            </div>
                          )}
                        </p>
                      </Card>
                    ))}
                    {listRequestData?.listDonConNho.map((item, index) => (
                      <Card
                        bodyStyle={{ padding: "0 10px", cursor: "pointer" }}
                        key={index + 1000}
                        size="small"
                        onClick={() => handleUpdateAndViewRequest(item)}
                      >
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            fontWeight: "bold",
                            color: "#b98868",
                          }}
                        >
                          Đơn con nhỏ
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Ngày tạo:{" "}
                          {dayjs(item.ngayTaoDon).format("DD/MM/YYYY")}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Trạng thái:{"   "}
                          {item.trangThai === "0" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                              }}
                            >
                              Chờ duyệt
                            </div>
                          ) : item.trangThai === "1" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#31CD23",
                                color: "#fff",
                              }}
                            >
                              Đã duyệt
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#F95454",
                                color: "#fff",
                              }}
                            >
                              Đã hủy
                            </div>
                          )}
                        </p>
                      </Card>
                    ))}
                    {listRequestData?.listDonTangCa.map((item, index) => (
                      <Card
                        bodyStyle={{ padding: "0 10px", cursor: "pointer" }}
                        key={index + 2000}
                        size="small"
                        onClick={() => handleUpdateAndViewRequest(item)}
                      >
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            fontWeight: "bold",
                            color: "#b98868",
                          }}
                        >
                          Đơn tăng ca
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Ngày tạo:{" "}
                          {dayjs(item.ngayTaoDon).format("DD/MM/YYYY")}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Trạng thái:{"   "}
                          {item.trangThai === "0" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                              }}
                            >
                              Chờ duyệt
                            </div>
                          ) : item.trangThai === "1" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#31CD23",
                                color: "#fff",
                              }}
                            >
                              Đã duyệt
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#F95454",
                                color: "#fff",
                              }}
                            >
                              Đã hủy
                            </div>
                          )}
                        </p>
                      </Card>
                    ))}
                    {listRequestData?.listDonPhep.map((item, index) => (
                      <Card
                        bodyStyle={{ padding: "0 10px", cursor: "pointer" }}
                        key={index + 3000}
                        size="small"
                        onClick={() => handleUpdateAndViewRequest(item)}
                      >
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            fontWeight: "bold",
                            color: "#b98868",
                          }}
                        >
                          Đơn phép
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Ngày tạo:{" "}
                          {dayjs(item.ngayTaoDon).format("DD/MM/YYYY")}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Trạng thái:{"   "}
                          {item.trangThai === "0" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                              }}
                            >
                              Chờ duyệt
                            </div>
                          ) : item.trangThai === "1" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#31CD23",
                                color: "#fff",
                              }}
                            >
                              Đã duyệt
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#F95454",
                                color: "#fff",
                              }}
                            >
                              Đã hủy
                            </div>
                          )}
                        </p>
                      </Card>
                    ))}
                  </Space>
                  <Row justify={"center"} style={{ height: "70px" }}>
                    <Space
                      style={{
                        position: "fixed",
                        bottom: "25px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setCreateRequestShow(true);
                        }}
                        type="primary"
                      >
                        Tạo đơn
                      </Button>
                      <Button onClick={close}>Thoát</Button>
                    </Space>
                  </Row>
                </>
              ),
            },
            {
              label: "Giải trình",
              key: "4",
              children: (
                <>
                  <Space
                    direction="vertical"
                    className="request-list"
                    size="middle"
                    style={{
                      display: "flex",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingBottom: "1rem",
                    }}
                  >
                    <h2 style={{ textAlign: "center", color: "#b98868" }}>
                      Danh sách giải trình
                    </h2>
                    {listExplanationData?.map((item, index) => (
                      <Card
                        bodyStyle={{ padding: "0 10px", cursor: "pointer" }}
                        key={index}
                        size="small"
                        onClick={() => handleUpdateAndViewExplanation(item)}
                      >
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            fontWeight: "bold",
                            color: "#b98868",
                          }}
                        >
                          Giải trình {item.loaiGiaiTrinh.toLowerCase()}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Ngày tạo:{" "}
                          {dayjs(item.ngayTaoGiaiTrinh).format("DD/MM/YYYY")}
                        </p>
                        <p
                          style={{
                            width: "100%",
                            margin: "0",
                            color: "#b98868",
                          }}
                        >
                          Trạng thái:{"   "}
                          {item.trangThai === "0" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                              }}
                            >
                              Chờ duyệt
                            </div>
                          ) : item.trangThai === "1" ? (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#31CD23",
                                color: "#fff",
                              }}
                            >
                              Đã duyệt
                            </div>
                          ) : (
                            <div
                              style={{
                                border: "1px solid rgb(185, 136, 104)",
                                borderRadius: "10px",
                                width: "80px",
                                textAlign: "center",
                                display: "inline-block",
                                padding: "0 10px",
                                backgroundColor: "#F95454",
                                color: "#fff",
                              }}
                            >
                              Đã hủy
                            </div>
                          )}
                        </p>
                      </Card>
                    ))}
                  </Space>
                  <Row justify={"center"} style={{ height: "70px" }}>
                    <Space
                      style={{
                        position: "fixed",
                        bottom: "25px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setCreateExplanationShow(true);
                        }}
                        type="primary"
                      >
                        Tạo giải trình
                      </Button>
                      <Button onClick={close}>Thoát</Button>
                    </Space>
                  </Row>
                </>
              ),
            },
          ]}
        />
      </Drawer>
      <CreateMonthlyReportRequestModal
        show={createRequestShow}
        generalData={generalData}
        close={() => setCreateRequestShow(false)}
        ngayLamViec={currentDate}
        employeeData={employeeData}
        refresh={getListRequestByParams}
      />
      <ViewMonthReportRequestModal
        show={viewRequestShow}
        generalData={generalData}
        data={requestData}
        employeeData={employeeData}
        close={() => setViewRequestShow(false)}
      />
      <UpdateMonthlyReportRequestModal
        show={updateRequestShow}
        generalData={generalData}
        data={requestData}
        employeeData={employeeData}
        ngayLamViec={currentDate}
        close={() => setUpdateRequestShow(false)}
        refresh={getListRequestByParams}
      />
      <CreateMonthlyReportExplanationModal
        show={createExplanationShow}
        generalData={generalData}
        employeeData={employeeData}
        ngayLamViec={currentDate}
        close={() => setCreateExplanationShow(false)}
        refresh={getListExplanationByParams}
      />
      <ViewMonthlyReportExplanationModal
        show={viewExplanationShow}
        generalData={generalData}
        employeeData={employeeData}
        data={explanationData}
        close={() => setViewExplanationShow(false)}
        refresh={refresh}
      />
      <UpdateMonthlyReportExplantionModal
        show={updateExplanationShow}
        generalData={generalData}
        employeeData={employeeData}
        ngayLamViec={currentDate}
        data={explanationData}
        close={() => setUpdateExplanationShow(false)}
        refresh={getListExplanationByParams}
      />
    </>
  );
};

export default memo(MonthlyReportDrawer);
