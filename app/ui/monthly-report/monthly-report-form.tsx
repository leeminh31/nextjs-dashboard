"use client"

import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, theme } from 'antd';
const { Option } = Select;

const MonthlyReportForm = ({onChangeDate}:any) => {
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
                        label="Khoảng thời gian"
                        labelCol={{span:24}}
                    >
                        <DatePicker format={'MM/YYYY'} picker='month' onChange={(e) =>onChangeDate(e)}/>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Họ và tên"
                        labelCol={{span:24}}
                    >
                        <Input placeholder="VD: Nguyễn Văn A" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label="Mã nhân viên"
                        labelCol={{span:24}}
                    >
                        <Input placeholder="Mã nhân viên" style={{borderRadius:"0px"}} />
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

export default MonthlyReportForm