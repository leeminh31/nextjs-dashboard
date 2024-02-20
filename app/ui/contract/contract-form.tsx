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
        <></>
    )
}

export default ContractForm