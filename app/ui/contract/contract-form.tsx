"use client"

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Skeleton, Space, theme } from 'antd';
const { Option } = Select;

const ContractForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorBgContainer,
        padding:'24px'
    };

    const onFinish = () => {
        console.log('submit')
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <Skeleton loading={loading} active>
            <Form form={form} onFinish={onFinish} style={formStyle} name="advanced_search">
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item
                            name='tenHopDong'
                            label="Tên hợp đồng"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Input placeholder="Tên hợp đồng" style={{borderRadius:"0px"}} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name='tenNhanVien'
                            label="Tên nhân viên"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Input placeholder="Tên nhân viên" style={{borderRadius:"0px"}} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name='loaiHopDong'
                            label="Loại hợp đồng"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Select
                                placeholder="Vui lòng chọn"
                            >
                                <Option value="1">Thử việc</Option>
                                <Option value="2">Chính thức</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Button type='primary' onClick={() => form.submit()} >Tìm kiếm</Button>
                    <Button onClick={() => form.resetFields()} >Tạo lại</Button>
                </Row>
            </Form>
        </Skeleton>      
    )
}

export default ContractForm