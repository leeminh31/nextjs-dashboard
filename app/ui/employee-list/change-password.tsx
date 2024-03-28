/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginApi } from "@/app/api/taikhoan";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useEffect } from "react";

const ChangePassword = (props: any) => {
  const { show, close, id } = props;
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const response = await LoginApi.changePassword({
      maNhanVien: values.maNhanVien,
      matKhau: values.matKhau,
    });
    if (response.statusCode === "200") {
      close();
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    if (id !== null) form.setFieldValue("maNhanVien", id);
  }, [id]);

  return (
    <Drawer
      title="Đổi mật khẩu"
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
      <Form form={form} name="changePassword" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item
              name={"maNhanVien"}
              label={"Mã nhân viên"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã nhân viên!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Mã nhân viên" disabled />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name={"matKhau"}
              label={"Mật khẩu"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Mật khẩu" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ChangePassword;
