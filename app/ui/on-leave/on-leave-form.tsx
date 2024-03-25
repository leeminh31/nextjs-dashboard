"use client";

import { Button, Col, DatePicker, Form, Input, Row, Select, theme } from "antd";
import React from "react";
const { Option } = Select;

const OnLeaveForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  return (
    <Form style={formStyle} name="advanced_search">
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Năm"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <DatePicker picker="year" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Nhân viên"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Select placeholder="Vui lòng chọn">
              <Option value="1">Bùi Thị Yên</Option>
              <Option value="2">Bùi Thị Yên</Option>
              <Option value="3">Bùi Thị Yên</Option>
              <Option value="4">Bùi Thị Yên</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phòng ban"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Select placeholder="Vui lòng chọn">
              <Option value="1">Bùi Thị Yên</Option>
              <Option value="2">Bùi Thị Yên</Option>
              <Option value="3">Bùi Thị Yên</Option>
              <Option value="4">Bùi Thị Yên</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Mã nhân viên"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Input placeholder="Mã nhân viên" style={{ borderRadius: "0px" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Chức vụ"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Input
              placeholder="Vui lòng nhập Chức vụ"
              style={{ borderRadius: "0px" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ngày tính phép"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary">Tìm kiếm</Button>
        <Button>Tạo lại</Button>
      </Row>
    </Form>
  );
};

export default OnLeaveForm;
