'use client'

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';

const { Option } = Select;

const ShiftListForm = () => {
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
                    name={'shiftName'}
                    label={'Tên ca'}
                    labelCol={{style: {width: 120, textAlign:"left"}}}
                >
                    <Input placeholder="Vui lòng nhập Tên ca" />
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

export default ShiftListForm