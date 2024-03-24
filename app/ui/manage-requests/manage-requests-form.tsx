"use client";

import { Button, Col, DatePicker, Form, Input, Row, Select, theme } from "antd";
import React, { useState } from "react";
const { Option } = Select;
const { RangePicker } = DatePicker;

const ManageRequestsForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

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
            label="Mã nhân viên:"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Input
              placeholder="Vui lòng nhập Tên nhân viên"
              style={{ borderRadius: "0px" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Tên nhân viên:"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <Input
              placeholder="Tên nhân viên"
              style={{ borderRadius: "0px" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phòng ban:"
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
            label="Khoảng thời gian:"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ngày tạo đơn:"
            labelCol={{ style: { width: 120, textAlign: "left" } }}
          >
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Loại đơn"
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
            label="Trạng thái đơn"
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
      </Row>
      <Row justify="end">
        <Button type="primary">Tìm kiếm</Button>
        <Button>Tạo lại</Button>
      </Row>
    </Form>
  );
};

export default ManageRequestsForm;
