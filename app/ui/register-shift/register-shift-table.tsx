/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CaLamViecApi from "@/app/api/calamviec";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
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
import React, { useEffect, useState } from "react";
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
  const { token } = theme.useToken();
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [ticketType, setTicketType] = useState(0);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const getShiftName = async (maCa: number | null, tenCa: string | null) => {
    const response = await CaLamViecApi.getCaLamViec(maCa, tenCa);
    if (response?.statusCode === "200") {
      setShiftList(response.data.reverse());
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
    } else {
      console.log(response.message);
    }
  };

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
      width: 75,
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

  useEffect(() => {
    getShiftName(null, null);
  }, []);

  return (
    <>
      <Form style={formStyle} name="advanced_search">
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
                  <Option key={item.maCa} value={item.maCa}>
                    {item.tenCa}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Trạng thái"
              labelCol={{ style: { width: 110, textAlign: "left" } }}
            >
              <Select placeholder="Trạng thái">
                <Option value={0}>Chờ duyệt</Option>
                <Option value={1}>Đã duyệt</Option>
                <Option value={2}>Đã hủy</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
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
            <b>Danh sách đăng ký ca làm việc mới</b>
          </span>
          <Row>
            <Button type="primary">Tạo mới</Button>
            <Button type="primary" style={{ marginLeft: "12px" }}>
              Xóa
            </Button>
          </Row>
        </Flex>
        <Table
          scroll={{ x: 1200, y: 350 }}
          rowSelection={rowSelection}
          columns={columns}
          // dataSource={data}
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
