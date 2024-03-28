/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
  Skeleton,
  Space,
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import ImportCompensatoryLeave from "./import-compensatory-leave";
const { Option } = Select;

interface DataType {
  key: string;
  employee: string;
  employeeId: string;
  contract: string;
  department: string;
  role: string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  contractType: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "2",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "3",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Nghỉ việc",
  },
  {
    key: "4",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Nghỉ việc",
  },
  {
    key: "5",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "6",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "7",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "8",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "9",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "10",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "11",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "12",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
  {
    key: "13",
    employee: "Bùi Thị Yên",
    employeeId: "APG112233",
    contract: "APG112233",
    department: "Develope",
    role: "BA",
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: "Thử việc",
    status: "Đang chạy",
  },
];

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

const CompensatoryLeaveTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [importOpen, setImportOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
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
      title: "Sử dụng bù",
      key: "suDungBu",
      dataIndex: "suDungBu",
      children: [
        {
          title: "Tháng 1",
          dataIndex: "thang1",
          key: "thang1",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 2",
          dataIndex: "thang2",
          key: "thang2",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 3",
          dataIndex: "thang3",
          key: "thang3",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 4",
          dataIndex: "thang4",
          key: "thang4",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 5",
          dataIndex: "thang5",
          key: "thang5",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 6",
          dataIndex: "thang6",
          key: "thang6",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 7",
          dataIndex: "thang7",
          key: "thang7",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 8",
          dataIndex: "thang8",
          key: "thang8",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 9",
          dataIndex: "thang9",
          key: "thang9",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 10",
          dataIndex: "thang10",
          key: "thang10",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 11",
          dataIndex: "thang11",
          key: "thang11",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
        },
        {
          title: "Tháng 12",
          dataIndex: "thang12",
          key: "thang12",
          width: 200,
          children: [
            {
              title: "Phát sinh",
              dataIndex: "phatSinh",
              key: "phatSinh",
              width: 100,
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
            },
          ],
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
        },
      ],
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
  ];

  const onUpdate = () => {};

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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
      <Skeleton loading={loading} active>
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
              <b>Quỹ bù nhân viên</b>
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
            size="small"
            scroll={{ x: 2500, y: 500 }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{
              showQuickJumper: true,
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: {
                jump_to: "Đến",
                page: "Trang",
                items_per_page: "/ trang",
              },
              showTotal: (total) => `Tổng ${total} bản ghi`,
            }}
          />
        </div>
      </Skeleton>
      <ImportCompensatoryLeave />
    </>
  );
};

export default CompensatoryLeaveTable;
