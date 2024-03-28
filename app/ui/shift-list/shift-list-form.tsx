/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import React from "react";

const ShiftListForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    marginBottom: "24px",
    padding: "24px",
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={7}>
          <Form.Item name={"tenCa"} label={"Tên ca"}>
            <Input placeholder="Vui lòng nhập Tên ca" />
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
  );
};

export default ShiftListForm;
