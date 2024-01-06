import React, { useState } from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select } from 'antd';
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
const { Option } = Select;

interface DataType {
  key: React.Key;
  department:string;
  company: string;
  employeeNumber: number;
  timekeepingTimes: number;
  boss:string;
  secretary:string;
  superiorDepartment:string;
}



const DepartmentsListTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
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
      title: 'ID',
      dataIndex: 'id',
      width:70
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'department',
    },
    {
      title: 'Công ty',
      dataIndex: 'company',
    },
    {
      title: 'Số nhân viên',
      dataIndex: 'employeeNumber',
    },
    {
      title: 'Số lần chấm công',
      dataIndex: 'timekeepingTimes',
    },
    {
      title: 'Người quản lý',
      dataIndex: 'boss',
    },
    {
      title: 'Thư ký',
      dataIndex: 'secretary',
    },
    {
      title: 'Phòng ban cấp trên',
      dataIndex: 'superiorDepartment',
    },
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
      department:'Buồng phòng',
      company: 'CÔNG TY CỔ PHẦN QUẢN LÝ KHÁCH SẠN & DỊCH VỤ MANDALA - CHI NHÁNH HÒA BÌNH',
      employeeNumber: 31,
      timekeepingTimes: 3,
      boss:'Bùi Thị Yên',
      secretary:'Bùi Thị Yên',
      superiorDepartment:'Bếp',
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

  const closeViewDrawer = () => {
    setViewOpen(false)
    form.resetFields()
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
        <div style={{backgroundColor:'#fff', padding:'24px'}}>
            <Row justify={'space-between'} style={{marginBottom:'24px'}}>
                <span style={{textAlign:'center'}}><b>Quản lý phòng ban</b></span>
                <Col>
                    <Button type="primary"><HistoryOutlined /></Button>
                    <Button type="primary" style={{marginLeft:'12px'}}><ExportOutlined /></Button>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Thêm mới</Button>
                    <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                </Col>
            </Row>
            <Table 
            scroll={{x:1500, y:500}} 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={data} 
            pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
            />
        </div>
        <Drawer 
        title="Import phòng ban" 
        placement="right" 
        onClose={() => setImportOpen(false)} 
        open={importOpen} 
        footer= {
          <Row justify={'end'}>
              <Space>
                  <Button onClick={() => setImportOpen(false)}>Hủy</Button>
                  <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
              </Space>
          </Row>
        }>
            <Upload>
                <p>File upload</p>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Space direction='vertical'>
                <p>Template file</p>
                <Button type='primary' icon={<DownloadOutlined />}>Tải xuống template</Button>
            </Space>
        </Drawer>
        <Drawer 
            size='large' 
            title="Thêm mới" 
            placement="right" 
            onClose={closeAddDrawer} 
            open={addOpen} 
            footer= {
                <Row justify={'end'}>
                    <Space>
                        <Button onClick={() => setAddOpen(false)}>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="insertDepartment" onFinish={onFinish}>
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
                        <Button onClick={() => setViewOpen(false)}>Hủy</Button>
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

export default DepartmentsListTable;
