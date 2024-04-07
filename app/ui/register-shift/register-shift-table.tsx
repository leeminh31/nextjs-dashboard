/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CaLamViecApi from "@/app/api/calamviec";
import DangKyCaApi from "@/app/api/dangkyca";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { DangKyCaResponse } from "@/app/models/dangkyca/dangkyca-response";
import { SearchDangKyCaRequest } from "@/app/models/dangkyca/search-dangkyca-request";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CreateRegisterShift from "./create-register-shift";
import ViewRegisterShift from "./view-register-shift";
const { Option } = Select;

interface DataType {
  key: React.Key;
  hoTen: string;
  ngayTao: string;
  caHienTai: string;
  caMoi: string;
  ngayBatDauCaMoi: string;
  nguoiDuyet: string;
  phongBan: string;
  chucVu: string;
  trangThai: string;
  maNhanVien: string;
}

const RegisterShiftTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [data, setData] = useState<DangKyCaResponse[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState<DataType>();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const tableData: DataType[] = [];
  for (let i = 0; i < data.length; i++) {
    tableData.push({
      key: data[i].maDangKyCa,
      ngayTao: dayjs(data[i].ngayTao).format("DD/MM/YYYY"),
      caHienTai: data[i].caLamViecHienTai,
      caMoi: data[i].caLamViecMoi,
      ngayBatDauCaMoi: dayjs(data[i].ngayBatDauCaMoi).format("DD/MM/YYYY"),
      nguoiDuyet: data[i].nguoiDuyet,
      trangThai: data[i].trangThai,
      hoTen: employeeData?.find((e) => e.maNhanVien === data[i].maNhanVien)
        ?.hoTen!,
      maNhanVien: data[i].maNhanVien,
      phongBan: departmentData?.find(
        (d) =>
          d.maPhongBan ===
          employeeData?.find((e) => e.maNhanVien === data[i].maNhanVien)
            ?.maPhongBan!,
      )?.tenPhongBan!,
      chucVu: employeeData?.find((e) => e.maNhanVien === data[i].maNhanVien)
        ?.chucVu!,
    });
  }

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200" || response.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      setDepartmentData(response.data);
    } else if (response.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
    }
  };

  const getDangKyCaByParams = async (searchRequest: SearchDangKyCaRequest) => {
    const response = await DangKyCaApi.getDangKyCa(searchRequest);
    if (response.statusCode === "200") {
      setData(response.data?.reverse());
      setTotalRecords(response.data?.length);
    } else if (response.statusCode === "545") {
      setData([]);
      setTotalRecords(0);
    } else {
      console.log(response.message);
    }
  };

  const getShiftName = async (maCa: number | null, tenCa: string | null) => {
    const response = await CaLamViecApi.getCaLamViec(maCa, tenCa);
    if (response?.statusCode === "200") {
      setShiftList(response.data);
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const onView = (record: any) => {
    setRowData(record);
    setViewOpen(true);
  };

  const onApprove = async () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("token")!);

    if (!selectedRowKeys.length) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một đơn đăng ký ca!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const response = await DangKyCaApi.approve(
      selectedRowKeys.join(","),
      getTokenFromLocalStorage.hoTen,
    );

    if (response?.statusCode === "200") {
      getDangKyCaByParams({
        tenNhanVien: null,
        maNhanVien: null,
        ngayTao: null,
        caLamViecMoi: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Duyệt đơn đăng ký ca thành công!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      setSelectedRowKeys([]);
      return;
    } else {
      console.log(response?.message);
    }
  };

  const onReject = async () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("token")!);

    if (!selectedRowKeys.length) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một đơn đăng ký ca!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });

      return;
    }

    const response = await DangKyCaApi.reject(
      selectedRowKeys.join(","),
      getTokenFromLocalStorage.hoTen,
    );
    if (response?.statusCode === "200") {
      getDangKyCaByParams({
        tenNhanVien: null,
        maNhanVien: null,
        ngayTao: null,
        caLamViecMoi: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Hủy đơn đăng ký ca thành công!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      setSelectedRowKeys([]);
      return;
    } else {
      console.log(response?.message);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.trangThai !== "0",
    }),
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
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      key: "maNhanVien",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
    },
    {
      title: "Ca hiện tại",
      key: "caHienTai",
      dataIndex: "caHienTai",
    },
    {
      title: "Ca mới",
      key: "caMoi",
      dataIndex: "caMoi",
    },
    {
      title: "Ngày bắt đầu ca mới",
      key: "ngayBatDauCaMoi",
      dataIndex: "ngayBatDauCaMoi",
      width: 200,
    },
    {
      title: "Người duyệt",
      key: "nguoiDuyet",
      dataIndex: "nguoiDuyet",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (value, record) => {
        return (
          <>
            {record.trangThai === "0" ? (
              <div
                style={{
                  border: "1px solid rgb(185, 136, 104)",
                  borderRadius: "10px",
                  width: "90px",
                  textAlign: "center",
                  display: "inline-block",
                  padding: "0 10px",
                }}
              >
                Chờ duyệt
              </div>
            ) : record.trangThai === "1" ? (
              <div
                style={{
                  border: "1px solid rgb(185, 136, 104)",
                  borderRadius: "10px",
                  width: "90px",
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
                  width: "90px",
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
          </>
        );
      },
    },
    {
      title: "Hoạt động",
      key: "action",
      fixed: "right",
      width: 75,
      align: "center" as const,
      render: (value, record) => (
        <>
          <Button
            style={{
              backgroundColor: "transparent",
              color: "#6c8cad",
              border: "none",
            }}
            onClick={() => onView(record)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    const requestData: SearchDangKyCaRequest = {
      tenNhanVien: values.tenNhanVien,
      maNhanVien: values.maNhanVien,
      ngayTao: values.ngayTao,
      caLamViecMoi: values.caLamViecMoi,
      trangThai: values.trangThai,
    };

    getDangKyCaByParams(requestData);
  };

  const refresh = () => {
    getDangKyCaByParams({
      tenNhanVien: null,
      maNhanVien: null,
      ngayTao: null,
      caLamViecMoi: null,
      trangThai: null,
    });

    getDepartmentsByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });

    getEmployeeByParams({
      maNhanVien: null,
      hoTen: null,
      chucVu: null,
      maPhongBan: null,
      idVanTay: null,
    });
    getShiftName(null, null);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        style={formStyle}
        name="advanced_search"
      >
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item
              label="Tên nhân viên"
              name="tenNhanVien"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <Input
                placeholder="Tên nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Mã NV"
              name="maNhanVien"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <Input
                placeholder="Mã nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Ngày tạo"
              name="ngayTao"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <DatePicker placeholder="Ngày tạo" format={dateFormatList} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item
              label="Ca làm việc mới"
              name="caLamViecMoi"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                {shiftList.map((item) => (
                  <Option key={item.maCa} value={item.tenCa}>
                    {item.tenCa}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Trạng thái"
              name="trangThai"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <Select placeholder="Trạng thái">
                <Option value={"0"}>Chờ duyệt</Option>
                <Option value={"1"}>Đã duyệt</Option>
                <Option value={"2"}>Đã hủy</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
          <Button onClick={() => form.resetFields()}>Tạo lại</Button>
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
            <b>Danh sách đăng ký ca làm việc mới</b>
          </span>
          <Row>
            <Button type="primary" onClick={() => setAddOpen(true)}>
              Tạo mới
            </Button>
            <Button
              onClick={onApprove}
              type="primary"
              style={{ marginLeft: "12px" }}
            >
              Duyệt đơn
            </Button>
            <Button
              onClick={onReject}
              type="primary"
              style={{ marginLeft: "12px" }}
            >
              Hủy đơn
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 1200, y: 350 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={{
            showQuickJumper: true,
            total: totalRecords,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            locale: {
              jump_to: "Đến",
              page: "Trang",
              items_per_page: "/ trang",
            },
            showTotal: (total) => `Tổng ${total} bản ghi`,
          }}
        />
      </div>
      <CreateRegisterShift
        refresh={refresh}
        show={addOpen}
        close={() => setAddOpen(false)}
      />

      <ViewRegisterShift
        data={rowData}
        show={viewOpen}
        close={() => setViewOpen(false)}
      />
    </>
  );
};

export default RegisterShiftTable;
