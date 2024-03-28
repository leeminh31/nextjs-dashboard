/* eslint-disable @typescript-eslint/no-explicit-any */
import BaoCaoTheoThangApi from "@/app/api/baocaotheothang";
import CaLamViecApi from "@/app/api/calamviec";
import DanhSachDonApi from "@/app/api/danhsachdon";
import GiaiTrinhApi from "@/app/api/giaitrinh";
import NhanVienApi from "@/app/api/nhanvien";
import { SearchBaoCaoTheoThangByDayRequest } from "@/app/models/baocaotheothang/search-baocaotheothangbyday-request";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { DanhSachDonResponse } from "@/app/models/danhsachdon/danhsachdon-response";
import { CreateDonBuRequest } from "@/app/models/donbu/create-donbu-request";
import { CreateDonConNhoRequest } from "@/app/models/donconnho/create-donconnho-request";
import { CreateDonPhepRequest } from "@/app/models/donphep/create-donphep-request";
import { CreateDonTangCaRequest } from "@/app/models/dontangca/create-dontangca-request";
import { DuLieuChamCongResponse } from "@/app/models/dulieuchamcong/dulieuchamcong-response";
import { CreateGiaiTrinhRequest } from "@/app/models/giaitrinh/create-giaitrinh-request";
import { GiaiTrinhResponse } from "@/app/models/giaitrinh/giaitrinh-response";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { subTime } from "@/app/utils/subTime";
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
const { Option } = Select;

