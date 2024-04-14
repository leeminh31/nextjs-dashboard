/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PhongBanApi from "@/app/api/phongban";
import QuyBuApi from "@/app/api/quybu";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { QuyBuResponse } from "@/app/models/quybu/quybu-response";
import { SearchQuyBuRequest } from "@/app/models/quybu/search-quybu-request";
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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ViewCompensatoryLeaveDrawer from "./view-compensatory-leave-drawer";
const { Option } = Select;

const CompensatoryLeaveTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [data, setData] = useState<QuyBuResponse[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [rowData, setRowData] = useState<QuyBuResponse>();
  const [year, setYear] = useState(new Date().getFullYear());

  const getPhongBanByParams = async (searchRequest: SearchPhongBanRequest) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      setDepartmentData(response.data?.reverse());
    } else if (response.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
    }
  };

  const getQuyBuByParams = async (searchRequest: SearchQuyBuRequest) => {
    const response = await QuyBuApi.getQuyBu(searchRequest);
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

  const onView = (record: QuyBuResponse) => {
    setViewOpen(true);
    setRowData(record);
  };

  const rowSelection: TableRowSelection<QuyBuResponse> = {
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

  const columns: ColumnsType<QuyBuResponse> = [
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
          width: 100,
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
          width: 150,
        },
        {
          title: "Năm",
          dataIndex: "nam",
          key: "nam",
          width: 80,
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 1)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 1)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 2)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 2)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 3)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 3)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 4)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 4)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 5)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 5)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 6)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 6)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 7)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 7)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 8)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 8)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 9)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 9)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 10)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 10)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 11)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 11)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
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
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 12)?.phatSinh;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
            {
              title: "Sử dụng",
              dataIndex: "suDung",
              key: "suDung",
              width: 100,
              render: (value, record) => {
                const phatSinhValue = data
                  .find((element) => element.maNhanVien === record.maNhanVien)
                  ?.quyBuThangs.find((qb) => qb.thang === 12)?.suDung;

                return <>{phatSinhValue !== 0 ? phatSinhValue : ""}</>;
              },
            },
          ],
        },
      ],
    },
    {
      title: "Tổng",
      key: "tong",
      dataIndex: "tong",
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

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const searchData: SearchQuyBuRequest = {
      tenNhanVien: values.tenNhanVien?.trimStart().trimEnd().toUpperCase(),
      maNhanVien: values.maNhanVien?.trimStart().trimEnd().toUpperCase(),
      tenPhongBan: values.phongBan,
      nam: year,
    };
    getQuyBuByParams(searchData);
  };

  useEffect(() => {
    getQuyBuByParams({
      tenNhanVien: null,
      maNhanVien: null,
      tenPhongBan: null,
      nam: new Date().getFullYear(),
    });

    getPhongBanByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (year) {
      getQuyBuByParams({
        tenNhanVien: null,
        maNhanVien: null,
        tenPhongBan: null,
        nam: year,
      });
    }
  }, [year]);

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
            }}
          >
            <span>
              <b>Quỹ bù nhân viên</b>
            </span>
          </Flex>
          <Table
            size="small"
            scroll={{ x: 2500, y: 500 }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{
              total: totalRecords,
              showQuickJumper: true,
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
      </Skeleton>
      <ViewCompensatoryLeaveDrawer
        show={viewOpen}
        close={() => setViewOpen(false)}
        data={rowData}
      />
    </>
  );
};

export default CompensatoryLeaveTable;
