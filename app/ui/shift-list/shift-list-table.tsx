/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CaLamViecApi from "@/app/api/calamviec";
import NhanVienApi from "@/app/api/nhanvien";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  message,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import CreateShiftList from "./create-shift-list";
import UpdateShiftList from "./update-shift-list";
interface DataType {
  key: React.Key;
  maCa: number;
  tenCa: string;
  gioBatDauCa: string;
  gioKetThucCa: string;
  gioBatDauNghi: string;
  gioKetThucNghi: string;
}

const ShiftListTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    marginBottom: "24px",
    padding: "24px",
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: 50,
      render: (value, record, index) => {
        return <>{(page - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "Tên ca",
      dataIndex: "tenCa",
      width: 75,
    },
    {
      title: "Giờ bắt đầu ca",
      dataIndex: "gioBatDauCa",
    },
    {
      title: "Giờ kết thúc ca",
      dataIndex: "gioKetThucCa",
    },
    {
      title: "Giờ bắt đầu nghỉ",
      dataIndex: "gioBatDauNghi",
    },
    {
      title: "Giờ kết thúc nghỉ",
      dataIndex: "gioKetThucNghi",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      width: 150,
      render: (value, record) => {
        return (
          <Space style={{ gap: "16px" }}>
            <Button
              icon={<EditTwoTone />}
              style={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              }}
              onClick={() => onUpdate(record)}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const tableData: DataType[] = [];
  for (let i = 0; i < shiftList?.length; i++) {
    tableData.push({
      key: shiftList[i].maCa,
      maCa: shiftList[i].maCa,
      tenCa: shiftList[i].tenCa,
      gioBatDauCa: shiftList[i].gioBatDauCa.slice(0,5),
      gioKetThucCa: shiftList[i].gioKetThucCa.slice(0,5),
      gioBatDauNghi: shiftList[i].gioBatDauNghi.slice(0,5),
      gioKetThucNghi: shiftList[i].gioKetThucNghi.slice(0,5),
    });
  }

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200" || response.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getShiftName = async (maCa: number | null, tenCa: string | null) => {
    const response = await CaLamViecApi.getCaLamViec(maCa, tenCa);
    if (response?.statusCode === "200") {
      setShiftList(response.data.reverse());
      setTotalRecords(response.data?.length);
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
      setTotalRecords(0);
    } else {
      console.log(response.message);
    }
  };
  const onUpdate = (record: any) => {
    setUpdateData(record);
    setUpdateOpen(true);
  };

  const deleteShiftLists = async (selectedRowKeys: any) => {
    const response = await CaLamViecApi.deleteCaLamViec(selectedRowKeys);
    if (response.statusCode === "200") {
      refresh();
      messageApi.open({
        type: "success",
        content: "Xóa ca làm việc thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else {
      console.log(response.message);
    }
  };

  const onDelete = () => {
    if (selectedRowKeys.length == 0) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một ca làm việc!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    let flag = false;
    selectedRowKeys.forEach((value) => {
      if (employeeData.some((item) => item.maCa == value)) {
        flag = true;
      }
    });

    if (flag) {
      messageApi.open({
        type: "error",
        content: "Ca làm việc này đang có nhân viên, bạn không được phép xóa!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const shiftListsId = selectedRowKeys.join(",");
    deleteShiftLists(shiftListsId);
  };

  const refresh = () => {
    getShiftName(null, null);
  };

  const onFinish = (values: any) => {
    getShiftName(null, values.tenCa?.trimStart().trimEnd());
  };

  useEffect(() => {
    refresh();
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item name={"tenCa"} label={"Tên ca"}>
              <Input placeholder="Vui lòng nhập Tên ca" />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: "right" }}>
          <Space size="small">
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
          </Space>
        </div>
      </Form>
      <div style={{ backgroundColor: "#fff", padding: "24px" }}>
        <Row justify={"space-between"} style={{ marginBottom: "24px" }}>
          <span style={{ textAlign: "center" }}>
            <b>Danh sách ca</b>
          </span>
          <Col>
            <Button
              type="primary"
              style={{ marginLeft: "12px" }}
              onClick={() => setAddOpen(true)}
            >
              Tạo mới
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "12px" }}
              onClick={() => onDelete()}
            >
              Xóa
            </Button>
          </Col>
        </Row>
        <Table
          scroll={{ x: 1000, y: 400 }}
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
      <CreateShiftList
        refresh={refresh}
        show={addOpen}
        close={() => setAddOpen(false)}
      />
      <UpdateShiftList
        refresh={refresh}
        data={updateData}
        show={updateOpen}
        close={() => setUpdateOpen(false)}
      />
    </>
  );
};

export default ShiftListTable;
