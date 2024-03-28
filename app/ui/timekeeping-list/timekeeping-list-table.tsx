/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CaLamViecApi from "@/app/api/calamviec";
import DuLieuChamCongApi from "@/app/api/dulieuchamcong";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { DuLieuChamCongResponse } from "@/app/models/dulieuchamcong/dulieuchamcong-response";
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
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ImportTimeKeeping from "./timekeeping-list-import";

const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  maChamCong: number;
  idVanTay: number;
  hoTen: string;
  maNhanVien: string;
  phongBan: string;
  ngayChamCong: string;
  caLam: string;
  chamLan1: string | undefined;
  chamLan2: string | undefined;
  chamLan3: string | undefined;
  chamLan4: string | undefined;
  chamLan5: string | undefined;
  chamLan6: string | undefined;
  chamLan7: string | undefined;
  chamLan8: string | undefined;
  chamLan9: string | undefined;
  chamLan10: string | undefined;
}

const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const TimekeepingListTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [timeKeeping, setTimeKeeping] = useState<DuLieuChamCongResponse[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>();
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>();
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>();
  const [importOpen, setImportOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (value, record, index) => {
        return <>{(page - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "ID vân tay",
      dataIndex: "idVanTay",
      key: "idVanTay",
      width: 100,
      render: (value, record) => {
        return (
          <>
            {
              employeeData?.find(
                (item) => item.maNhanVien === record.maNhanVien,
              )?.idVanTay
            }
          </>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 200,
      render: (value, record) => {
        return (
          <>
            {
              employeeData?.find(
                (item) => item.maNhanVien === record.maNhanVien,
              )?.hoTen
            }
          </>
        );
      },
    },
    {
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      key: "maNhanVien",
    },
    {
      title: "Phòng ban",
      key: "phongBan",
      dataIndex: "phongBan",
      render: (value, record) => {
        return (
          <>
            {
              departmentData?.find(
                (item) =>
                  item.maPhongBan ===
                  employeeData?.find(
                    (item) => item.maNhanVien === record.maNhanVien,
                  )?.maPhongBan,
              )?.tenPhongBan
            }
          </>
        );
      },
    },
    {
      title: "Ngày làm việc",
      key: "ngayChamCong",
      dataIndex: "ngayChamCong",
    },
    {
      title: "Ca làm",
      key: "caLam",
      dataIndex: "caLam",
      width: 75,
      render: (value, record) => {
        return (
          <>
            {
              shiftList?.find(
                (item) =>
                  item.maCa ===
                  employeeData?.find(
                    (item) => item.maNhanVien === record.maNhanVien,
                  )?.maCa,
              )?.tenCa
            }
          </>
        );
      },
    },
    {
      title: "Chấm lần 1",
      key: "chamLan1",
      dataIndex: "chamLan1",
    },
    {
      title: "Chấm lần 2",
      key: "chamLan2",
      dataIndex: "chamLan2",
    },
    {
      title: "Chấm lần 3",
      key: "chamLan3",
      dataIndex: "chamLan3",
    },
    {
      title: "Chấm lần 4",
      key: "chamLan4",
      dataIndex: "chamLan4",
    },
    {
      title: "Chấm lần 5",
      key: "chamLan5",
      dataIndex: "chamLan5",
    },
    {
      title: "Chấm lần 6",
      key: "chamLan6",
      dataIndex: "chamLan6",
    },
    {
      title: "Chấm lần 7",
      key: "chamLan7",
      dataIndex: "chamLan7",
    },
    {
      title: "Chấm lần 8",
      key: "chamLan8",
      dataIndex: "chamLan8",
    },
    {
      title: "Chấm lần 9",
      key: "chamLan9",
      dataIndex: "chamLan9",
    },
    {
      title: "Chấm lần 10",
      key: "chamLan10",
      dataIndex: "chamLan10",
    },
  ];

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      setDepartmentData(response.data?.reverse());
    } else if (response.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
    }
  };

  const getShiftName = async () => {
    const response = await CaLamViecApi.getCaLamViec(null, null);
    if (response?.statusCode === "200") {
      setShiftList(response.data.reverse());
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getTimeKeepingListByParams = async (
    searchRequest: SearchDuLieuChamCongRequest,
  ) => {
    const response = await DuLieuChamCongApi.getHopDong(searchRequest);
    if (response?.statusCode === "200") {
      setTimeKeeping(response.data.reverse());
      setData(response.data.reverse());
      setTableData(response.data.reverse());
    } else if (response?.statusCode === "545") {
      setTimeKeeping(response.data);
      setTableData(response.data);
      setData(response.data);
      setTotalRecords(0);
    } else {
      console.log(response?.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200") {
      setEmployeeData(response.data.reverse());
    } else if (response?.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response?.message);
    }
  };

  const onFinish = (values: any) => {
    const searchData: SearchDuLieuChamCongRequest = {
      ngayBatDau: null,
      ngayKetThuc: null,
      maNhanVien: values.maNhanVien,
      idVanTay: values.idVanTay,
      tenNhanVien: values.hoTen,
    };

    if (values.ngayChamCong !== null && values.ngayChamCong !== undefined) {
      searchData.ngayBatDau = values.ngayChamCong[0];
      searchData.ngayKetThuc = values.ngayChamCong[1];
    }

    getTimeKeepingListByParams(searchData);
  };

  const generateDataTable = () => {
    const unique: DataType[] = [];
    const getData: DataType[] = [];

    data?.map((x) =>
      unique.filter(
        (a) => a.maNhanVien == x.maNhanVien && a.ngayChamCong == x.ngayChamCong,
      ).length > 0
        ? null
        : unique.push(x),
    );

    for (let i = 0; i < unique?.length; i++) {
      getData.push({
        key: unique[i].maChamCong,
        maChamCong: unique[i].maChamCong,
        hoTen: unique[i].hoTen,
        idVanTay: unique[i].idVanTay,
        maNhanVien: unique[i].maNhanVien,
        phongBan: unique[i].phongBan,
        ngayChamCong: dayjs(unique[i].ngayChamCong).format("DD/MM/YYYY"),
        caLam: unique[i].caLam,
        chamLan1: timeKeeping
          ?.filter((item) => item.lanChamCong === 1)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan2: timeKeeping
          ?.filter((item) => item.lanChamCong === 2)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan3: timeKeeping
          ?.filter((item) => item.lanChamCong === 3)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan4: timeKeeping
          ?.filter((item) => item.lanChamCong === 4)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan5: timeKeeping
          ?.filter((item) => item.lanChamCong === 5)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan6: timeKeeping
          ?.filter((item) => item.lanChamCong === 6)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan7: timeKeeping
          ?.filter((item) => item.lanChamCong === 7)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan8: timeKeeping
          ?.filter((item) => item.lanChamCong === 8)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan9: timeKeeping
          ?.filter((item) => item.lanChamCong === 9)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
        chamLan10: timeKeeping
          ?.filter((item) => item.lanChamCong === 10)
          ?.find(
            (item) =>
              item.maNhanVien === unique[i].maNhanVien &&
              item.ngayChamCong.toString() === unique[i].ngayChamCong,
          )?.gioChamCong,
      });
    }
    setTotalRecords(getData.length);
    setTableData(getData);
  };

  const refresh = () => {
    getTimeKeepingListByParams({
      maNhanVien: null,
      ngayBatDau: null,
      ngayKetThuc: null,
      idVanTay: null,
      tenNhanVien: null,
    });

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

  useEffect(() => {
    generateDataTable();
  }, [timeKeeping]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Form
        form={form}
        style={formStyle}
        name="advanced_search"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="ngayChamCong"
              label="Ngày chấm công"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <RangePicker
                format={"DD/MM/YYYY"}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="hoTen"
              label="Tên nhân viên"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Tên nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="maNhanVien"
              label="Mã nhân viên"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Mã nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="idVanTay"
              label="ID vân tay"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Vui lòng nhập Mã vân tay"
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
          style={{ height: "50px", marginBottom: "10px" }}
        >
          <span>
            <b>Danh sách chấm công</b>
          </span>
          <Row>
            <Button
              type="primary"
              style={{ marginLeft: "12px" }}
              onClick={() => setImportOpen(true)}
            >
              Nhập DLCC
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 2000, y: 350 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={{
            showQuickJumper: true,
            total: totalRecords,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            locale: {
              jump_to: "Đến",
              page: "Trang",
              items_per_page: "/ trang",
            },
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            showTotal: (total) => `Tổng ${total} bản ghi`,
          }}
        />
      </div>
      <ImportTimeKeeping
        refresh={refresh}
        show={importOpen}
        close={() => setImportOpen(false)}
      />
    </>
  );
};

export default TimekeepingListTable;
