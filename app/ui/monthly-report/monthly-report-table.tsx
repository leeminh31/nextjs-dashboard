/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaoCaoTheoThangApi from "@/app/api/baocaotheothang";
import { BaoCaoTheoThangAllResponse } from "@/app/models/baocaotheothang/baocaotheothangall-response";
import { SearchDuLieuChamCongRequest } from "@/app/models/dulieuchamcong/search-dulieuchamcong-request";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
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
interface DataType {
  key: React.Key;
  STT: number;
  phong: string;
  children?: any[];
}

const MonthlyReportTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date());
  const [spinning, setSpinning] = useState(true);
  const [currentDateClick, setCurrentDateClick] = useState(0);
  const [open, setOpen] = useState(false);
  const [shiftId, setShiftId] = useState<string>();
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
    const response =
      await BaoCaoTheoThangApi.getBaoCaoTheoThangAll(searchRequest);
    if (response?.statusCode === "200") {
      setMonthlyData(response?.data.reverse());
    } else if (response?.statusCode === "545") {
      setMonthlyData(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const assignShift = async () => {
    const response = await BaoCaoTheoThangApi.assignShiftToEmployee();
    if (response?.statusCode === "200") {
      getMonthlyReportByMonth({
        maNhanVien: null,
        ngayBatDau: null,
        ngayKetThuc: null,
        tenNhanVien: null,
        idVanTay: null,
      });
      // refresh();
    } else {
      console.log(response.message);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);

    const getDate = dayjs(new Date(date)).tz();

    getMonthlyReportByMonth({
      ngayBatDau: new Date(getDate.year(), getDate.month(), 2),
      ngayKetThuc: dayjs(getDate).endOf("month").toDate(),
      maNhanVien: values.maNhanVien,
      tenNhanVien: values.tenNhanVien,
      idVanTay: null,
    });
  };

  const generateColumns = () => {
    const cols: ColumnsType<DataType> = [
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
        dataIndex: "phong",
        key: "phong",
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

    const days = [];

    // Lấy ngày hiện tại ở múi giờ của Việt Nam
    const getDate = dayjs(new Date(date)).tz();
    const startDate = new Date(getDate.year(), getDate.month(), 1);
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

      const column: ColumnsType<DataType> = [
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
          onCell: (record) => {
            return {
              onClick: () => {
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

  const handleRowClick = (
    e: React.MouseEvent,
    dateNumber: number,
    currentShiftId: string | undefined,
  ) => {
    // Xóa lớp CSS trước
    const highlightedCells = document.querySelectorAll(".highlighted-cell");
    highlightedCells.forEach((cell) => {
      cell.classList.remove("highlighted-cell");
    });

    console.log(e.currentTarget.closest("td"));

    // Thêm lớp CSS mới vào ô được click
    e.currentTarget.classList.add("highlighted-cell");

    setOpen(true);
    setCurrentDateClick(dateNumber);
    setShiftId(currentShiftId);
  };

  const generateDataTable = () => {
    const getData: DataType[] = [];

    const getDate = dayjs(new Date(date)).tz();

    const listDepartment = new Set<string>();

    monthlyData?.forEach((obj) => {
      listDepartment.add(obj["phong"]);
    });

    const departmentArray = [...listDepartment];

    departmentArray?.map((x, index) => {
      const childrenData = monthlyData
        ?.filter((data) => data.phong === x)
        .map((employee, index) => {
          const rowSpecifyKey: any = {
            // key: `${employee.maNhanVien}`,
            STT: index + 1,
          };

          const rowFixedData: any = {
            phong: employee.phong,
            maNhanVien: employee.maNhanVien,
            hoTen: employee.hoTen,
            tongCong: employee.tongCong ? employee.tongCong.toFixed(2) : 0,
          };

          const days: { [key: string]: React.JSX.Element } = {};

          const startDate = new Date(getDate.year(), getDate.month(), 1);
          while (startDate.getMonth() === getDate.month()) {
            const currentDate = startDate.getDate();
            const currentShiftId = monthlyData
              ?.find((day) => day.maNhanVien === employee.maNhanVien)
              ?.duLieuChamCongResponses?.find(
                (dlcc) => dlcc.ngayLamViec === currentDate,
              )?.tenCa;
            days[startDate.getDate()] = (
              <div
                onClick={(e) => handleRowClick(e, currentDate, currentShiftId)}
                style={{
                  width: "100%",
                  padding: "0 5px",
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "50px",
                  cursor: "pointer",
                  alignItems: "center",
                  backgroundColor: monthlyData
                    ?.find((day) => day.maNhanVien === employee.maNhanVien)
                    ?.duLieuChamCongResponses?.find(
                      (dlcc) => dlcc.ngayLamViec === currentDate,
                    )?.isYellow
                    ? "gold"
                    : "transparent",
                }}
              >
                {monthlyData
                  ?.find((day) => day.maNhanVien === employee.maNhanVien)
                  ?.duLieuChamCongResponses?.find(
                    (dlcc) => dlcc.ngayLamViec === currentDate,
                  )?.nghiPhep ? (
                  <span style={{ color: "#31cd23" }}>AL</span>
                ) : (
                  <span>
                    {monthlyData
                      ?.find((day) => day.maNhanVien === employee.maNhanVien)
                      ?.duLieuChamCongResponses?.find(
                        (dlcc) => dlcc.ngayLamViec === currentDate,
                      )?.tenCa ?? ""}
                    {monthlyData
                      ?.find((day) => day.maNhanVien === employee.maNhanVien)
                      ?.duLieuChamCongResponses?.find(
                        (dlcc) => dlcc.ngayLamViec === currentDate,
                      )?.allowOT
                      ? "*"
                      : ""}
                  </span>
                )}
                <span>
                  {" "}
                  {monthlyData
                    ?.find((day) => day.maNhanVien === employee.maNhanVien)
                    ?.duLieuChamCongResponses?.find(
                      (dlcc) => dlcc.ngayLamViec === currentDate,
                    )?.nghiPhep ? (
                    <span style={{ color: "#31cd23" }}>
                      {
                        monthlyData
                          ?.find(
                            (day) => day.maNhanVien === employee.maNhanVien,
                          )
                          ?.duLieuChamCongResponses?.find(
                            (dlcc) => dlcc.ngayLamViec === currentDate,
                          )?.gioLamViecTheoCa
                      }
                    </span>
                  ) : (monthlyData
                      ?.find((day) => day.maNhanVien === employee.maNhanVien)
                      ?.duLieuChamCongResponses?.find(
                        (dlcc) => dlcc.ngayLamViec === currentDate,
                      )?.gioLamViec ?? 0) <
                    (monthlyData
                      ?.find((day) => day.maNhanVien === employee.maNhanVien)
                      ?.duLieuChamCongResponses?.find(
                        (dlcc) => dlcc.ngayLamViec === currentDate,
                      )?.gioLamViecTheoCa ?? 0) ? (
                    <span style={{ color: "red" }}>
                      {" "}
                      {monthlyData
                        ?.find((day) => day.maNhanVien === employee.maNhanVien)
                        ?.duLieuChamCongResponses?.find(
                          (dlcc) => dlcc.ngayLamViec === currentDate,
                        )?.gioLamViec || 0}{" "}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {monthlyData
                        ?.find((day) => day.maNhanVien === employee.maNhanVien)
                        ?.duLieuChamCongResponses?.find(
                          (dlcc) => dlcc.ngayLamViec === currentDate,
                        )?.gioLamViec || 0}{" "}
                    </span>
                  )}{" "}
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
        phong: x,
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

    generateColumns();
    generateDataTable();

    setSpinning(false);
  }, []);

  useEffect(() => {
    generateDataTable();
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
                onClick={() => assignShift()}
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
        shiftName={shiftId}
        close={() => {
          setReportData(undefined);
          setOpen(false);
        }}
      />
    </>
  );
};

export default memo(MonthlyReportTable);
