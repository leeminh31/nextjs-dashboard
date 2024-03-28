/* eslint-disable @typescript-eslint/no-explicit-any */
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { CreateNhanVienRequest } from "@/app/models/nhanvien/create-nhanvien-request";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { FormatDate } from "@/app/utils/formatDate";
import { specialCharactersRegex } from "@/app/utils/validateInput";
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
import { useEffect, useState } from "react";

const CreateEmployeeList = (props: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { show, close, refresh } = props;
  const [departments, setDepartments] = useState<PhongBanResponse[]>([]);
  const [form] = Form.useForm();

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    const response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      setDepartments(response.data);
    } else {
      console.log(response.message);
    }
  };

  const changeSelect = (e: any) => {
    form.setFieldValue("maPhongBan", e);
  };

  const onFinish = async (values: any) => {
    const requestData: CreateNhanVienRequest = {
      maNhanVien: values.maNhanVien,
      hoTen: values.hoTen,
      chucVu: values.chucVu,
      mail: values.mail,
      ngaySinh: FormatDate(values.ngaySinh)!,
      soCCCD: values.soCCCD,
      ngayCap: FormatDate(values.ngayCap)!,
      queQuan: values.queQuan,
      noiOHienTai: values.noiOHienTai,
      nguoiThanLienHe: values.nguoiThanLienHe,
      soDienThoaiNguoiLienHe: values.soDienThoaiNguoiLienHe,
      stkNganHang: values.stkNganHang,
      nganHang: values.nganHang,
      maPhongBan: parseInt(values.maPhongBan),
      soDienThoai: values.soDienThoai,
      idVanTay: parseInt(values.IDVanTay),
    };

    const response = await NhanVienApi.addNhanVien(requestData);
    if (response.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Thêm mới nhân viên thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else if (response.statusCode === "553" || response.statusCode === "554") {
      messageApi.open({
        type: "error",
        content: response.message,
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
    if (show) form.resetFields();
  }, [show]);

  useEffect(() => {
    getDepartmentsByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });
  }, []);

  return (
    <Drawer
      size="large"
      title="Thêm nhân viên mới"
      placement="right"
      onClose={close}
      open={show}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={close}>Hủy</Button>
            <Button onClick={() => form.submit()} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      }
    >
      {contextHolder}
      <Form form={form} name="insertEmployee" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={"maNhanVien"}
              label={"Mã nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Mã nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"hoTen"}
              label={"Tên nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"chucVu"}
              label={"Chức vụ"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
            >
              <Input placeholder="Chức vụ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"maPhongBan"}
              label={"Phòng ban"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Vui lòng chọn"
                onChange={(e) => changeSelect(e)}
                options={departments?.map((item) => ({
                  value: item.maPhongBan,
                  label: item.tenPhongBan,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"IDVanTay"}
              label={"ID vân tay"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Input type="number" placeholder="ID vân tay" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"mail"}
              label={"Mail công việc"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng dữ liệu!",
                },
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Input placeholder="Mail công việc" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngaySinh"}
              label={"Ngày sinh"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker placeholder="Ngày sinh" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"soDienThoai"}
              label={"Số điện thoại"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator(_, value) {
                    if (value !== undefined && value != "") {
                      if (value.length != 10)
                        return Promise.reject(
                          "Vui lòng nhập đúng định dạng dữ liệu.",
                        );
                      return Promise.resolve();
                    } else return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" maxLength={20} placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"soCCCD"}
              label={"Căn cước công dân"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator(_, value) {
                    if (value !== undefined && value != "") {
                      if (value.length != 12)
                        return Promise.reject(
                          "Vui lòng nhập đúng định dạng dữ liệu.",
                        );
                      return Promise.resolve();
                    } else return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                type="number"
                maxLength={20}
                placeholder="Căn cước công dân"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayCap"}
              label={"Ngày cấp"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker placeholder="Ngày cấp" format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"queQuan"}
              label={"Quê quán"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Quê quán" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"noiOHienTai"}
              label={"Nơi ở hiện tại"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nơi ở hiện tại" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"nguoiThanLienHe"}
              label={"Người thân liên hệ"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
            >
              <Input placeholder="Người thân liên hệ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"soDienThoaiNguoiLienHe"}
              label={"Số điện thoại người thân liên hệ"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator(_, value) {
                    if (value !== undefined && value != "") {
                      if (value.length != 10)
                        return Promise.reject(
                          "Vui lòng nhập đúng định dạng dữ liệu.",
                        );
                      return Promise.resolve();
                    } else return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Số điện thoại người thân liên hệ"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"stkNganHang"}
              label={"Số tài khoản ngân hàng"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input type="number" placeholder="Số tài khoản ngân hàng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"nganHang"}
              label={"Ngân hàng"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
            >
              <Input type="text" placeholder="Ngân hàng" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateEmployeeList;
