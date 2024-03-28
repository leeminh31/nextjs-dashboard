/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
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

const RegisterShiftTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [ticketType, setTicketType] = useState(0);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
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
      render: (status) => {
        const color =
          status === "Đã duyệt"
            ? "green"
            : status === "Chờ duyệt"
              ? "transparent"
              : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Hoạt động",
      key: "action",
      fixed: "right",
      width: 150,
      align: "center" as const,
      render: () => (
        <>
          <Button
            style={{
              backgroundColor: "transparent",
              color: "#6c8cad",
              border: "none",
            }}
            onClick={() => setViewOpen(true)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
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
            <b>Phân ca làm việc nhân viên</b>
          </span>
          <Row>
            <Button type="primary">Tạo mới</Button>
            <Button type="primary" style={{ marginLeft: "12px" }}>
              Xóa
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 1800, y: 350 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            showQuickJumper: true,
            total: 50,
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
      <Drawer
        size="large"
        title="Thông tin chi tiết"
        placement="right"
        onClose={() => setViewOpen(false)}
        open={viewOpen}
        footer={
          <Row justify={"end"}>
            <Space>
              <Button onClick={() => setViewOpen(false)}>Hủy</Button>
              <Button onClick={() => form.submit()} type="primary">
                Lưu
              </Button>
            </Space>
          </Row>
        }
      >
        <Form form={form} name="viewStaffTransfer" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={"ticketType"}
                label={"Loại phiếu"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Loại phiếu!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Loại phiếu"
                  onChange={(e) => setTicketType(e)}
                  allowClear
                >
                  <Option value={1}>Công ty</Option>
                  <Option value={2}>Phòng ban</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"ticketName"}
                label={"Tên Phiếu"}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Vui lòng nhập Tên phiếu " />
              </Form.Item>
            </Col>
            {ticketType === 1 ? (
              <>
                <Col span={12}>
                  <Form.Item
                    name={"currentCompany"}
                    label={"Công ty hiện tại"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"employee"}
                    label={"Nhân viên"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn nhân viên">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"deliverDepartment"}
                    label={"Phòng ban"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn Phòng ban!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn công ty ">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"department"}
                    label={"Phòng ban"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng ban!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn phòng ban ">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"endDateOfCurrentCompany"}
                    label={"Ngày kết thúc công việc công ty cũ"}
                    rules={[
                      {
                        required: true,
                        message:
                          "Vui lòng nhập Ngày kết thúc công việc công ty cũ!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày kết thúc công việc công ty cũ"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"startDateOfNewCompany"}
                    label={"Ngày vào làm công ty mới"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng ban chuyển đến!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày vào làm công ty mới"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"contractName"}
                    label={"Tên hợp đồng"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Tên hợp đồng!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="Vui lòng nhập Tên hợp đồng " />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"contracType"}
                    label={"Loại hợp đồng"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn Loại hợp đồng!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"signDate"}
                    label={"Ngày ký hợp đồng"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng ban chuyển đến!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày ký hợp đồng"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"endContractDate"}
                    label={"Ngày kết thúc hợp đồng mới"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng ban chuyển đến!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày kết thúc hợp đồng mới"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
              </>
            ) : ticketType === 2 ? (
              <>
                <Col span={12}>
                  <Form.Item
                    name={"currentDepartment"}
                    label={"Phòng ban hiện tại"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"employee"}
                    label={"Nhân viên"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn nhân viên">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"deliverDepartment"}
                    label={"Phòng ban"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phòng ban chuyển đến!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select placeholder="Vui lòng chọn">
                      <Option value={1}>Bùi Thị Yên</Option>
                      <Option value={2}>Bùi Thị Yên</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"startDateDeliverDepartment"}
                    label={"Ngày vào làm phòng ban mới"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày vào làm phòng mới"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={"endDateCurrentDepartment"}
                    label={"Ngày kết thúc công việc phòng ban cũ"}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      placeholder="Vui lòng nhập Ngày kết thúc công việc phòng ban cũ"
                      format={dateFormatList}
                    />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <></>
            )}
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default RegisterShiftTable;
