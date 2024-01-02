'use client'

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Col, Form, Input, Row, Select, Space, theme, DatePicker } from 'antd';

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

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
  
    return (
      <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item
                    name={'employeeName'}
                    label={'Tên'}
                >
                    <Input placeholder="Vui lòng nhập Tên nhân viên" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'employeeId'}
                    label={'Mã nhân viên'}
                >
                    <Input placeholder="Vui lòng nhập Mã nhân viên" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'fingerprintId'}
                    label={'ID vân tay'}
                >
                    <Input placeholder="Vui lòng nhập Id vân tay" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item
                    name={'department'}
                    label={'Phòng ban'}
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
                    name={'position'}
                    label={'Chức vụ'}
                >
                    <Input placeholder="Vui lòng nhập Chức vụ" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'resignationDate'}
                    label={'Ngày thôi việc'}
                >
                     <DatePicker placeholder='Vui lòng nhập ngày thôi việc' format={dateFormatList} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={7}>
                <Form.Item
                    name={'employeeEmail'}
                    label={'Email'}
                >
                    <Input placeholder="Vui lòng nhập mail" />
                </Form.Item>
            </Col>
            <Col span={7}>
                <Form.Item
                    name={'emloyeePhoneNumber'}
                    label={'Số điện thoại'}
                >
                    <Input placeholder="Vui lòng nhập Số điện thoại" />
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