const MonthlyReportDrawer = (props: any) => {
  const { show, close, data, date, dateFull } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [listRequestData, setListRequestData] = useState<DanhSachDonResponse>();
  const [listExplanationData, setListExplanationData] = useState<
    GiaiTrinhResponse[]
  >([]);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [createRequestShow, setCreateRequestShow] = useState(false);
  const [createExplanationShow, setCreateExplanationShow] = useState(false);
  const [requestData, setRequestData] = useState<any>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [requestType, setRequestType] = useState(0);
  const [listTimekeeping, setListTimekeeping] = useState<
    DuLieuChamCongResponse[]
  >([]);

  const getListRequestByParams = async (maNhanVien: string | null) => {
    const response =
      await DanhSachDonApi.getDanhSachDonByEmployeeId(maNhanVien);
    if (response?.statusCode === "200") {
      setListRequestData(response?.data);
    } else if (response?.statusCode === "545") {
      setListRequestData(undefined);
    } else {
      console.log(response?.message);
    }
  };

  const getListExplanationByParams = async (maNhanVien: string | null) => {
    const response =
      await GiaiTrinhApi.getDanhSachGiaiTrinhByEmployeeId(maNhanVien);
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

  const onCreateExplanation = async (values: any) => {
    const ngayLamViec = currentDate;
    ngayLamViec.setDate(ngayLamViec.getDate() + 1);

    const requestData: CreateGiaiTrinhRequest = {
      maNhanVien: data?.maNhanVien,
      ngayLamViec: new Date(ngayLamViec),
      ngayTaoGiaiTrinh: new Date(),
      lyDo: values.lyDo,
      nguoiDuyet: "",
      loaiGiaiTrinh: values.loaiGiaiTrinh,
      trangThai: "0",
    };

    const response = await GiaiTrinhApi.createGiaiTrinh(requestData);
    if (response.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Thêm mới giải trình thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      form2.resetFields();
    } else {
      console.log(response.message);
    }

    setCreateExplanationShow(false);
  };

  const onFinish = async (values: any) => {
    const ngayLamViec = currentDate;
    ngayLamViec.setDate(ngayLamViec.getDate() + 1);

    if (requestType === 1) {
      const requestData: CreateDonBuRequest = {
        maNhanVien: data?.maNhanVien,
        ngayLamViec: new Date(ngayLamViec),
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        soPhutXinBu: values.soPhutXinBu,
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonBu(requestData);
      if (response.statusCode === "200") {
        refresh();
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn bù thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (requestType === 2) {
      const requestData: CreateDonConNhoRequest = {
        maNhanVien: data?.maNhanVien,
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tuNgay: values.tuNgay,
        denNgay: values.denNgay,
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonConNho(requestData);
      if (response.statusCode === "200") {
        refresh();
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn con nhỏ thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (requestType === 3) {
      const requestData: CreateDonPhepRequest = {
        maNhanVien: data?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngayLamViec),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonPhep(requestData);
      if (response.statusCode === "200") {
        refresh();
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn phép thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (requestType === 4) {
      const requestData: CreateDonTangCaRequest = {
        maNhanVien: data?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngayLamViec),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tangCaTu: values.tangCaTu,
        tangCaDen: values.tangCaDen,
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonTangCa(requestData);
      if (response.statusCode === "200") {
        refresh();
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn tăng ca thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    setCreateRequestShow(false);
  };

  const handleUpdateAndViewRequest = (data: any) => {
    console.log("Thong Tin Don: ", data);

    setRequestType(data.loaiDon);
    setRequestData(data);
    setCreateRequestShow(true);
  };

  const timeDiff = (tangCaTu: string, tangCaDen: string) => {
    if (tangCaTu && tangCaDen) {
      const tangCaTuDate = tangCaTu?.split(":").map(Number);
      const time1 = new Date(
        0,
        0,
        0,
        tangCaTuDate[0],
        tangCaTuDate[1],
      ).getTime();
      const tangCaDenDate = tangCaDen?.split(":").map(Number);
      const time2 = new Date(
        0,
        0,
        0,
        tangCaDenDate[0],
        tangCaDenDate[1],
      ).getTime();

      const diffms = Math.abs(time2 - time1);

      const minutes = Math.floor(diffms / (1000 * 60));

      return minutes;
    }
  };

  const handleRequestType = (e: any) => {
    setRequestType(e);
  };

  const renderManageView = (loaiDon: number) => {
    switch (loaiDon) {
      case 1:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="quyNghiBuHienCo"
                label="Quỹ nghỉ bù hiện có"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <b style={{ width: "70px", color: "#996B4D" }}>960</b>
              </Form.Item>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="soPhutXinBu"
                label="Số phút xin bù"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <Input
                  value={requestData?.soPhutXinBu}
                  style={{ width: "70px" }}
                  type={"number"}
                />
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "0 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
                <TextArea
                  value={requestData?.lyDo}
                  style={{ width: "420px" }}
                  rows={4}
                />
              </Form.Item>
            </Space>
          </>
        );
      case 3:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="quyNghiBuHienCo"
                label="Quỹ nghỉ phép hiện có"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <Input
                  style={{ width: "70px" }}
                  type={"number"}
                  defaultValue="960"
                  disabled
                />
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "0 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
                <TextArea
                  value={requestData?.lyDo}
                  style={{ width: "420px" }}
                  rows={4}
                />
              </Form.Item>
            </Space>
          </>
        );
      case 2:
        return (
          <>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item label="Từ ngày: " name="tuNgay">
                <DatePicker
                  style={{ width: "120px" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                  value={requestData.tuNgay}
                />
              </Form.Item>
              <Form.Item label="Đến ngày: " name="denNgay">
                <DatePicker
                  style={{ width: "120px" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                  value={requestData.denNgay}
                />
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "0 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
                <TextArea
                  value={requestData.lyDo}
                  style={{ width: "420px" }}
                  rows={4}
                />
              </Form.Item>
            </Space>
          </>
        );
      case 4:
        return (
          <>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item label="Tăng ca từ" name="tangCaTu">
                <TimePicker
                  style={{ width: "100px" }}
                  placeholder="Vui lòng chọn"
                  value={requestData.tangCaTu}
                />
              </Form.Item>
              <Form.Item label="đến: " name="tangCaDen">
                <TimePicker
                  style={{ width: "100px" }}
                  placeholder="Vui lòng chọn"
                  value={requestData.tangCaDen}
                />
              </Form.Item>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>
                Quy đổi số phút:{" "}
                {timeDiff(requestData?.tangCaTu, requestData?.tangCaDen)}
              </span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "0 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
                <TextArea
                  value={requestData.lyDo}
                  style={{ width: "420px" }}
                  rows={4}
                />
              </Form.Item>
            </Space>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const getDate = dayjs(new Date(dateFull));
    const startDate = new Date(getDate.year(), getDate.month(), date + 1);
    const currently = new Date(getDate.year(), getDate.month(), date);
    setCurrentDate(currently);
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
    const getDate = dayjs(new Date(dateFull));
    const startDate = new Date(getDate.year(), getDate.month(), date + 1);
    if (data) {
      getTimekeepingByDay({
        maNhanVien: data?.maNhanVien,
        ngayLamViec: startDate,
      });

      getListRequestByParams(data?.maNhanVien);

      getListExplanationByParams(data?.maNhanVien);
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
  }, []);

  return (
    <>
      {contextHolder}
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
                    <span>Tên nhân viên: </span>
                    <span>{data?.hoTen}</span>
                  </Space>
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#996B4D",
                      padding: "8px",
                    }}
                  >
                    <span>Ngày: </span>
                    <span>{dayjs(currentDate).format("DD/MM/YYYY")}</span>
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
                            shiftList.find((shift) => shift.maCa === data?.maCa)
                              ?.gioBatDauCa,
                            shiftList.find((shift) => shift.maCa === data?.maCa)
                              ?.gioKetThucCa,
                          ) -
                            subTime(
                              shiftList.find(
                                (shift) => shift.maCa === data?.maCa,
                              )?.gioBatDauNghi,
                              shiftList.find(
                                (shift) => shift.maCa === data?.maCa,
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
                  <Space style={{ display: "flex", justifyContent: "center" }}>
                    <h2 style={{ color: "#b98868" }}>Lịch sử sửa ca</h2>
                  </Space>
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#996B4D",
                      padding: "0px 8px 32px 8px",
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
                        bodyStyle={{ padding: "0 10px" }}
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
                        bodyStyle={{ padding: "0 10px" }}
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
                        bodyStyle={{ padding: "0 10px" }}
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
                        bodyStyle={{ padding: "0 10px" }}
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
                        bodyStyle={{ padding: "0 10px" }}
                        key={index}
                        size="small"
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
      <Modal
        className="manage-request-drawer"
        closable={false}
        centered
        footer={
          <>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              {" "}
              Tạo đơn{" "}
            </Button>
            <Button
              onClick={() => {
                setCreateRequestShow(false);
                form.resetFields();
                setRequestType(0);
              }}
            >
              {" "}
              Thoát{" "}
            </Button>
          </>
        }
        open={createRequestShow}
        width={500}
      >
        <Form
          className="view-request"
          form={form}
          name="viewApplication"
          onFinish={onFinish}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ color: "#b98868" }}>Đơn nhân viên</h3>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <b>Thông tin chi tiết nhân viên</b>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Họ tên nhân viên: {data?.hoTen} </span>
              <span>Ngày tạo: {dayjs(new Date()).format("DD/MM/YYYY")}</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Mã nhân viên: {data?.maNhanVien} </span>
              <span>
                Ngày làm việc: {dayjs(currentDate).format("DD/MM/YYYY")}
              </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Phòng ban: {data?.phongBan} </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>
                Chức vụ:{" "}
                {
                  employeeData?.find((e) => e.maNhanVien === data?.maNhanVien)
                    ?.chucVu
                }{" "}
              </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
                marginTop: "24px",
              }}
            >
              <b>Nội dung chi tiết đơn: </b>
            </Space>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                label="Loại đơn"
                name="loaiDon"
              >
                <Select value={requestType} onChange={handleRequestType}>
                  <Option value={1}>Đơn bù</Option>
                  <Option value={2}>Đơn con nhỏ</Option>
                  <Option value={3}>Đơn phép</Option>
                  <Option value={4}>Đơn tăng ca</Option>
                </Select>
              </Form.Item>
            </Space>
            {renderManageView(requestType)}
          </Space>
        </Form>
      </Modal>
      <Modal
        className="manage-request-drawer"
        closable={false}
        centered
        footer={
          <>
            <Button
              type="primary"
              onClick={() => {
                form2.submit();
              }}
            >
              {" "}
              Tạo giải trình{" "}
            </Button>
            <Button
              onClick={() => {
                setCreateExplanationShow(false);
                form2.resetFields();
                setRequestType(0);
              }}
            >
              {" "}
              Thoát{" "}
            </Button>
          </>
        }
        open={createExplanationShow}
        width={500}
      >
        <Form
          className="view-request"
          form={form2}
          name="createExplanationModal"
          onFinish={onCreateExplanation}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <h3 style={{ color: "#b98868" }}>Giải trình nhân viên</h3>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <b>Thông tin chi tiết nhân viên</b>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Họ tên nhân viên: {data?.hoTen} </span>
              <span>Ngày tạo: {dayjs(new Date()).format("DD/MM/YYYY")}</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Mã nhân viên: {data?.maNhanVien} </span>
              <span>
                Ngày làm việc: {dayjs(currentDate).format("DD/MM/YYYY")}
              </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Phòng ban: {data?.phongBan} </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>
                Chức vụ:{" "}
                {
                  employeeData?.find((e) => e.maNhanVien === data?.maNhanVien)
                    ?.chucVu
                }{" "}
              </span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item label="Loại giải trình" name="loaiGiaiTrinh">
                <Select>
                  <Option value="Đi muộn">Đi muộn</Option>
                  <Option value="Về sớm">Về sớm</Option>
                </Select>
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "0 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
                <TextArea style={{ width: "420px" }} rows={4} />
              </Form.Item>
            </Space>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default memo(MonthlyReportDrawer);
