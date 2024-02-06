'use client'

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Space, theme, DatePicker, Skeleton } from 'antd';
import { HRMSystemApi } from '@/app/constant/constant';
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request'; 

const { Option } = Select;

const EmployeeListForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
  
    const formStyle: React.CSSProperties = {
      maxWidth: 'none',
      background: token.colorBgContainer,
      marginBottom:'24px',
      padding:'24px'
    };
  
    const onFinish = async (values: any) => {
      console.log('Received values of form: ', values);
      const searchData :SearchNhanVienRequest = {
        hoTen: values.hoTen,
        maNhanVien: values.maNhanVien,
        idVanTay: parseInt(values.IDVanTay),
        maPhongBan: parseInt(values.phongBan),
        chucVu: values.chucVu
      }

      getEmployeeByParams(searchData)
    };

    const getEmployeeByParams = async (searchRequest :SearchNhanVienRequest) => {
        try {
            const response = await fetch(HRMSystemApi+'/NhanVien', {
              method: "GET", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(searchRequest),
            });
        
            const result = await response.json();
            console.log("Success:", result);
          } catch (error) {
            console.error("Error:", error);
          }
    }

    const getAllDepartments = async () => {
      try {
        const response = await fetch(HRMSystemApi+'/PhongBan', {
          method: "GET", // or 'PUT'
        });
    
        const result = await response.json();
        console.log("Success:", result);
        setDepartments(result.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    useEffect(() => {
        setLoading(false);
        getEmployeeByParams({
          hoTen: null,
          maNhanVien: null,
          idVanTay: null,
          maPhongBan: null,
          chucVu: null
        });

        getAllDepartments();
    },[])
  
    return (
        <Skeleton loading = {loading} active>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item
                            name={'hoTen'}
                            label={'Tên nhân viên'}
                            labelCol={{style: {width: 100, textAlign:"left"}}}
                        >
                            <Input placeholder="Vui lòng nhập Tên nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name={'maNhanVien'}
                            label={'Mã nhân viên'}
                            labelCol={{style: {width: 100, textAlign:"left"}}}
                        >
                            <Input placeholder="Vui lòng nhập Mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name={'IDVanTay'}
                            label={'ID vân tay'}
                            labelCol={{style: {width: 100, textAlign:"left"}}}
                        >
                            <Input placeholder="Vui lòng nhập Id vân tay" type='number'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item
                            name={'phongBan'}
                            label={'Phòng ban'}
                            labelCol={{style: {width: 100, textAlign:"left"}}}
                        >
                            <Select placeholder = "Vui lòng chọn">
                              {departments?.map((item :any, index) => (
                                <Option key={index} value={item.maPhongBan}>{item.tenPhongBan}</Option>
                              ))}
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name={'chucVu'}
                            label={'Chức vụ'}
                            labelCol={{style: {width: 100, textAlign:"left"}}}
                        >
                            <Input placeholder="Vui lòng nhập Chức vụ" />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ textAlign: 'right' }}>
                <Space size="small">
                    <Button type="primary" onClick={() => form.submit()}>
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

export default EmployeeListForm