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
      <></>
    );
}

export default DepartmentsListForm