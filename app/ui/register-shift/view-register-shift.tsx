/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const ViewRegisterShift = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        tenNhanVien: data.hoTen,
        maNhanVien: data.maNhanVien,
        phongBan: data.phongBan,
        chucVu: data.chucVu,
        ngayTao: dayjs(data.ngayTao, "DD/MM/YYYY"),
        caLamViecHienTai: data.caHienTai,
        caLamViecMoi: data.caMoi,
        ngayBatDauCaLamViecMoi: dayjs(data.ngayBatDauCaMoi, "DD/MM/YYYY"),
      });
    }
  }, [data]);

  return (
    <Drawer
      // size="default"
      title="Thông tin chi tiết"
      placement="right"
      onClose={close}
      width={600}
      open={show}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={close}>Thoát</Button>
          </Space>
        </Row>
      }
    >
      <Form form={form} name="insertDepartment">
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
              <Select disabled></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"maNhanVien"}
              label={"Mã nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đầy đủ thông tin",
                },
              ]}
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
              <Select disabled></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"chucVu"}
              label={"Chức vụ"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayTao"}
              label={"Ngày tạo"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                placeholder="Vui lòng chọn"
                disabled
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"caLamViecHienTai"}
              label={"Ca làm việc hiện tại"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"caLamViecMoi"}
              label={"Ca làm việc mới"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select disabled></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"ngayBatDauCaLamViecMoi"}
              label={"Ngày bắt đầu ca làm việc mới"}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                placeholder="Vui lòng chọn"
                disabled
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ViewRegisterShift;
