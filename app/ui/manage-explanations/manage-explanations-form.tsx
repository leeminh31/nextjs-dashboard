"use client";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
const { Option } = Select;
const { RangePicker } = DatePicker;

const ManageExplanationsForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(true);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Skeleton loading={loading} active>
      <Form form={form} style={formStyle} name="advanced_search">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Tên nhân viên"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mã nhân viên"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Mã nhân viên"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Phòng ban"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input placeholder="Phòng ban" style={{ borderRadius: "0px" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label="Vị trí:"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Vui lòng nhập Mã vân tay"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Loại giải trình:"
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
              label="Lý do:"
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
              label="Người duyệt:"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <Input
                placeholder="Vui lòng nhập Người duyệt"
                style={{ borderRadius: "0px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Ngày vi phạm:"
              labelCol={{ style: { width: 120, textAlign: "left" } }}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Đã duyệt:"
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
    </Skeleton>
  );
};

export default ManageExplanationsForm;
