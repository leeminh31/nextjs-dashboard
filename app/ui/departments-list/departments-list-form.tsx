'use client'

import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme, Skeleton } from 'antd';

const { Option } = Select;

const DepartmentsListForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [loading, setLoading] =useState(true);
  
    const formStyle: React.CSSProperties = {
      maxWidth: 'none',
      background: token.colorBgContainer,
      marginBottom:'24px',
      padding:'24px'
    };
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    useEffect(() => {
      setLoading(false)
    }, [])
  
    return (
      <Skeleton loading = {loading} active>
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item
                    name={'tenPhongBan'}
                    label={'Tên phòng ban'}
                    labelCol={{style: {width: 120, textAlign:"left"}}}
                >
                    <Input placeholder="Tên phòng ban" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'truongPhongBan'}
                    label={'Trưởng phòng ban'}
                    labelCol={{style: {width: 120, textAlign:"left"}}}
                >
                    <Input placeholder="Trưởng phòng ban" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'thuKyPhongBan'}
                    label={'Thư ký phòng ban'}
                    labelCol={{style: {width: 140, textAlign:"left"}}}
                >
                    <Input placeholder="Thư ký phòng ban" />
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
      </Skeleton>
    );
}

export default DepartmentsListForm