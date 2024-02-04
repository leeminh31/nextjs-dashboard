'use client'

import React, {useEffect, useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio, Skeleton } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  EditTwoTone,
  EyeTwoTone,
  HistoryOutlined,
  ExportOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft,faArrowUpRightFromSquare, faPencil, faEye } from '@fortawesome/free-solid-svg-icons'
const { Option } = Select;

interface DataType {
  key: string;
  employee: string;
  employeeId: string;
  contract:string;
  department:string;
  role:string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  contractType: string;
  status: string;
}

const data: DataType[] = [
  {
    key: '1',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '2',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '3',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Nghỉ việc'
  },
  {
    key: '4',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Nghỉ việc'
  },
  {
    key: '5',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '6',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '7',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '8',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '9',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '10',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '11',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '12',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '13',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
];

const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

const ManageExplanationsTable: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false)

    const columns: ColumnsType<DataType> = [
      {
          title: '#',
          dataIndex: 'key',
          key: 'key',
          width:50
      },
      {
          title: 'Mã nhân viên',
          dataIndex: 'employeeId',
          key: 'employeeId',
      },
      {
          title: 'Họ và tên',
          dataIndex: 'employeeName',
          key: 'employeeName',
      },
      {
        title: 'Vị trí',
        key: 'position',
        dataIndex: 'position',
      },
      {
          title: 'Phòng ban',
          key: 'department',
          dataIndex: 'department',
      },
      
      {
          title: 'Ngày vi phạm',
          key: 'dateOfViolation',
          dataIndex: 'dateOfViolation',
      },
      {
          title: 'Loại giải trình',
          key: 'applicationType',
          dataIndex: 'applicationType',
      },
      {
          title: 'Shift from -To',
          key: 'shift',
          dataIndex: 'shift',
          children: [
            {
              title: 'From',
              dataIndex: 'fromHour',
              key: 'fromHour',
              width:100,
            },
            {
              title: 'To',
              dataIndex: 'toHour',
              key: 'toHour',
              width: 100,
            },
          ],
      },
      {
          title: 'Ca gãy',
          key: 'splitShift',
          dataIndex: 'splitShift',
      },
      {
        title: 'Chấm công thực tế',
        key: 'realTimekeeping',
        dataIndex: 'realTimekeeping',
      },
      {
        title: 'Validation data',
        key: 'validationData',
        dataIndex: 'validationData',
      },
      {
        title: 'Lý do',
        key: 'reasonDescription',
        dataIndex: 'reasonDescription',
      },
      {
        title: 'Đã duyệt',
        key: 'isApproved',
        dataIndex: 'isApproved',
      },
      {
        title: 'Người duyệt',
        key: 'approvedBy',
        dataIndex: 'approvedBy',
      },
      {
        title: 'Ghi chú',
        key: 'description',
        dataIndex: 'description',
      },
      {
        title: 'Hoạt động',
        key: 'action',
        fixed:'right',
        width:150,
        align: 'center' as 'center',
        render: () => (
          <>
            <Button 
            style={{backgroundColor:'transparent', color:'#6c8cad', border:'none'}}
            onClick={() => setUpdateOpen(true)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <Button 
            style={{backgroundColor:'transparent', color:'#6c8cad', border:'none'}}
            onClick={() => setViewOpen(true)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </>
        ) 
    },
  ];

    const closeAddDrawer = () => {
      setAddOpen(false)
      form.resetFields()
    }
  
    const closeUpdateDrawer = () => {
      setUpdateOpen(false)
      form.resetFields()
    }

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    useEffect(() => {
      setLoading(false)
    },[])

    return (
      <>  
        <Skeleton loading={loading} active>
          <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
            <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
              <span><b>Yêu cầu giải trình</b></span>
              <Row>
                <Button type="primary" style={{marginLeft:'12px'}}><ExportOutlined /></Button>
                <Button type="primary" style={{marginLeft:'12px'}} >Duyệt</Button>
                <Button type="primary" style={{marginLeft:'12px'}} >Từ chối</Button>
                <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
              </Row>
            </Flex>
              <Table 
                  scroll={{ x: 2000, y:350}} 
                  rowSelection={rowSelection} 
                  columns={columns} 
                  dataSource={data}
                  pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}}  
              />
          </div>
        </Skeleton>
        <Drawer 
            title="Sửa giải trình" 
            placement="right" 
            onClose={closeUpdateDrawer} 
            open={updateOpen} 
            footer= {
                <Row justify={'end'}>
                    <Space>
                        <Button onClick={() => setUpdateOpen(false)}>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="updateExplanations" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                        name={'approvedBy'}
                        label={'Người duyệt'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Người duyệt" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        name={'reason'}
                        label={'Lý do'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng chọn!',
                          },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn">
                                <Option value="1">Công việc</Option>
                                <Option value="2">Cá nhân</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        name={'description'}
                        label={'Ghi chú'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
        <Drawer 
            title="Thông tin chi tiết" 
            placement="right" 
            onClose={() => setViewOpen(false)} 
            open={viewOpen} 
            footer= {
                <Row justify={'end'}>
                    <Space>
                        <Button onClick={() => setViewOpen(false)}>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="viewExplanations" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                        name={'approvedBy'}
                        label={'Người duyệt'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Người duyệt" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        name={'reason'}
                        label={'Lý do'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng chọn!',
                          },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn">
                                <Option value="1">Công việc</Option>
                                <Option value="2">Cá nhân</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                        name={'description'}
                        label={'Ghi chú'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
      </>
    )
}

export default ManageExplanationsTable;