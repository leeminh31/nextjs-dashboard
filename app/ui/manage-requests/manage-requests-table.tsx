/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DanhSachDonApi from "@/app/api/danhsachdon";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { DanhSachDonResponse } from "@/app/models/danhsachdon/danhsachdon-response";
import { SearchDanhSachDonRequest } from "@/app/models/danhsachdon/search-danhsachdon-request";
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
import { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ViewManageRequest from "./view-manage-requests";
const { Option } = Select;
const { RangePicker } = DatePicker;

const ManageRequestsTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRow] = useState<DataType[]>([]);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [rowData, setRowData] = useState<DataType>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<DanhSachDonResponse>();
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const { token } = theme.useToken();

  interface DataType {
    key: React.Key;
    maDon: number;
    hoTen: string | undefined;
    phongBan: string | undefined;
    ngayLamViec: string;
    ngayTaoDon: string;
    loaiDon: number;
    nguoiDuyet: string;
    trangThai: string;
    chucVu: string;
    lyDo: string;
    maNhanVien: string;
    soPhutXinBu: number;
    tuNgay: string;
    denNgay: string;
    tangCaTu: string;
    tangCaDen: string;
  }

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200" || response?.statusCode === "545") {
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

  const getListRequestByParams = async (
    searchRequest: SearchDanhSachDonRequest,
  ) => {
    const response = await DanhSachDonApi.getDanhSachDon(searchRequest);
    if (response?.statusCode === "200") {
      setData(response?.data);
      setTotalRecords(response?.data?.length);
    } else if (response?.statusCode === "545") {
      setData(undefined);
      setTotalRecords(0);
    } else {
      console.log(response?.message);
    }
  };

  const onApprove = async () => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("token")!);

    if (!selectedRowKeys.length) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một đơn yêu cầu!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });

      return;
    }

    const listDonBu = selectedRows
      .filter((row) => row.loaiDon === 1)
      .map((row) => row.maDon)
      .join(",");

    const listDonConNho = selectedRows
      .filter((row) => row.loaiDon === 2)
      .map((row) => row.maDon)
      .join(",");

    const listDonPhep = selectedRows
      .filter((row) => row.loaiDon === 3)
      .map((row) => row.maDon)
      .join(",");

    const listDonTangCa = selectedRows
      .filter((row) => row.loaiDon === 4)
      .map((row) => row.maDon)
      .join(",");

    const response = await DanhSachDonApi.approveRequest({
      maDonBu: listDonBu,
      maDonPhep: listDonPhep,
      maDonTangCa: listDonTangCa,
      maDonConNho: listDonConNho,
      nguoiDuyet: getTokenFromLocalStorage.hoTen,
    });
    if (response?.statusCode === "200") {
      getListRequestByParams({
        tenNhanVien: null,
        loaiDon: null,
        ngayLamViecBatDau: null,
        ngayLamViecKetThuc: null,
        ngayTaoBatDau: null,
        ngayTaoKetThuc: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Duyệt đơn thành công!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      setSelectedRow([]);
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
        content: "Vui lòng chọn ít nhất một đơn yêu cầu!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });

      return;
    }

    const listDonBu = selectedRows
      .filter((row) => row.loaiDon === 1)
      .map((row) => row.maDon)
      .join(",");

    const listDonConNho = selectedRows
      .filter((row) => row.loaiDon === 2)
      .map((row) => row.maDon)
      .join(",");

    const listDonPhep = selectedRows
      .filter((row) => row.loaiDon === 3)
      .map((row) => row.maDon)
      .join(",");

    const listDonTangCa = selectedRows
      .filter((row) => row.loaiDon === 4)
      .map((row) => row.maDon)
      .join(",");

    const response = await DanhSachDonApi.rejectRequest({
      maDonBu: listDonBu,
      maDonPhep: listDonPhep,
      maDonTangCa: listDonTangCa,
      maDonConNho: listDonConNho,
      nguoiDuyet: getTokenFromLocalStorage.hoTen,
    });
    if (response?.statusCode === "200") {
      getListRequestByParams({
        tenNhanVien: null,
        loaiDon: null,
        ngayLamViecBatDau: null,
        ngayLamViecKetThuc: null,
        ngayTaoBatDau: null,
        ngayTaoKetThuc: null,
        trangThai: null,
      });
      messageApi.open({
        type: "success",
        content: "Hủy đơn thành công!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      setSelectedRow([]);
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

    getListRequestByParams({
      tenNhanVien: null,
      loaiDon: null,
      ngayLamViecBatDau: null,
      ngayLamViecKetThuc: null,
      ngayTaoBatDau: null,
      ngayTaoKetThuc: null,
      trangThai: null,
    });
  };

  let tableData: DataType[] = [];
  if (data) {
    data.listDonBu?.map((donbu, index) => {
      const nhanVien = employeeData?.find(
        (e) => e.maNhanVien === donbu.maNhanVien,
      );

      tableData.push({
        key: index,
        hoTen: nhanVien?.hoTen,
        phongBan: departmentData?.find(
          (d) => d.maPhongBan === nhanVien?.maPhongBan,
        )?.tenPhongBan,
        ngayLamViec: dayjs(donbu.ngayLamViec).format("DD/MM/YYYY"),
        ngayTaoDon: dayjs(donbu.ngayTaoDon).format("DD/MM/YYYY"),
        loaiDon: donbu.loaiDon,
        nguoiDuyet: donbu.nguoiDuyet,
        trangThai: donbu.trangThai,
        lyDo: donbu.lyDo,
        maNhanVien: donbu.maNhanVien,
        soPhutXinBu: donbu.soPhutXinBu,
        tuNgay: "",
        denNgay: "",
        tangCaTu: "",
        tangCaDen: "",
        chucVu: employeeData?.find((e) => e.maNhanVien === donbu.maNhanVien)!
          .chucVu,
        maDon: donbu.maDonBu,
      });
    });

    data.listDonPhep?.map((donphep, index) => {
      const nhanVien = employeeData?.find(
        (e) => e.maNhanVien === donphep.maNhanVien,
      );

      tableData.push({
        key: index + 1000,
        hoTen: nhanVien?.hoTen,
        phongBan: departmentData?.find(
          (d) => d.maPhongBan === nhanVien?.maPhongBan,
        )?.tenPhongBan,
        ngayLamViec: dayjs(donphep.ngayLamViec).format("DD/MM/YYYY"),
        ngayTaoDon: dayjs(donphep.ngayTaoDon).format("DD/MM/YYYY"),
        loaiDon: donphep.loaiDon,
        nguoiDuyet: donphep.nguoiDuyet,
        trangThai: donphep.trangThai,
        lyDo: donphep.lyDo,
        maNhanVien: donphep.maNhanVien,
        soPhutXinBu: 0,
        tuNgay: "",
        denNgay: "",
        tangCaTu: "",
        tangCaDen: "",
        chucVu: employeeData?.find((e) => e.maNhanVien === donphep.maNhanVien)!
          .chucVu,
        maDon: donphep.maDonPhep,
      });
    });

    data.listDonTangCa?.map((dontangca, index) => {
      const nhanVien = employeeData?.find(
        (e) => e.maNhanVien === dontangca.maNhanVien,
      );

      tableData.push({
        key: index + 2000,
        hoTen: nhanVien?.hoTen,
        phongBan: departmentData?.find(
          (d) => d.maPhongBan === nhanVien?.maPhongBan,
        )?.tenPhongBan,
        ngayLamViec: dayjs(dontangca.ngayLamViec).format("DD/MM/YYYY"),
        ngayTaoDon: dayjs(dontangca.ngayTaoDon).format("DD/MM/YYYY"),
        loaiDon: dontangca.loaiDon,
        nguoiDuyet: dontangca.nguoiDuyet,
        trangThai: dontangca.trangThai,
        lyDo: dontangca.lyDo,
        maNhanVien: dontangca.maNhanVien,
        soPhutXinBu: 0,
        tuNgay: "",
        denNgay: "",
        tangCaTu: dontangca.tangCaTu,
        tangCaDen: dontangca.tangCaDen,
        chucVu: employeeData?.find(
          (e) => e.maNhanVien === dontangca.maNhanVien,
        )!.chucVu,
        maDon: dontangca.maDonTangCa,
      });
    });

    data.listDonConNho?.map((donconnho, index) => {
      const nhanVien = employeeData?.find(
        (e) => e.maNhanVien === donconnho.maNhanVien,
      );

      tableData.push({
        key: index + 3000,
        hoTen: nhanVien?.hoTen,
        phongBan: departmentData?.find(
          (d) => d.maPhongBan === nhanVien?.maPhongBan,
        )?.tenPhongBan,
        ngayLamViec: "",
        ngayTaoDon: dayjs(donconnho.ngayTaoDon).format("DD/MM/YYYY"),
        loaiDon: donconnho.loaiDon,
        nguoiDuyet: donconnho.nguoiDuyet,
        trangThai: donconnho.trangThai,
        lyDo: donconnho.lyDo,
        maNhanVien: donconnho.maNhanVien,
        soPhutXinBu: 0,
        tuNgay: dayjs(donconnho.tuNgay).format("DD/MM/YYYY"),
        denNgay: dayjs(donconnho.denNgay).format("DD/MM/YYYY"),
        tangCaTu: "",
        tangCaDen: "",
        chucVu: employeeData?.find(
          (e) => e.maNhanVien === donconnho.maNhanVien,
        )!.chucVu,
        maDon: donconnho.maDonConNho,
      });
    });
  } else {
    tableData = [];
  }

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
      setSelectedRow(selectedRows);
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

  const handleView = (record: DataType) => {
    setRowData(record);
    setViewOpen(true);
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
      dataIndex: "ngayTaoDon",
      key: "ngayTaoDon",
    },
    {
      title: "Loại đơn",
      key: "loaiDon",
      dataIndex: "loaiDon",
      render: (value, record) => {
        return (
          <>
            {record.loaiDon === 1
              ? "Đơn bù"
              : record.loaiDon === 2
                ? "Đơn con nhỏ"
                : record.loaiDon === 3
                  ? "Đơn phép"
                  : "Đơn tăng ca"}
          </>
        );
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

  const onFinish = (values: any) => {
    const requestData: SearchDanhSachDonRequest = {
      tenNhanVien: values.tenNhanVien,
      loaiDon: values.loaiDon,
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

    getListRequestByParams(requestData);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={formStyle}
        name="advanced_search"
      >
        {contextHolder}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Tên nhân viên:"
              name="tenNhanVien"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Tên nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Loại đơn"
              name="loaiDon"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Select placeholder="Vui lòng chọn">
                <Option value="1">Đơn bù</Option>
                <Option value="2">Đơn con nhỏ</Option>
                <Option value="3">Đơn phép</Option>
                <Option value="4">Đơn tăng ca</Option>
              </Select>
            </Form.Item>
          </Col>
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
            <b>Danh sách đơn yêu cầu</b>
          </span>
          <Row>
            <Button
              onClick={() => onApprove()}
              type="primary"
              style={{ marginLeft: "12px" }}
            >
              Duyệt đơn
            </Button>
            <Button
              onClick={() => onReject()}
              type="primary"
              style={{ marginLeft: "12px" }}
            >
              Hủy đơn
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
      <ViewManageRequest
        data={rowData}
        show={viewOpen}
        close={() => setViewOpen(false)}
      />
    </>
  );
};

export default ManageRequestsTable;
