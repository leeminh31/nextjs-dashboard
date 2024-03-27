import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useEffect, useState } from "react";
import CreateDepartmentsList from "./create-departments-list";
import UpdateDepartmentsList from "./update-departments-list";
const { Option } = Select;

const DepartmentsListTable: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState<PhongBanResponse[]>([]);
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);

  interface DataType {
    key: React.Key;
    tenPhongBan: string;
    thuKyPhongBan: string;
    truongPhongBan: string;
    soLanChamCong: number;
    maPhongBan: number;
  }

  const tableData: DataType[] = [];
  for (let i = 0; i < data.length; i++) {
    tableData.push({
      key: data[i].maPhongBan,
      tenPhongBan: data[i].tenPhongBan,
      thuKyPhongBan: data[i].thuKyPhongBan,
      truongPhongBan: data[i].truongPhongBan,
      soLanChamCong: data[i].soLanChamCong,
      maPhongBan: data[i].maPhongBan,
    });
  }

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200" || response.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    let response = await PhongBanApi.getPhongBan(searchRequest);
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

  const refresh = () => {
    getDepartmentsByParams({
      tenPhongBan: null,
      thuKyPhongBan: null,
      truongPhongBan: null,
    });
  };

  const deleteDepartments = async (selectedRowKeys: any) => {
    let response = await PhongBanApi.deletePhongBan(selectedRowKeys);
    if (response.statusCode === "200") {
      refresh();
      messageApi.open({
        type: "success",
        content: "Xóa phòng ban thành công",
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

  const onUpdate = (record: any) => {
    setUpdateData(record);
    setUpdateOpen(true);
  };

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

  const onDelete = () => {
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });

    if (selectedRowKeys.length == 0) {
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn ít nhất một phòng ban!",
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
      if (employeeData.some((item) => item.maPhongBan == value)) {
        flag = true;
      }
    });

    if (flag) {
      messageApi.open({
        type: "error",
        content: "Phòng ban này đang có nhân viên, bạn không được phép xóa!",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const departmentsId = selectedRowKeys.join(",");
    deleteDepartments(departmentsId);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (value, record, index) => {
        return <>{(page - 1) * pageSize + index + 1}</>;
      },
    },
    {
      title: "Tên phòng ban",
      dataIndex: "tenPhongBan",
      width: 200,
      key: "tenPhongBan",
    },
    {
      title: "Số lần chấm công",
      dataIndex: "soLanChamCong",
      width: 150,
    },
    {
      title: "Trưởng phòng ban",
      dataIndex: "truongPhongBan",
      width: 200,
    },
    {
      title: "Thư ký",
      dataIndex: "thuKyPhongBan",
      width: 200,
    },
    {
      title: "Hoạt động",
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

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    marginBottom: "24px",
    padding: "24px",
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onFinish = (values: any) => {
    const requestData: SearchPhongBanRequest = {
      tenPhongBan: values.tenPhongBan?.trimStart().trimEnd(),
      truongPhongBan: values.truongPhongBan?.trimStart().trimEnd(),
      thuKyPhongBan: values.thuKyPhongBan?.trimStart().trimEnd(),
    };
    getDepartmentsByParams(requestData);
  };

  useEffect(() => {}, [data]);

  useEffect(() => {
    setLoading(false);
    refresh();
  }, []);

  return (
    <>
      {contextHolder}
      <Skeleton loading={loading} active>
        <Form
          form={form}
          name="advanced_search"
          style={formStyle}
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={7}>
              <Form.Item
                name={"tenPhongBan"}
                label={"Tên phòng ban"}
                labelCol={{ style: { width: 120, textAlign: "left" } }}
              >
                <Input placeholder="Tên phòng ban" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"truongPhongBan"}
                label={"Trưởng phòng ban"}
                labelCol={{ style: { width: 130, textAlign: "left" } }}
              >
                <Input placeholder="Trưởng phòng ban" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"thuKyPhongBan"}
                label={"Thư ký phòng ban"}
                labelCol={{ style: { width: 140, textAlign: "left" } }}
              >
                <Input placeholder="Thư ký phòng ban" />
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
      </Skeleton>
      <Skeleton loading={loading} active>
        <div style={{ backgroundColor: "#fff", padding: "24px" }}>
          <Row justify={"space-between"} style={{ marginBottom: "24px" }}>
            <span style={{ textAlign: "center" }}>
              <b>Quản lý phòng ban</b>
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
            scroll={{ x: 1000, y: 500 }}
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
      <CreateDepartmentsList
        refresh={refresh}
        show={addOpen}
        close={() => setAddOpen(false)}
      />
      <UpdateDepartmentsList
        refresh={refresh}
        data={updateData}
        show={updateOpen}
        close={() => setUpdateOpen(false)}
      />
    </>
  );
};

export default DepartmentsListTable;
