'use client'

import React, { useEffect, useState } from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {
    EditTwoTone,
    EyeTwoTone,
    HistoryOutlined,
    ExportOutlined,
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateEmployeeList from './create-employee-list';
const { Option } = Select;

interface DataType {
  key: React.Key;
  employeeId: string;
  currentEmployeeId: string;
  fingerprintId:string;
  department:string;
  employeeNumber: number;
  timekeepingTimes: number;
  boss:string;
  secretary:string;
  superiorDepartment:string;
}



const EmployeeListTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(true);
  const [importOpen, setImportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'key',
      width:50
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employeeId',
    },
    {
      title: 'Mã nhân viên hiện tại',
      dataIndex: 'currentEmployeeId',
    },
    {
      title: 'Id vân tay',
      dataIndex: 'fingerprintId',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullname',
    },
    {
    title: 'Bộ phận',
    dataIndex: 'department',
    },
    {
      title: 'Số lần chấm công',
      dataIndex: 'timekeepingTimes',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
    },
    // {
    //   title: 'Số điện thoại cá nhân',
    //   dataIndex: 'personalPhoneNumber',
    // },
    // {
    //   title: 'Số điện thoại công việc',
    //   dataIndex: 'workPhoneNumber',
    // },
    // {
    //     title: 'Giờ làm việc',
    //     dataIndex: 'workHours',
    // },
    // {
    //     title: 'Email',
    //     dataIndex: 'email',
    // },
    // {
    //     title: 'Ngày thôi việc',
    //     dataIndex: 'resignationDate',
    // },
    // {
    //     title: 'Người quản lý',
    //     dataIndex: 'boss',
    //     },
    // {
    //     title: 'Người huấn luyện',
    //     dataIndex: 'mentor',
    // },
    // {
    //     title: 'Công ty kiêm nhiệm',
    //     dataIndex: 'concurrentCompany',
    // },
    // {
    //     title: 'Phòng ban kiêm nhiệm',
    //     dataIndex: 'concurrentDepartment',
    // },
    // {
    //     title: 'Ngày hết hạn hợp đồng thử việc',
    //     dataIndex: 'probationaryExpirationDate',
    // },
    // {
    //     title: 'Tỷ lệ hưởng lương thử việc',
    //     dataIndex: 'probationarySalaryPercent',
    // },
    // {
    //     title: 'Ngày vào làm',
    //     dataIndex: 'startDate',
    // },
    // {
    //     title: 'Mã số thuế cá nhân',
    //     dataIndex: 'personalTaxId',
    // },
    // {
    //     title: 'Quản lý chung',
    //     dataIndex: 'generalManager',
    // },
    // {
    //     title: 'Trưởng bộ phận',
    //     dataIndex: 'departmentHead',
    // },
    // {
    //     title: 'Thư ký bộ phận',
    //     dataIndex: 'secretary',
    // },
    // {
    //     title: 'Nơi sinh',
    //     dataIndex: 'placeOfBirth',
    // },
    // {
    //     title: 'Ngày sinh',
    //     dataIndex: 'birthday',
    // },
    // {
    //     title: 'Giới tính',
    //     dataIndex: 'gender',
    // },
    // {
    //     title: 'Địa chỉ thường trú',
    //     dataIndex: 'permanentAddress',
    // },
    // {
    //     title: 'Quốc gia',
    //     dataIndex: 'country',
    // },
    // {
    //     title: 'Tỉnh/Thành phố',
    //     dataIndex: 'city',
    // },
    // {
    //     title: 'Quận/Huyện',
    //     dataIndex: 'province',
    // },
    // {
    //     title: 'Xã/Phường',
    //     dataIndex: 'ward',
    // },
    // {
    //     title: 'Dân tộc',
    //     dataIndex: 'ethnic',
    // },
    // {
    //     title: 'Số CMND',
    //     dataIndex: 'nationalId',
    // },
    // {
    //     title: 'Nơi cấp CMND',
    //     dataIndex: 'placeOfIssuance',
    // },
    // {
    //     title: 'Ngày cấp CMND',
    //     dataIndex: 'dateOfIssuance',
    // },
    // {
    //     title: 'Nơi ở hiện tại',
    //     dataIndex: 'currentAddress',
    // },
    // {
    //     title: 'Tình trạng hôn nhân',
    //     dataIndex: 'maritalStatus',
    // },
    // {
    //     title: 'STK ngân hàng',
    //     dataIndex: 'bankAccount',
    // },
    // {
    //     title: 'Ngân hàng',
    //     dataIndex: 'bank',
    // },
    // {
    //     title: 'Chi nhánh',
    //     dataIndex: 'branch',
    // },
    // {
    //     title: 'Số BHXH',
    //     dataIndex: 'socialInsuranceNumber',
    // },
    // {
    //     title: 'Bằng cấp cao nhất',
    //     dataIndex: 'highestDegree',
    // },
    // {
    //     title: 'Trường đào tạo',
    //     dataIndex: 'trainingSchool',
    // },
    // {
    //     title: 'Chứng chỉ',
    //     dataIndex: 'certificate',
    // },
    // {
    //     title: 'Chuyên ngành',
    //     dataIndex: 'major',
    // },
    // {
    //     title: 'Loại xe',
    //     dataIndex: 'vehicleType',
    // },
    // {
    //     title: 'Đăng ký gửi xe',
    //     dataIndex: 'parkingRegister',
    // },
    // {
    //     title: 'Biển số xe',
    //     dataIndex: 'licensePlates',
    // },
    // {
    //     title: 'Màu xe',
    //     dataIndex: 'vehicleColor',
    // },
    {
      title: 'Hoạt động',
      dataIndex: 'action',
      fixed:'right',
      align:'center',
      width:150,
      render: () => {
          return (
              <Space style={{gap:'16px'}}>
                  <Button icon={<EditTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setUpdateOpen(true)}></Button>
                  <Button icon={<EyeTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setViewOpen(true)}></Button>
              </Space>
          )
      }
    },
  ];
  
  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i+1,
      employeeId: '512',
      department:'Buồng phòng',
      currentEmployeeId:'1111',
      fingerprintId:'11111',
      employeeNumber:24,
      timekeepingTimes:111,
      boss:'kim',
      secretary:'kim',
      superiorDepartment:'sad'
    //   position:'kk'
    //   fullname:''
    //   company: 'CÔNG TY CỔ PHẦN QUẢN LÝ KHÁCH SẠN & DỊCH VỤ MANDALA - CHI NHÁNH HÒA BÌNH',
    //   employeeNumber: 31,
    //   timekeepingTimes: 3,
    //   boss:'Bùi Thị Yên',
    //   secretary:'Bùi Thị Yên',
    //   superiorDepartment:'Bếp',
    });
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const closeAddDrawer = () => {
    setAddOpen(false)
    form.resetFields()
  }

  const closeUpdateDrawer = () => {
    setUpdateOpen(false)
    form.resetFields()
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  useEffect(() => {
    setLoading(false)
  },[])

  return (
    <>
        <Skeleton loading={loading} active>
            <div style={{backgroundColor:'#fff', padding:'24px'}}>
                <Row justify={'space-between'} style={{marginBottom:'24px'}}>
                    <span style={{textAlign:'center'}}><b>Danh sách nhân viên</b></span>
                    <Col>
                        <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Thêm mới</Button>
                        <Button type="primary" style={{marginLeft:'12px'}} onClick={() => {}}>Tạo tài khoản</Button>
                        <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                    </Col>
                </Row>
                <Table 
                scroll={{x:1200, y:500}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data} 
                pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
                />
            </div>
        </Skeleton>
        <CreateEmployeeList show={addOpen} close={() => setAddOpen(false)} />
        <Drawer 
            size='large' 
            title="Thông tin chi tiết" 
            placement="right" 
            onClose={closeUpdateDrawer} 
            open={updateOpen} 
            footer= {
                <Row justify={'end'}>
                    <Space>
                        <Button>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="updateDepartment" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'departmentName'}
                        label={'Tên phòng ban'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập tên phòng ban!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Tên phòng ban" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'timekeepingTimes'}
                        label={'Số lần chấm công'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập số lần chấm công!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Số lần chấm công" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'boss'}
                        label={'Người quản lý'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
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
                    <Col span={12}>
                        <Form.Item
                        name={'secretary'}
                        label={'Thư ký'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
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
                    <Col span={12}>
                        <Form.Item
                        name={'supervisorDepartment'}
                        label={'Phòng ban cấp trên'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
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
                </Row>
            </Form>
        </Drawer>
        <Drawer 
            size='large' 
            title="Thông tin chi tiết" 
            placement="right" 
            onClose={() => setViewOpen(false)} 
            open={viewOpen} 
            footer= {
                <Row justify={'end'}>
                    <Space>
                        <Button>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="viewDepartment" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'departmentName'}
                        label={'Tên phòng ban'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập tên phòng ban!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Tên phòng ban" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'timekeepingTimes'}
                        label={'Số lần chấm công'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Số lần chấm công" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'boss'}
                        label={'Người quản lý'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" disabled={true}>
                                <Option value="1">Bùi Thị Yên</Option>
                                <Option value="2">Bùi Thị Yên</Option>
                                <Option value="3">Bùi Thị Yên</Option>
                                <Option value="4">Bùi Thị Yên</Option>
                                <Option value="5">Bùi Thị Yên</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'secretary'}
                        label={'Thư ký'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" disabled={true}>
                                <Option value="1">Bùi Thị Yên</Option>
                                <Option value="2">Bùi Thị Yên</Option>
                                <Option value="3">Bùi Thị Yên</Option>
                                <Option value="4">Bùi Thị Yên</Option>
                                <Option value="5">Bùi Thị Yên</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'supervisorDepartment'}
                        label={'Phòng ban cấp trên'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" disabled={true}>
                                <Option value="1">Bùi Thị Yên</Option>
                                <Option value="2">Bùi Thị Yên</Option>
                                <Option value="3">Bùi Thị Yên</Option>
                                <Option value="4">Bùi Thị Yên</Option>
                                <Option value="5">Bùi Thị Yên</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    </>
  );
};

export default EmployeeListTable;
