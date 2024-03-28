/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Col, DatePicker, Form, Input, Row, theme } from "antd";
import React from "react";

const MonthlyReportForm = ({ onChangeDate }: any) => {
  const { token } = theme.useToken();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  return (
    <Form style={formStyle} name="advanced_search">
      <Row gutter={24}>
        <Col span={7}>
          <Form.Item label="Khoảng thời gian" labelCol={{ span: 24 }}>
            <DatePicker
              format={"MM/YYYY"}
              picker="month"
              onChange={(e) => onChangeDate(e)}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Họ và tên" labelCol={{ span: 24 }}>
            <Input
              placeholder="VD: Nguyễn Văn A"
              style={{ borderRadius: "0px" }}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Mã nhân viên" labelCol={{ span: 24 }}>
            <Input placeholder="Mã nhân viên" style={{ borderRadius: "0px" }} />
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

export default MonthlyReportForm;
