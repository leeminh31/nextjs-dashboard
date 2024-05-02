/* eslint-disable @typescript-eslint/no-explicit-any */
import NhanVienApi from "@/app/api/nhanvien";
import PhongBanApi from "@/app/api/phongban";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { CreatePhongBanRequest } from "@/app/models/phongban/create-phongban-request";
import { specialCharactersRegex } from "@/app/utils/validateInput";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const CreateDepartmentsList = (props: any) => {
  const { show, close, refresh } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<NhanVienResponse[]>([]);
  const [form] = Form.useForm();

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    const response = await NhanVienApi.getNhanVien(searchRequest);
    if (response?.statusCode === "200") {
      setData(response.data);
    } else if (response?.statusCode === "545") {
      setData(response.data);
    } else {
      console.log(response.message);
    }
  };

  const onFinish = async (values: any) => {
    const requestData: CreatePhongBanRequest = {
      tenPhongBan: values.tenPhongBan,
      truongPhongBan: values.truongPhongBan,
      thuKyPhongBan: values.thuKy,
      soLanChamCong: values.soLanChamCong,
    };

    const response = await PhongBanApi.addPhongBan(requestData);
    if (response?.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Tạo phòng ban mới thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else if (response?.statusCode === "551") {
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
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });
  }, []);

  return (
    <Drawer
      size="large"
      title="Thêm mới"
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
      <Form form={form} name="insertDepartment" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={"tenPhongBan"}
              label={"Tên phòng ban"}
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
              <Input placeholder="Tên phòng ban" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"soLanChamCong"}
              label={"Số lần chấm công"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
                {
                  validator(_, value) {
                    if (value > 3) {
                      return Promise.reject("Vui lòng nhập số nhỏ hơn 3.");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input type="number" placeholder="Số lần chấm công" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"truongPhongBan"}
              label={"Trưởng phòng ban"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Select showSearch optionFilterProp="value">
                {data?.map((item) => {
                  return <Option value={item.hoTen}>{item.hoTen}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"thuKy"}
              label={"Thư ký"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Select showSearch optionFilterProp="value">
                {data?.map((item) => {
                  return <Option value={item.hoTen}>{item.hoTen}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateDepartmentsList;
