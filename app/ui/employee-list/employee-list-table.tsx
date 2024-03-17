"use client";

import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { LoginApi } from "@/app/api/taikhoan";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { UpdateNhanVienRequest } from "@/app/models/nhanvien/update-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { EditTwoTone, EyeTwoTone, LockTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
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
import "dotenv/config";
import React, { useEffect, useState } from "react";
import ChangePassword from "./change-password";
import CreateEmployeeList from "./create-employee-list";
import UpdateEmployeeList from "./update-employee-list";
import ViewEmployeeList from "./view-employee-list";

const { Option } = Select;

const EmployeeListTable: React.FC = () => {
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState<PhongBanResponse[]>([]);
  const [updateData, setUpdateData] = useState<UpdateNhanVienRequest>();
  const [data, setData] = useState<NhanVienResponse[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [listId, setListId] = useState<string[]>([]);
  const [id, setId] = useState();

  interface DataType {
    key: React.Key;
    maNhanVien: string;
    hoTen: string;
    chucVu: string;
    mail: string;
    ngaySinh: string | undefined;
    soCCCD: string;
    ngayCap: string | undefined;
    queQuan: string;
    noiOHienTai: string;
    nguoiThanLienHe: string;
    soDienThoaiNguoiLienHe: string;
    stkNganHang: string;
    nganHang: string;
    maPhongBan: number;
    soDienThoai: string;
    idVanTay: number;
  }

  const tableData: DataType[] = [];
  for (let i = 0; i < data?.length; i++) {
    tableData.push({
      key: data[i].maNhanVien,
      maNhanVien: data[i].maNhanVien,
      hoTen: data[i].hoTen,
      chucVu: data[i].chucVu,
      mail: data[i].mail,
      ngaySinh:
        data[i].ngaySinh === "01/01/0001" ? undefined : data[i].ngaySinh,
      soCCCD: data[i].soCCCD,
      ngayCap: data[i].ngayCap === "01/01/0001" ? undefined : data[i].ngayCap,
      queQuan: data[i].queQuan,
      noiOHienTai: data[i].noiOHienTai,
      nguoiThanLienHe: data[i].nguoiThanLienHe,
      soDienThoaiNguoiLienHe: data[i].soDienThoaiNguoiLienHe,
      stkNganHang: data[i].stkNganHang,
      nganHang: data[i].nganHang,
      maPhongBan: data[i].maPhongBan,
      soDienThoai: data[i].soDienThoai,
      idVanTay: data[i].idVanTay,
    });
  }

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    marginBottom: "24px",
    padding: "24px",
  };

  const getEmployeeId = async () => {
    let response = await LoginApi.getEmployeeId();
    if (response.statusCode === "200") {
      console.log(response.data);
      setListId(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200") {
      console.log("-------------------------------------");
      console.log(response.data);
      setData(response.data.reverse());
      setTotalRecords(response.data?.length);
    } else if (response.statusCode === "545") {
      setData(response.data);
      setTotalRecords(0);
    } else {
      console.log(response.message);
    }
  };

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    let response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") setDepartments(response.data);
    else {
      console.log(response.message);
    }
  };

  const onUpdate = (record: any) => {
    setUpdateData(record);
    setUpdateOpen(true);
  };

  const onView = (record: any) => {
    setUpdateData(record);
    setViewOpen(true);
  };

  const onChangePassword = (record: any) => {
    setChangePasswordOpen(true);
    setId(record.maNhanVien);
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
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      width: 120,
    },
    {
      title: "ID vân tay",
      dataIndex: "idVanTay",
      width: 100,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "hoTen",
    },
    {
      title: "Chức vụ",
      dataIndex: "chucVu",
    },
    {
      title: "Phòng ban",
      dataIndex: "phongBan",
      render: (value, record) => {
        return (
          <>
            {
              departments.find(
                (element) => element.maPhongBan === record.maPhongBan,
              )?.tenPhongBan
            }
          </>
        );
      },
    },
    {
      title: "Mail công việc",
      dataIndex: "mail",
      width: 250,
    },
    {
      title: "Hoạt động",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (value, record) => {
        return (
          <Space style={{}}>
            <Button
              icon={<EditTwoTone />}
              style={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              }}
              onClick={() => onUpdate(record)}
            ></Button>
            <Button
              icon={<EyeTwoTone />}
              style={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              }}
              onClick={() => onView(record)}
            ></Button>
            {listId.some((id) => id === record.maNhanVien) ? (
              <Button
                icon={<LockTwoTone />}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
                onClick={() => onChangePassword(record)}
              ></Button>
            ) : (
              <></>
            )}
          </Space>
        );
      },
    },
  ];

  const changeSelect = (e: any) => {
    form.setFieldValue("phongBan", e);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = async (values: any) => {
    const searchData: SearchNhanVienRequest = {
      hoTen: values.hoTen?.trimStart().trimEnd().toUpperCase(),
      maNhanVien: values.maNhanVien?.trimStart().trimEnd().toUpperCase(),
      idVanTay: parseInt(values.idVanTay) || null,
      maPhongBan: parseInt(values.phongBan) || null,
      chucVu: values.chucVu,
    };
    getEmployeeByParams(searchData);
  };

  const refresh = () => {
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });
  };

  useEffect(() => {
    setLoading(false);
    refresh();
    getDepartmentsByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });
    getEmployeeId();
  }, []);

  return (
    <>
      <Skeleton loading={loading} active>
        <Form
          form={form}
          name="advanced_search"
          style={formStyle}
          onFinish={onFinish}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              form.submit();
            }
          }}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item
                name={"hoTen"}
                label={"Tên nhân viên"}
                labelCol={{ style: { width: 100, textAlign: "left" } }}
              >
                <Input placeholder="Vui lòng nhập Tên nhân viên" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"maNhanVien"}
                label={"Mã nhân viên"}
                labelCol={{ style: { width: 100, textAlign: "left" } }}
              >
                <Input placeholder="Vui lòng nhập Mã nhân viên" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"idVanTay"}
                label={"ID vân tay"}
                labelCol={{ style: { width: 100, textAlign: "left" } }}
              >
                <Input placeholder="Vui lòng nhập Id vân tay" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item
                name={"phongBan"}
                label={"Phòng ban"}
                labelCol={{ style: { width: 100, textAlign: "left" } }}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  placeholder="Vui lòng chọn"
                  onChange={(e) => changeSelect(e)}
                  options={departments?.map((item, index) => ({
                    value: item.maPhongBan,
                    label: item.tenPhongBan,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"chucVu"}
                label={"Chức vụ"}
                labelCol={{ style: { width: 100, textAlign: "left" } }}
              >
                <Input placeholder="Vui lòng nhập Chức vụ" />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
            <Space size="small">
              <Button type="primary" onClick={() => form.submit()}>
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
      </Skeleton>
      <Skeleton loading={loading} active>
        <div style={{ backgroundColor: "#fff", padding: "24px" }}>
          <Row justify={"space-between"} style={{ marginBottom: "24px" }}>
            <span style={{ textAlign: "center", fontSize: "16px" }}>
              <b>Danh sách nhân viên</b>
            </span>
            <Col>
              <Button
                type="primary"
                style={{ marginLeft: "12px" }}
                onClick={() => setAddOpen(true)}
              >
                Thêm mới
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "12px" }}
                onClick={() => {}}
              >
                Tạo tài khoản
              </Button>
            </Col>
          </Row>
          <Table
            scroll={{ x: 1200, y: 500 }}
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
      </Skeleton>
      <CreateEmployeeList
        show={addOpen}
        close={() => setAddOpen(false)}
        refresh={refresh}
      />
      <UpdateEmployeeList
        data={updateData}
        show={updateOpen}
        close={() => setUpdateOpen(false)}
        refresh={refresh}
      />
      <ViewEmployeeList
        data={updateData}
        show={viewOpen}
        close={() => setViewOpen(false)}
      />
      <ChangePassword
        show={changePasswordOpen}
        close={() => setChangePasswordOpen(false)}
        id={id}
      />
    </>
  );
};

export default EmployeeListTable;
