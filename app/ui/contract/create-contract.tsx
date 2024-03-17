import HopDongApi from "@/app/api/hopdong";
import NhanVienApi from "@/app/api/nhanvien";
import { CreateHopDongRequest } from "@/app/models/hopdong/create-hopdong-request";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { FormatDate } from "@/app/utils/formatDate";
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

const { Option } = Select;

const CreateContract = (props: any) => {
  const { show, close, refresh } = props;
  const [form] = Form.useForm();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState(false);
  const [data, setData] = useState<NhanVienResponse[]>([]);

  const changeSelect = (e: any) => {
    form.setFieldValue("maNhanVien", e);
  };

  const onFinish = async (values: any) => {
    console.log(values);

    let dateStart = new Date(values.ngayBatDauHopDong);
    let dateEnd = new Date(values.ngayKetThucHopDong);

    if (dateStart.getTime() >= dateEnd.getTime()) {
      messageApi.open({
        type: "error",
        content: "Ngày kết thúc bắt buộc lớn hơn ngày bắt đầu",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (
      values.loaiHopDong === "Thử việc" &&
      Math.floor(
        (dateEnd.getTime() - dateStart.getTime()) / (24 * 3600 * 1000),
      ) > 90
    ) {
      messageApi.open({
        type: "error",
        content: "Không được phép nhập khoảng thời gian lớn hơn 3 tháng",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (
      values.loaiHopDong === "Chính thức" &&
      Math.floor(
        (dateEnd.getTime() - dateStart.getTime()) / (24 * 3600 * 1000),
      ) > 365
    ) {
      messageApi.open({
        type: "error",
        content: "Không được phép nhập khoảng thời gian lớn hơn 12 tháng.",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const requestData: CreateHopDongRequest = {
      tenHopDong: values.tenHopDong,
      maNhanVien: values.maNhanVien,
      ngayBatDauHopDong: FormatDate(values.ngayBatDauHopDong),
      ngayKetThucHopDong: FormatDate(values.ngayKetThucHopDong),
      loaiHopDong: values.loaiHopDong,
      tiLeHuongLuong: values.tyLeHuongLuong,
      gioLamViec: values.gioLamViec,
      congChuan: values.congChuan,
    };

    let response = await HopDongApi.addHopDong(requestData);
    if (response.statusCode === "200") {
      refresh();
      close();
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Thêm hợp đồng mới thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else if (response.statusCode === "552") {
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

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200") {
      setData(response.data.reverse());
    } else if (response.statusCode === "545") {
      setData(response.data);
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
      title="Thêm mới hợp đồng nhân viên"
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
      <Form form={form} name="insertContract" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name={"tenHopDong"}
              label={"Tên hợp đồng"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Vui lòng nhập Tên hợp đồng" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"maNhanVien"}
              label={"Mã nhân viên"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Mã nhân viên" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"tenNhanVien"}
              label={"Tên Nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Vui lòng chọn"
                onChange={(e) => changeSelect(e)}
                options={data?.map((item, index) => ({
                  value: item.maNhanVien,
                  label: item.hoTen,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"loaiHopDong"}
              label={"Loại hợp đồng"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
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
          <Col span={12}>
            <Form.Item
              name={"ngayBatDauHopDong"}
              label={"Ngày bắt đầu"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                placeholder="Vui lòng nhập Ngày bắt đầu"
                format={dateFormatList}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayKetThucHopDong"}
              label={"Ngày kết thúc"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                placeholder="Vui lòng nhập Ngày kết thúc"
                format={dateFormatList}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"tyLeHuongLuong"}
              label={"Tỷ lệ hưởng lương"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
                {
                  validator(_, value) {
                    if (value !== null && value !== undefined && value !== "")
                      if (value > 100)
                        return Promise.reject(
                          "Tỷ lệ hưởng lương không được phép lớn hơn 100",
                        );
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type={"number"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"gioLamViec"}
              label={"Giờ làm việc"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
            >
              <Input type={"number"} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateContract;
