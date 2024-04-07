/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import QuyPhepApi from "@/app/api/quyphep";
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
import React, { useEffect, useState } from "react";
const { Option } = Select;

const OnLeaveTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [importOpen, setImportOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<QuyPhepResponse[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const getQuyPhepByParams = async (searchRequest: SearchQuyPhepRequest) => {
    const response = await QuyPhepApi.getQuyPhep(searchRequest);
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

  const onUpdate = () => {};

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
      maPhongBan: null,
      nam: new Date().getUTCFullYear(),
    });
  }, []);

  const columns: ColumnsType<QuyPhepResponse> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
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
          width: 100,
        },
        {
          title: "Họ tên",
          dataIndex: "hoTen",
          key: "hoTen",
          width: 100,
        },
        {
          title: "Phòng ban",
          dataIndex: "phongBan",
          key: "phongBan",
          width: 150,
        },
        {
          title: "Năm",
          dataIndex: "nam",
          key: "nam",
          width: 100,
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
          render: (value, record, index) => {
            return <>{record.thang1 !== 0 ? record.thang1 : ""}</>;
          },
        },
        {
          title: "Tháng 2",
          dataIndex: "thang2",
          key: "thang2",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang2 !== 0 ? record.thang2 : ""}</>;
          },
        },
        {
          title: "Tháng 3",
          dataIndex: "thang3",
          key: "thang3",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang3 !== 0 ? record.thang3 : ""}</>;
          },
        },
        {
          title: "Tháng 4",
          dataIndex: "thang4",
          key: "thang4",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang4 !== 0 ? record.thang4 : ""}</>;
          },
        },
        {
          title: "Tháng 5",
          dataIndex: "thang5",
          key: "thang5",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang5 !== 0 ? record.thang5 : ""}</>;
          },
        },
        {
          title: "Tháng 6",
          dataIndex: "thang6",
          key: "thang6",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang6 !== 0 ? record.thang6 : ""}</>;
          },
        },
        {
          title: "Tháng 7",
          dataIndex: "thang7",
          key: "thang7",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang7 !== 0 ? record.thang7 : ""}</>;
          },
        },
        {
          title: "Tháng 8",
          dataIndex: "thang8",
          key: "thang8",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang8 !== 0 ? record.thang8 : ""}</>;
          },
        },
        {
          title: "Tháng 9",
          dataIndex: "thang9",
          key: "thang9",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang9 !== 0 ? record.thang9 : ""}</>;
          },
        },
        {
          title: "Tháng 10",
          dataIndex: "thang10",
          key: "thang10",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang10 !== 0 ? record.thang10 : ""}</>;
          },
        },
        {
          title: "Tháng 11",
          dataIndex: "thang11",
          key: "thang11",
          width: 80,
          render: (value, record, index) => {
            return <>{record.thang11 !== 0 ? record.thang11 : ""}</>;
          },
        },
        {
          title: "Tháng 12",
          dataIndex: "thang12",
          key: "thang12",
          width: 80,
          render: (value, record, index) => {
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
          render: () => {
            return (
              <Space style={{ gap: "16px" }}>
                <Button
                  icon={<EyeTwoTone />}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => onUpdate()}
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
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mã nhân viên"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input placeholder="Mã nhân viên" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phòng ban"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                <Option value="1">Bùi Thị Yên</Option>
                <Option value="2">Bùi Thị Yên</Option>
                <Option value="3">Bùi Thị Yên</Option>
                <Option value="4">Bùi Thị Yên</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Năm"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <DatePicker placeholder="Vui lòng chọn" picker="year" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary">Tìm kiếm</Button>
          <Button>Tạo lại</Button>
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
          <Row>
            <Button
              type="primary"
              style={{ marginLeft: "12px" }}
              onClick={() => setImportOpen(true)}
            >
              Import
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 2000, y: 350 }}
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
    </>
  );
};

export default OnLeaveTable;
