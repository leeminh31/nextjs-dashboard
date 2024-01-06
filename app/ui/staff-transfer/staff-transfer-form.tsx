"use client"

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme, DatePicker } from 'antd';
const { Option } = Select;

const StaffTransferForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

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
                        label="Tên phiếu"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
                    >
                        <Input placeholder="Tên phiếu" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Loại phiếu"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
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
                        label="Ngày tạo"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
                    >
                        <DatePicker placeholder='Ngày tạo' format={dateFormatList} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={7}>
                    <Form.Item
                        label="Ngày duyệt"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
                    >
                        <DatePicker placeholder='Ngày duyệt' format={dateFormatList} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Nhân viên"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
                    >
                        <Input placeholder="Nhân viên" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Trạng thái"
                        labelCol={{style: {width: 80, textAlign:"left"}}}
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

export default StaffTransferForm