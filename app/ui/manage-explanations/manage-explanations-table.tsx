/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GiaiTrinhApi from "@/app/api/giaitrinh";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { SearchGiaiTrinhRequest } from "@/app/models/giaitrinh/search-giaitrinh-request";
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
import ViewManagExplanation from "./view-manage-explanation";
const { Option } = Select;
const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  maGiaiTrinh: number;
  hoTen: string | undefined;
  phongBan: string | undefined;
  ngayLamViec: string;
  ngayTaoGiaiTrinh: string;
  loaiGiaiTrinh: string;
  nguoiDuyet: string;
  trangThai: string;
  chucVu: string | undefined;
  lyDo: string;
  maNhanVien: string;
}

const ManageExplanationsTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewOpen, setViewOpen] = useState(false);
  const [rowData, setRowData] = useState<DataType>();
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: colorBgContainer,
    padding: "24px",
  };

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
    if (response?.statusCode === "200") {
      setDepartmentData(response?.data);
    } else if (response?.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response?.message);
    }
  };

  const getListExplanationByParams = async (
    searchRequest: SearchGiaiTrinhRequest,
  ) => {
    const response = await GiaiTrinhApi.getGiaiTrinh(searchRequest);
    if (response?.statusCode === "200") {
      setData(response?.data);
      setTotalRecords(response?.data.length);
    } else if (response?.statusCode === "545") {
      setData([]);
      setTotalRecords(0);
    } else {
      console.log(response?.message);
    }
  };

  const handleView = (record: DataType) => {
    setRowData(record);
    setViewOpen(true);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys) => {
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
      dataIndex: "STT",
      key: "STT",
      width: 70,
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
      title: "Phòng ban",
      dataIndex: "phongBan",
      key: "phongBan",
    },
    {
      title: "Ngày làm việc",
      dataIndex: "ngayLamViec",
      key: "ngayLamViec",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTaoGiaiTrinh",
      key: "ngayTaoGiaiTrinh",
    },
    {
      title: "Loại giải trình",
      key: "loaiGiaiTrinh",
      dataIndex: "loaiGiaiTrinh",
      render: (value, record) => {
        return <>{record.loaiGiaiTrinh}</>;
      },
    },
    {
      title: "Người duyệt",
      key: "nguoiDuyet",
      dataIndex: "nguoiDuyet",
    },
    {
      title: "Trạng thái",
      key: "trangThai",
      dataIndex: "trangThai",
      width: 130,
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
            onClick={() => handleView(record)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </>
      ),
    },
  ];

  const onApprove = async () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("token")!);

    if (!selectedRowKeys.length) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một giải trình!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const response = await GiaiTrinhApi.approveExplantion(
      selectedRowKeys.join(","),
      getTokenFromLocalStorage.hoTen,
    );

    if (response?.statusCode === "200") {
      getListExplanationByParams({
        tenNhanVien: null,
        loaiGiaiTrinh: null,
        ngayLamViecBatDau: null,
        ngayLamViecKetThuc: null,
        ngayTaoBatDau: null,
        ngayTaoKetThuc: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Duyệt giải trình thành công!",
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
        content: "Vui lòng chọn ít nhất một giải trình!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });

      return;
    }

    const response = await GiaiTrinhApi.rejectExplanation(
      selectedRowKeys.join(","),
      getTokenFromLocalStorage.hoTen,
    );
    if (response?.statusCode === "200") {
      getListExplanationByParams({
        tenNhanVien: null,
        loaiGiaiTrinh: null,
        ngayLamViecBatDau: null,
        ngayLamViecKetThuc: null,
        ngayTaoBatDau: null,
        ngayTaoKetThuc: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Hủy giải trình thành công!",
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

    getListExplanationByParams({
      tenNhanVien: null,
      loaiGiaiTrinh: null,
      ngayLamViecBatDau: null,
      ngayLamViecKetThuc: null,
      ngayTaoBatDau: null,
      ngayTaoKetThuc: null,
      trangThai: null,
    });
  };

  let tableData: DataType[] = [];
  if (data) {
    data.map((giaitrinh) => {
      const nhanVien = employeeData?.find(
        (e) => e.maNhanVien === giaitrinh.maNhanVien,
      );

      tableData.push({
        key: giaitrinh.maGiaiTrinh,
        hoTen: nhanVien?.hoTen,
        phongBan: departmentData?.find(
          (d) => d.maPhongBan === nhanVien?.maPhongBan,
        )?.tenPhongBan,
        ngayLamViec: dayjs(giaitrinh.ngayLamViec).format("DD/MM/YYYY"),
        ngayTaoGiaiTrinh: dayjs(giaitrinh.ngayTaoGiaiTrinh).format(
          "DD/MM/YYYY",
        ),
        loaiGiaiTrinh: giaitrinh.loaiGiaiTrinh,
        nguoiDuyet: giaitrinh.nguoiDuyet,
        trangThai: giaitrinh.trangThai,
        lyDo: giaitrinh.lyDo,
        maNhanVien: giaitrinh.maNhanVien,
        chucVu: employeeData?.find((e) => e.maNhanVien === giaitrinh.maNhanVien)
          ?.chucVu,
        maGiaiTrinh: giaitrinh.maGiaiTrinh,
      });
    });
  } else {
    tableData = [];
  }

  const onFinish = (values: any) => {
    const requestData: SearchGiaiTrinhRequest = {
      tenNhanVien: values.tenNhanVien,
      loaiGiaiTrinh: values.loaiGiaiTrinh,
      ngayLamViecBatDau: null,
      ngayLamViecKetThuc: null,
      ngayTaoBatDau: null,
      ngayTaoKetThuc: null,
      trangThai: values.trangThai,
    };

    if (values.ngayLamViec) {
      requestData.ngayLamViecBatDau = values.ngayLamViec[0];
      requestData.ngayLamViecKetThuc = values.ngayLamViec[1];
    }

    if (values.ngayTaoDon) {
      requestData.ngayTaoBatDau = values.ngayTaoDon[0];
      requestData.ngayTaoKetThuc = values.ngayTaoDon[1];
    }

    getListExplanationByParams(requestData);
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
          <Col span={8}>
            <Form.Item
              label="Tên nhân viên"
              name="tenNhanVien"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Loại giải trình"
              name="loaiGiaiTrinh"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                <Option value="Đi muộn">Đi muộn</Option>
                <Option value="Về sớm">Về sớm</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Trạng thái đơn"
              name="trangThai"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                <Option value="0">Chờ duyệt</Option>
                <Option value="1">Đã duyệt</Option>
                <Option value="2">Đã hủy</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Ngày làm việc:"
              name="ngayLamViec"
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
              label="Ngày tạo:"
              name="ngayTaoDon"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <RangePicker
                format={"DD/MM/YYYY"}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              />
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
            borderBottom: "1px solid #bbbfc1",
            marginBottom: "10px",
          }}
        >
          <span>
            <b>Yêu cầu giải trình</b>
          </span>
          <Row>
            <Button
              type="primary"
              onClick={onApprove}
              style={{ marginLeft: "12px" }}
            >
              Duyệt giải trình
            </Button>
            <Button
              type="primary"
              onClick={onReject}
              style={{ marginLeft: "12px" }}
            >
              Hủy giải trình
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 1000, y: 350 }}
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
      <ViewManagExplanation
        data={rowData}
        show={viewOpen}
        close={() => setViewOpen(false)}
      />
    </>
  );
};

export default ManageExplanationsTable;
