/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PhongBanApi from "@/app/api/phongban";
import QuyPhepApi from "@/app/api/quyphep";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { QuyPhepResponse } from "@/app/models/quyphep/quyphep-response";
import { SearchQuyPhepRequest } from "@/app/models/quyphep/search-quyphep-request";
import { EyeTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ViewOnLeaveDrawer from "./view-on-leave-drawer";
const { Option } = Select;

const OnLeaveTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [data, setData] = useState<QuyPhepResponse[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [rowData, setRowData] = useState<QuyPhepResponse>();

  const getPhongBanByParams = async (searchRequest: SearchPhongBanRequest) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response?.statusCode === "200") {
      setDepartmentData(response.data?.reverse());
    } else if (response?.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
    }
  };

  const getQuyPhepByParams = async (searchRequest: SearchQuyPhepRequest) => {
    const response = await QuyPhepApi.getQuyPhep(searchRequest);
    if (response?.statusCode === "200") {
      setData(response.data?.reverse());
      setTotalRecords(response.data?.length);
    } else if (response?.statusCode === "545") {
      setData([]);
      setTotalRecords(0);
    } else {
      console.log(response.message);
    }
  };

  const onView = (record: QuyPhepResponse) => {
    setViewOpen(true);
    setRowData(record);
  };

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const onFinish = (values: any) => {
    const searchData: SearchQuyPhepRequest = {
      tenNhanVien: values.tenNhanVien?.trimStart().trimEnd().toUpperCase(),
      maNhanVien: values.maNhanVien?.trimStart().trimEnd().toUpperCase(),
      tenPhongBan: values.phongBan,
      nam: year,
    };
    getQuyPhepByParams(searchData);
  };

  const rowSelection: TableRowSelection<QuyPhepResponse> = {
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

  useEffect(() => {
    getQuyPhepByParams({
      tenNhanVien: null,
      maNhanVien: null,
      tenPhongBan: null,
      nam: new Date().getUTCFullYear(),
    });

    getPhongBanByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });
  }, []);

  useEffect(() => {
    if (year) {
      getQuyPhepByParams({
        tenNhanVien: null,
        maNhanVien: null,
        tenPhongBan: null,
        nam: year,
      });
    }
  }, [year]);

  const columns: ColumnsType<QuyPhepResponse> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 70,
      render: (value, record, index) => {
        return <>{(page - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "Thông tin nhân viên",
      dataIndex: "thongTinNhanVien",
      key: "thongTinNhanVien",
      children: [
        {
          title: "Mã nhân viên",
          dataIndex: "maNhanVien",
          key: "maNhanVien",
          width: 120,
        },
        {
          title: "Họ tên",
          dataIndex: "hoTen",
          key: "hoTen",
          width: 150,
        },
        {
          title: "Phòng ban",
          dataIndex: "phongBan",
          key: "phongBan",
          width: 180,
        },
        {
          title: "Năm",
          dataIndex: "nam",
          key: "nam",
          width: 80,
        },
        {
          title: "Tổng phép",
          dataIndex: "tongPhep",
          key: "tongPhep",
          width: 100,
        },
      ],
    },
    {
      title: "Sử dụng phép",
      key: "suDungPhep",
      dataIndex: "suDungPhep",
      children: [
        {
          title: "Tháng 1",
          dataIndex: "thang1",
          key: "thang1",
          width: 80,
          render: (value, record) => {
            return <>{record.thang1 !== 0 ? record.thang1 : ""}</>;
          },
        },
        {
          title: "Tháng 2",
          dataIndex: "thang2",
          key: "thang2",
          width: 80,
          render: (value, record) => {
            return <>{record.thang2 !== 0 ? record.thang2 : ""}</>;
          },
        },
        {
          title: "Tháng 3",
          dataIndex: "thang3",
          key: "thang3",
          width: 80,
          render: (value, record) => {
            return <>{record.thang3 !== 0 ? record.thang3 : ""}</>;
          },
        },
        {
          title: "Tháng 4",
          dataIndex: "thang4",
          key: "thang4",
          width: 80,
          render: (value, record) => {
            return <>{record.thang4 !== 0 ? record.thang4 : ""}</>;
          },
        },
        {
          title: "Tháng 5",
          dataIndex: "thang5",
          key: "thang5",
          width: 80,
          render: (value, record) => {
            return <>{record.thang5 !== 0 ? record.thang5 : ""}</>;
          },
        },
        {
          title: "Tháng 6",
          dataIndex: "thang6",
          key: "thang6",
          width: 80,
          render: (value, record) => {
            return <>{record.thang6 !== 0 ? record.thang6 : ""}</>;
          },
        },
        {
          title: "Tháng 7",
          dataIndex: "thang7",
          key: "thang7",
          width: 80,
          render: (value, record) => {
            return <>{record.thang7 !== 0 ? record.thang7 : ""}</>;
          },
        },
        {
          title: "Tháng 8",
          dataIndex: "thang8",
          key: "thang8",
          width: 80,
          render: (value, record) => {
            return <>{record.thang8 !== 0 ? record.thang8 : ""}</>;
          },
        },
        {
          title: "Tháng 9",
          dataIndex: "thang9",
          key: "thang9",
          width: 80,
          render: (value, record) => {
            return <>{record.thang9 !== 0 ? record.thang9 : ""}</>;
          },
        },
        {
          title: "Tháng 10",
          dataIndex: "thang10",
          key: "thang10",
          width: 80,
          render: (value, record) => {
            return <>{record.thang10 !== 0 ? record.thang10 : ""}</>;
          },
        },
        {
          title: "Tháng 11",
          dataIndex: "thang11",
          key: "thang11",
          width: 80,
          render: (value, record) => {
            return <>{record.thang11 !== 0 ? record.thang11 : ""}</>;
          },
        },
        {
          title: "Tháng 12",
          dataIndex: "thang12",
          key: "thang12",
          width: 80,
          render: (value, record) => {
            return <>{record.thang12 !== 0 ? record.thang12 : ""}</>;
          },
        },
      ],
    },
    {
      title: "Tổng",
      key: "tong",
      dataIndex: "tong",
      children: [
        {
          title: "Đã dùng",
          dataIndex: "daDung",
          key: "daDung",
          width: 100,
        },
        {
          title: "Còn lại",
          dataIndex: "conLai",
          key: "conLai",
          width: 100,
        },
      ],
    },
    {
      title: "Hoạt động",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      width: 75,
      children: [
        {
          title: "Xem",
          dataIndex: "xem",
          key: "xem",
          width: 75,
          align: "center",
          render: (value, record) => {
            return (
              <Space style={{ gap: "16px" }}>
                <Button
                  icon={<EyeTwoTone />}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => onView(record)}
                ></Button>
              </Space>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
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
              label="Mã nhân viên"
              name="maNhanVien"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input placeholder="Mã nhân viên" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phòng ban"
              name="phongBan"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                {departmentData.map((phong) => (
                  <Option key={phong.maPhongBan} value={phong.tenPhongBan}>
                    {phong.tenPhongBan}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Năm"
              name="nam"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <DatePicker
                placeholder="Vui lòng chọn"
                picker="year"
                onChange={(e) => {
                  setYear(e?.year() ?? new Date().getFullYear());
                }}
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
              form.setFieldValue("nam", dayjs(new Date()));
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
            <b>Quỹ phép nhân viên</b>
          </span>
        </Flex>
        <Table
          scroll={{ x: 2000, y: 400 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
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
      <ViewOnLeaveDrawer
        show={viewOpen}
        close={() => setViewOpen(false)}
        data={rowData}
      />
    </>
  );
};

export default OnLeaveTable;
