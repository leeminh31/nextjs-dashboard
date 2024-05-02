/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginApi } from "@/app/api/taikhoan";
import { Button, Col, Drawer, Form, Input, message, Row, Space } from "antd";
import { useEffect } from "react";

const ChangePassword = (props: any) => {
  const { show, close, id } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const response = await LoginApi.changePassword({
      maNhanVien: values.maNhanVien,
      matKhau: values.matKhau,
    });
    if (response?.statusCode === "200") {
      close();
      messageApi.open({
        type: "success",
        content: "Đổi mật khẩu thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else if (response?.statusCode === "560") {
      close();
      messageApi.open({
        type: "error",
        content: response.message,
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      form.setFieldValue("matKhau", null);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    if (id !== null) form.setFieldValue("maNhanVien", id);
  }, [id]);

  useEffect(() => {
    if (show) form.setFieldValue("matKhau", null);
  }, [show]);

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
      {contextHolder}
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
                  message: "Vui lòng nhập ",
                },
                {
                  validator(_, value) {
                    if (value !== null && value !== undefined && value !== "")
                      if (value.length < 6)
                        return Promise.reject("Mật khẩu không đủ 6 ký tự");
                    return Promise.resolve();
                  },
                },
                {
                  validator(_, value) {
                    const upperCaseRegex = /[A-Z]/g;
                    if (value !== null && value !== undefined && value !== "")
                      if (!upperCaseRegex.test(value))
                        return Promise.reject("Mật khẩu phải có ký tự in hoa");
                    return Promise.resolve();
                  },
                },
                {
                  validator(_, value) {
                    const upperCaseRegex = /[0-9]/g;
                    if (value !== null && value !== undefined && value !== "")
                      if (!upperCaseRegex.test(value))
                        return Promise.reject("Mật khẩu phải có ký tự số");
                    return Promise.resolve();
                  },
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Mật khẩu" type="password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ChangePassword;
