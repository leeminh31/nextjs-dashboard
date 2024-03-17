"use client";

import BaoCaoTheoThangApi from "@/app/api/baocaotheothang";
import CaLamViecApi from "@/app/api/calamviec";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { BaoCaoTheoThangAllResponse } from "@/app/models/baocaotheothang/baocaotheothangall-response";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { SearchDuLieuChamCongRequest } from "@/app/models/dulieuchamcong/search-dulieuchamcong-request";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { memo, useEffect, useState } from "react";
import MonthlyReportDrawer from "./monthly-report-drawer";
const { Option } = Select;

interface DataType {
  key: React.Key;
  STT: number;
  phongBan: string;
  children?: any[];
}

const MonthlyReportTable: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date());
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>();
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [spinning, setSpinning] = useState(true);
  const [currentDateClick, setCurrentDateClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [monthlyData, setMonthlyData] = useState<BaoCaoTheoThangAllResponse[]>(
    [],
  );
  const [reportData, setReportData] = useState<DataType>();
  const [data, setData] = useState<DataType[]>([]);

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const getMonthlyReportByMonth = async (
    searchRequest: SearchDuLieuChamCongRequest,
  ) => {
    let response =
      await BaoCaoTheoThangApi.getBaoCaoTheoThangAll(searchRequest);
    if (response?.statusCode === "200") {
      setMonthlyData(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setMonthlyData(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const getShiftName = async () => {
    let response = await CaLamViecApi.getCaLamViec(null, null);
    if (response?.statusCode === "200") {
      setShiftList(response.data.reverse());
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200") {
      setEmployeeData(response.data.reverse());
    } else if (response?.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    let response = await PhongBanApi.getPhongBan(searchRequest);
    if (response?.statusCode === "200") {
      setDepartmentData(response?.data);
    } else if (response?.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
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

    getDepartmentsByParams({
      tenPhongBan: null,
      thuKyPhongBan: null,
      truongPhongBan: null,
    });

    getShiftName();
  };

  const onFinish = (values: any) => {
    console.log(values);

    if (values.maNhanVien || values.tenNhanVien) {
      setIsSearch(true);
      getEmployeeByParams({
        hoTen: values.tenNhanVien,
        maNhanVien: values.maNhanVien,
        idVanTay: null,
        maPhongBan: null,
        chucVu: null,
      });
      return;
    }

    if (!values.maNhanVien && !values.tenNhanVien) {
      refresh();
      return;
    }
  };

  const generateColumns = () => {
    let cols: ColumnsType<DataType> = [
      {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
        width: 85,
        fixed: "left",
      },
      {
        title: "Key",
        dataIndex: "key",
        key: "key",
        width: 0,
        fixed: "left",
      },
      {
        title: "Phòng",
        dataIndex: "phongBan",
        key: "phongBan",
        fixed: "left",
        width: 80,
      },
      {
        title: "Mã nhân viên",
        dataIndex: "maNhanVien",
        key: "maNhanVien",
        fixed: "left",
        width: 85,
      },
      {
        title: "Họ tên",
        dataIndex: "hoTen",
        key: "hoTen",
        fixed: "left",
        width: 100,
      },
      {
        title: "Tổng công",
        dataIndex: "tongCong",
        key: "tongCong",
        fixed: "left",
        width: 70,
      },
    ];

    const daysOfWeekInVietnamese = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    let days = [];

    // Lấy ngày hiện tại ở múi giờ của Việt Nam
    const getDate = dayjs(new Date(date)).tz();
    let startDate = new Date(getDate.year(), getDate.month(), 1);
    while (startDate.getMonth() === getDate.month()) {
      days.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    days.map((day: Date) => {
      const dateCol = dayjs(day).tz();

      // Định dạng ngày theo mẫu "dddd (D/M)"
      const dayOfWeekNumber = dateCol.day();
      const dayOfWeekVietnamese = daysOfWeekInVietnamese[dayOfWeekNumber];

      // Định dạng ngày theo mẫu "Thứ 2 (D/M)"
      const formattedDate = `${dayOfWeekVietnamese} (${dateCol.format("DD/MM")})`;

      let column: ColumnsType<DataType> = [
        {
          title: (
            <>
              <p>{dayOfWeekVietnamese}</p>
              <p>({dateCol.format("DD/MM")})</p>
            </>
          ),
          dataIndex: dateCol.date(),
          key: dateCol.date(),
          width: 70,
          onCell: (record, rowIndex) => {
            return {
              onClick: (ev) => {
                setReportData(record);
              },
            };
          },
        },
      ];

      cols.push(column[0]);
    });
    return cols;
  };

  const handleRowClick = (dateNumber: number) => {
    setOpen(true);
    setCurrentDateClick(dateNumber);
  };

  const generateDataTable = () => {
    const getData: DataType[] = [];

    // const listChildren = timekeepingData.filter((item) => item.maNhanVien);
    // Lấy ngày hiện tại ở múi giờ của Việt Nam
    const getDate = dayjs(new Date(date)).tz();

    console.log("Tim kiem de", isSearch);

    !isSearch
      ? departmentData?.map((x, index) => {
          const childrenData = employeeData
            ?.filter((employee) => employee.maPhongBan === x.maPhongBan)
            .map((employee, index) => {
              const rowSpecifyKey: any = {
                // key: `${employee.maNhanVien}`,
                STT: index + 1,
              };

              const rowFixedData = {
                phongBan: x.tenPhongBan,
                maNhanVien: employee.maNhanVien,
                hoTen: employee.hoTen,
                maCa: employee.maCa,
                tongCong: monthlyData?.find(
                  (data) => data.maNhanVien === employee.maNhanVien,
                )
                  ? monthlyData?.find(
                      (data) => data.maNhanVien === employee.maNhanVien,
                    )?.tongCong
                  : 0,
              };

              const shiftName = shiftList.find(
                (shift) => shift.maCa === employee.maCa,
              )?.tenCa;

              let days: { [key: string]: React.JSX.Element } = {};

              let startDate = new Date(getDate.year(), getDate.month(), 1);
              while (startDate.getMonth() === getDate.month()) {
                const currentDay = startDate;
                const currentDate = startDate.getDate();
                days[startDate.getDate()] = (
                  <div
                    onClick={() => handleRowClick(currentDate)}
                    style={{
                      width: "100%",
                      padding: "0 5px",
                      display: "flex",
                      justifyContent: "space-between",
                      minHeight: "50px",
                      cursor: "pointer",
                      alignItems: "center",
                    }}
                  >
                    <span> {shiftName} </span>
                    <span>
                      {" "}
                      {monthlyData
                        ?.find((day) => day.maNhanVien === employee.maNhanVien)
                        ?.duLieuChamCongResponses?.find(
                          (dlcc) => dlcc.ngayLamViec === currentDate,
                        )?.gioLamViec || 0}{" "}
                    </span>
                  </div>
                );
                startDate.setDate(startDate.getDate() + 1);
              }

              const row = Object.assign(rowSpecifyKey, rowFixedData, days);

              return row;
            });

          getData.push({
            key: index + 1,
            STT: index + 1,
            phongBan: x.tenPhongBan,
            children: childrenData,
          });
        })
      : departmentData
          ?.filter((c) =>
            employeeData.some((e) => e.maPhongBan === c.maPhongBan),
          )
          .map((x, index) => {
            const childrenData = employeeData
              .filter((employee) => employee.maPhongBan === x.maPhongBan)
              .map((employee, index) => {
                const rowSpecifyKey: any = {
                  // key: `${employee.maNhanVien}`,
                  STT: index + 1,
                };

                const rowFixedData = {
                  phongBan: x.tenPhongBan,
                  maNhanVien: employee.maNhanVien,
                  hoTen: employee.hoTen,
                  maCa: employee.maCa,
                  tongCong: monthlyData?.find(
                    (data) => data.maNhanVien === employee.maNhanVien,
                  )
                    ? monthlyData?.find(
                        (data) => data.maNhanVien === employee.maNhanVien,
                      )?.tongCong
                    : 0,
                };

                const shiftName = shiftList.find(
                  (shift) => shift.maCa === employee.maCa,
                )?.tenCa;

                let days: { [key: string]: React.JSX.Element } = {};

                let startDate = new Date(getDate.year(), getDate.month(), 1);
                while (startDate.getMonth() === getDate.month()) {
                  const currentDay = startDate;
                  const currentDate = startDate.getDate();
                  days[startDate.getDate()] = (
                    <div
                      onClick={() => handleRowClick(currentDate)}
                      style={{
                        width: "100%",
                        padding: "0 5px",
                        display: "flex",
                        justifyContent: "space-between",
                        minHeight: "50px",
                        cursor: "pointer",
                        alignItems: "center",
                      }}
                    >
                      <span> {shiftName} </span>
                      <span>
                        {" "}
                        {monthlyData
                          ?.find(
                            (day) => day.maNhanVien === employee.maNhanVien,
                          )
                          ?.duLieuChamCongResponses?.find(
                            (dlcc) => dlcc.ngayLamViec === currentDate,
                          )?.gioLamViec || 0}{" "}
                      </span>
                    </div>
                  );
                  startDate.setDate(startDate.getDate() + 1);
                }

                const row = Object.assign(rowSpecifyKey, rowFixedData, days);

                return row;
              });

            getData.push({
              key: index + 1,
              STT: index + 1,
              phongBan: x.tenPhongBan,
              children: childrenData,
            });
          });

    setData(getData);
  };

  const onChangeDate = (e: any) => {
    setDate(e);
  };

  const parseDate = dayjs(new Date(date));

  useEffect(() => {
    const getDate = dayjs(new Date()).tz();

    getMonthlyReportByMonth({
      ngayBatDau: new Date(getDate.year(), getDate.month(), 2),
      ngayKetThuc: dayjs(getDate).endOf("month").toDate(),
      maNhanVien: null,
      tenNhanVien: null,
      idVanTay: null,
    });

    refresh();
    generateColumns();
    generateDataTable();

    setSpinning(false);
  }, []);

  useEffect(() => {
    if (isSearch) {
      generateDataTable();
      setIsSearch(false);
    }
  }, [employeeData]);

  useEffect(() => {
    generateDataTable();
    setIsSearch(false);
  }, [monthlyData]);

  useEffect(() => {
    const getDate = dayjs(new Date(date)).tz();

    getMonthlyReportByMonth({
      ngayBatDau: new Date(getDate.year(), getDate.month(), 2),
      ngayKetThuc: dayjs(getDate).endOf("month").toDate(),
      maNhanVien: null,
      tenNhanVien: null,
      idVanTay: null,
    });

    generateColumns();
    generateDataTable();
  }, [date]);

  useEffect(() => {
    setSpinning(true);
    generateDataTable();
    setSpinning(false);
  }, [departmentData]);

  return (
    <>
      <Spin spinning={spinning}>
        <Form
          form={form}
          style={formStyle}
          onFinish={onFinish}
          name="advanced_search"
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item
                name={"khoangThoiGian"}
                label="Khoảng thời gian"
                labelCol={{ span: 24 }}
              >
                <DatePicker
                  format={"MM/YYYY"}
                  placeholder="Tháng"
                  picker="month"
                  onChange={(e) => onChangeDate(e)}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"maNhanVien"}
                label="Mã nhân viên"
                labelCol={{ span: 24 }}
              >
                <Input
                  placeholder="Mã nhân viên"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"tenNhanVien"}
                label="Tên nhân viên"
                labelCol={{ span: 24 }}
              >
                <Input
                  placeholder="Tên nhân viên"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Tạo lại
            </Button>
          </Row>
        </Form>
        <div
          style={{
            paddingLeft: "24px",
            paddingRight: "24px",
            backgroundColor: colorBgContainer,
            marginTop: "20px",
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{
              height: "50px",
              marginBottom: "10px",
            }}
          >
            <span>
              <b>{`Báo cáo từ ngày 01/${parseDate.month() + 1}/${parseDate.year()} đến ngày ${parseDate.daysInMonth()}/${parseDate.month() + 1}/${parseDate.year()}`}</b>
            </span>
            <Row>
              <Button
                type="primary"
                style={{ marginLeft: "12px" }}
                onClick={() => console.log("Phân ca")}
              >
                Phân ca
              </Button>
            </Row>
          </Flex>
          <Table
            className="monthly-report"
            scroll={{ x: 3500, y: 500 }}
            // rowSelection={rowSelection}
            columns={generateColumns()}
            dataSource={data}
            pagination={false}
          />
        </div>
      </Spin>
      <MonthlyReportDrawer
        dateFull={date}
        date={currentDateClick}
        data={reportData}
        show={open}
        close={() => {
          setReportData(undefined);
          setOpen(false);
        }}
      />
    </>
  );
};

export default memo(MonthlyReportTable);
