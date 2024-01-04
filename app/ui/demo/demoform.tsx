"use client"

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';
const { Option } = Select;

const DemoForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorBgContainer,
        padding:'24px'
    };

    return (
        <Form style={formStyle} name="advanced_search">
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item
                        label="Tên hợp đồng"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Tên hợp đồng" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Mã nhân viên"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Mã nhân viên" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Nhân viên"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Select
                            placeholder="Vui lòng chọn"
                        >
                            <Option value="1">Bùi Thị Yên</Option>
                            <Option value="2">Bùi Thị Yên</Option>
                            <Option value="3">Bùi Thị Yên</Option>
                            <Option value="4">Bùi Thị Yên</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item
                        label="Phòng ban"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Select
                            placeholder="Vui lòng chọn"
                        >
                            <Option value="1">Bùi Thị Yên</Option>
                            <Option value="2">Bùi Thị Yên</Option>
                            <Option value="3">Bùi Thị Yên</Option>
                            <Option value="4">Bùi Thị Yên</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Chức vụ"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Chức vụ" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Loại hợp đồng"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Select
                            placeholder="Vui lòng chọn"
                        >
                            <Option value="1">Bùi Thị Yên</Option>
                            <Option value="2">Bùi Thị Yên</Option>
                            <Option value="3">Bùi Thị Yên</Option>
                            <Option value="4">Bùi Thị Yên</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item
                        label="Trạng thái"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Select
                            placeholder="Trạng thái"
                        >
                            <Option value="1">Bùi Thị Yên</Option>
                            <Option value="2">Bùi Thị Yên</Option>
                            <Option value="3">Bùi Thị Yên</Option>
                            <Option value="4">Bùi Thị Yên</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="end">
                <Button type='primary' >Tìm kiếm</Button>
                <Button >Tạo lại</Button>
            </Row>
        </Form>
    )
}

export default DemoForm