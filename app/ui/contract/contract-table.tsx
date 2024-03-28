"use client";

import HopDongApi from "@/app/api/hopdong";
import NhanVienApi from "@/app/api/nhanvien";
import { HopDongResponse } from "@/app/models/hopdong/hopdong-response";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Table,
  Tag,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import CreateContract from "./create-contract";
import ImportContract from "./import-contract";
import UpdateContract from "./update-contract";
const { Option } = Select;

const ContractTable: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [importOpen, setImportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<HopDongResponse[]>([]);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [updateData, setUpdateData] = useState({});

  const onUpdate = (record: any) => {
    setUpdateData(record);
    setUpdateOpen(true);
  };

  const columns: ColumnsType<HopDongResponse> = [
    {
      title: "STT",
      key: "key",
      width: 50,
      render: (value, record, index) => {
        return <>{(page - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "Tên hợp đồng",
      dataIndex: "tenHopDong",
      key: "tenHopDong",
      width: 250,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "maNhanVien",
      key: "maNhanVien",
      width: 150,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 200,
      render: (value, record) => {
        return (
          <>
            {
              employeeData.find(
                (element) => element.maNhanVien === record.maNhanVien,
              )?.hoTen
            }
          </>
        );
      },
    },
    {
      title: "Ngày bắt đầu",
      key: "ngayBatDauHopDong",
      dataIndex: "ngayBatDauHopDong",
      width: 150,
    },
    {
      title: "Ngày kết thúc",
      key: "ngayKetThucHopDong",
      dataIndex: "ngayKetThucHopDong",
      width: 150,
    },
    {
      title: "Loại hợp đồng",
      key: "loaiHopDong",
      dataIndex: "loaiHopDong",
      width: 150,
    },
    {
      title: "Trạng thái hợp đồng",
      key: "trangThaiHopDong",
      dataIndex: "trangThaiHopDong",
      width: 150,
      render: (value, record, index) => {
        const dateEnd = new Date(record.ngayKetThucHopDong);
        const color = dateEnd.getTime() < Date.now() ? "volcano" : "green";

        return (
          <Tag color={color} key={index}>
            {color === "volcano" ? "Đã kết thúc" : "Còn hạn"}
          </Tag>
        );
      },
    },
    {
      title: "Hoạt động",
      key: "action",
      fixed: "right",
      width: 100,
      align: "center" as const,
      render: (value, record) => (
        <>
          <Button
            icon={<EditTwoTone />}
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            onClick={() => onUpdate(record)}
          ></Button>
        </>
      ),
    },
  ];

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200") {
      setEmployeeData(response.data.reverse());
    } else if (response.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getContractByParams = async (
    tenHopDong: string | null,
    loaiHopDong: string | null,
  ) => {
    let tenHopDongParam = null;
    if (tenHopDong !== "") tenHopDongParam = tenHopDong;
    const response = await HopDongApi.getHopDong(tenHopDongParam, loaiHopDong);
    if (response.statusCode === "200") {
      setContractData(response.data.reverse());
      setTotalRecords(response.data.length);
    } else if (response.statusCode === "545") {
      setContractData(response.data);
      setTotalRecords(0);
    } else {
      console.log(response.message);
    }
  };

  const getEmployeeIdByName = async (hoTen: string) => {
    const response = await NhanVienApi.getAllEmployeeIdByName(hoTen);
    if (response.statusCode === "200") {
      setIdList(response.data.reverse());
    } else if (response.statusCode === "545") {
      setIdList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const refresh = () => {
    getContractByParams(null, null);
  };

  const onFinish = async (values: any) => {
    await getContractByParams(
      values.tenHopDong?.trimStart().trimEnd(),
      values.loaiHopDong?.trimStart().trimEnd(),
    );
    if (values.hoTen !== "" && values.hoTen !== undefined) {
      getEmployeeIdByName(values.hoTen);
      // console.log(idList)
      // let newResult = contractData.filter((item) => idList.includes(item.maNhanVien))
      // console.log(newResult)
      // setContractData(newResult)
      // return
    }
  };

  useEffect(() => {
    if (JSON.stringify(idList) !== JSON.stringify([])) {
      const newResult = contractData.filter((item) =>
        idList.includes(item.maNhanVien),
      );
      setContractData(newResult);
    }
  }, [idList]);

  useEffect(() => {
    setLoading(false);
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
      <Skeleton loading={loading} active>
        <Form
          form={form}
          onFinish={onFinish}
          style={formStyle}
          name="advanced_search"
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item
                name="tenHopDong"
                label="Tên hợp đồng"
                labelCol={{ style: { width: 120, textAlign: "left" } }}
              >
                <Input
                  placeholder="Tên hợp đồng"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="hoTen"
                label="Tên nhân viên"
                labelCol={{ style: { width: 120, textAlign: "left" } }}
              >
                <Input
                  placeholder="Tên nhân viên"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="loaiHopDong"
                label="Loại hợp đồng"
                labelCol={{ style: { width: 120, textAlign: "left" } }}
              >
                <Select
                  showSearch
                  optionFilterProp="value"
                  placeholder="Vui lòng chọn"
                >
                  <Option value="Thử việc">Thử việc</Option>
                  <Option value="Chính thức">Chính thức</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
            >
              Tìm kiếm
            </Button>
            <Button onClick={() => form.resetFields()}>Tạo lại</Button>
          </Row>
        </Form>
      </Skeleton>
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
            style={{ height: "50px", marginBottom: "10px" }}
          >
            <span>
              <b>Danh sách hợp đồng</b>
            </span>
            <Row>
              <Button
                type="primary"
                style={{ marginLeft: "12px" }}
                onClick={() => setImportOpen(true)}
              >
                Import
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: "12px" }}
                onClick={() => setAddOpen(true)}
              >
                Thêm mới
              </Button>
            </Row>
          </Flex>
          <Table
            scroll={{ x: 1500, y: 500 }}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={contractData}
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
      <ImportContract
        refresh={refresh}
        show={importOpen}
        close={() => setImportOpen(false)}
      />
      <CreateContract
        refresh={refresh}
        show={addOpen}
        close={() => setAddOpen(false)}
      />
      <UpdateContract
        refresh={refresh}
        data={updateData}
        show={updateOpen}
        close={() => setUpdateOpen(false)}
      />
    </>
  );
};

export default ContractTable;
