'use client'

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';

const { Option } = Select;

const DepartmentsListForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
  
    const formStyle: React.CSSProperties = {
      maxWidth: 'none',
      background: token.colorBgContainer,
      marginBottom:'24px',
      padding:'24px'
    };
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };
  
    return (
      <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item
                    name={'departmentName'}
                    label={'Tên phòng ban'}
                    labelCol={{style: {width: 120, textAlign:"left"}}}
                >
                    <Input placeholder="Tên phòng ban" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'departmentHead'}
                    label={'Người quản lý'}
                    labelCol={{style: {width: 120, textAlign:"left"}}}
                >
                    <Select placeholder = "Vui lòng chọn">
                        <Option value="1">Bùi Thị Yên</Option>
                        <Option value="2">Bùi Thị Yên</Option>
                        <Option value="3">Bùi Thị Yên</Option>
                        <Option value="4">Bùi Thị Yên</Option>
                        <Option value="5">Bùi Thị Yên</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'superiorDepartments'}
                    label={'Phòng ban cấp trên'}
                    labelCol={{style: {width: 140, textAlign:"left"}}}
                >
                    <Select placeholder = "Vui lòng chọn">
                        <Option value="1">Bùi Thị Yên</Option>
                        <Option value="2">Bùi Thị Yên</Option>
                        <Option value="3">Bùi Thị Yên</Option>
                        <Option value="4">Bùi Thị Yên</Option>
                        <Option value="5">Bùi Thị Yên</Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
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
}

export default DepartmentsListForm