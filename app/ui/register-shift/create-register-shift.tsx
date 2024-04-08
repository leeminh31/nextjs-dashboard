/* eslint-disable @typescript-eslint/no-explicit-any */
import CaLamViecApi from "@/app/api/calamviec";
import DangKyCaApi from "@/app/api/dangkyca";
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { CaLamViecResponse } from "@/app/models/calamviec/calamviec-response";
import { CreateDangKyCaRequest } from "@/app/models/dangkyca/create-dangkyca-request";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Option } = Select;

const CreateRegisterShift = (props: any) => {
  const { show, close, refresh } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>([]);
  const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
  const [shiftList, setShiftList] = useState<CaLamViecResponse[]>([]);
  const [form] = Form.useForm();

  const getShiftName = async (maCa: number | null, tenCa: string | null) => {
    const response = await CaLamViecApi.getCaLamViec(maCa, tenCa);
    if (response?.statusCode === "200") {
      setShiftList(response.data);
    } else if (response.statusCode === "545") {
      setShiftList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200") {
      setEmployeeData(response.data);
    } else if (response.statusCode === "545") {
      setEmployeeData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      setDepartmentData(response.data?.reverse());
    } else if (response.statusCode === "545") {
      setDepartmentData([]);
    } else {
      console.log(response.message);
    }
  };

  const handleChangeRegisterShift = (id: string) => {
    form.setFieldValue("maNhanVien", id);
    const employee = employeeData.find((e) => e.maNhanVien === id);
    form.setFieldValue("chucVu", employee?.chucVu);
    form.setFieldValue("phongBan", employee?.maPhongBan);
    form.setFieldValue("caLamViecHienTai", employee?.maCa);
  };

  const onFinish = async (values: any) => {
    const requestData: CreateDangKyCaRequest = {
      hoTen: values.tenNhanVien,
      ngayTao: values.ngayTao,
      caLamViecHienTai: shiftList.find(
        (shift) => shift.maCa == values.caLamViecHienTai,
      )!.tenCa,
      caLamViecMoi: values.caLamViecMoi,
      ngayBatDauCaMoi: values.ngayBatDauCaLamViecMoi,
      nguoiDuyet: "",
      trangThai: "0",
      maNhanVien: values.maNhanVien,
    };

    if (requestData.ngayBatDauCaMoi < new Date()) {
      messageApi.open({
        type: "error",
        content: "Ngày bắt đầu ca làm mới không được phép nhỏ hơn ngày tạo đơn",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (requestData.caLamViecHienTai === requestData.caLamViecMoi) {
      messageApi.open({
        type: "error",
        content: "Ca làm này đã là ca hiện tại",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const response = await DangKyCaApi.addDangKyCa(requestData);
    if (response.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Tạo đơn đăng ký ca làm mới thành công",
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
  useEffect(() => {
    if (show) {
      form.resetFields();
      form.setFieldValue("ngayTao", dayjs(new Date()));
    }
  }, [show]);

  useEffect(() => {
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });

    getDepartmentsByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });

    getShiftName(null, null);
  }, []);

  return (
    <Drawer
      // size="default"
      title="Đăng ký ca làm việc mới"
      placement="right"
      onClose={close}
      width={600}
      open={show}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={close}>Thoát</Button>
            <Button onClick={() => form.submit()} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      }
    >
      {contextHolder}
      <Form form={form} name="insertDepartment" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={"tenNhanVien"}
              label={"Tên nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Vui lòng chọn"
                onChange={(e) => handleChangeRegisterShift(e)}
                options={employeeData?.map((item) => ({
                  value: item.maNhanVien,
                  label: item.hoTen,
                }))}
              >
                {employeeData?.map((item) => {
                  return <Option value={item.maNhanVien}>{item.hoTen}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"maNhanVien"}
              label={"Mã nhân viên"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input disabled placeholder="Mã nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"phongBan"}
              label={"Phòng ban"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled>
                {departmentData?.map((item) => {
                  return (
                    <Option value={item.maPhongBan}>{item.tenPhongBan}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"chucVu"}
              label={"Chức vụ"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled>
                {employeeData?.map((item) => {
                  return <Option value={item.chucVu}>{item.chucVu}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayTao"}
              label={"Ngày tạo"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <DatePicker placeholder="Vui lòng chọn" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"caLamViecHienTai"}
              label={"Ca làm việc hiện tại"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled placeholder="Vui lòng chọn">
                {shiftList.map((item) => (
                  <Option key={item.maCa} value={item.maCa}>
                    {item.tenCa}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"caLamViecMoi"}
              label={"Ca làm việc mới"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn">
                {shiftList.map((item) => (
                  <Option key={item.maCa} value={item.tenCa}>
                    {item.tenCa}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayBatDauCaLamViecMoi"}
              label={"Ngày bắt đầu ca làm việc mới"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <DatePicker placeholder="Vui lòng chọn" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateRegisterShift;
