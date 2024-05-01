/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { LoginApi } from "../api/taikhoan";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const response = await LoginApi.login(values.username, values.password);
    if (response.data !== null) {
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 0.5,
      });
      setTimeout(() => {
        router.push("/dashboard/employee-list");
      }, 500);
    } else if (response.statusCode === "531") {
      messageApi.open({
        type: "error",
        content: response.message,
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 0.5,
      });
    } else {
      console.log(response.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="login-form"
    >
      {contextHolder}
      <h2>Đăng nhập</h2>
      <Form.Item<FieldType>
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
      >
        <Input style={{ height: "45px" }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password style={{ height: "45px" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
