'use client'

import React, {useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio } from 'antd';
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

const columns: ColumnsType<DataType> = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        width:50
    },
    {
        title: 'Mã vân tay',
        dataIndex: 'fingerprintId',
        key: 'fingerprintId',
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
        title: 'Đơn vị/Phòng ban',
        key: 'department',
        dataIndex: 'department',
    },
    {
        title: 'Ngày vào làm',
        key: 'startWorkingDate',
        dataIndex: 'startWorkingDate',
    },
    {
        title: 'Ngày chấm công',
        key: 'timekeepingDate',
        dataIndex: 'timekeepingDate',
    },
    {
        title: 'Thứ',
        key: 'day',
        dataIndex: 'day',
    },
    {
        title: 'Công chuẩn',
        key: 'timekeepingTimes',
        dataIndex: 'timekeepingTimes',
    },
    {
        title: 'Ca',
        key: 'shift',
        dataIndex: 'shift',
    },
    {
      title: 'Chấm công lần 1',
      key: 'firstTimekeeping',
      dataIndex: 'firstTimekeeping',
    },
    {
      title: 'Chấm công lần 2',
      key: 'secondTimekeeping',
      dataIndex: 'secondTimekeeping',
    },
    {
      title: 'Chấm công lần 3',
      key: 'thirdTimekeeping',
      dataIndex: 'thirdTimekeeping',
    },
    {
      title: 'Chấm công lần 4',
      key: 'fourthTimekeeping',
      dataIndex: 'fourthTimekeeping',
    },
    {
      title: 'Chấm công lần 5',
      key: 'fifthTimekeeping',
      dataIndex: 'fifthTimekeeping',
    },
    {
      title: 'Chấm công lần cuối',
      key: 'lastTimekeeping',
      dataIndex: 'lastTimekeeping',
    },
    {
      title: 'Loại giải trình',
      key: 'typeOfExplanation',
      dataIndex: 'typeOfExplanation',
    },
    {
      title: 'Loại đơn',
      key: 'typeOfApplication',
      dataIndex: 'typeOfApplication',
    },
    {
      title: 'Thời gian đơn',
      key: 'createdTime',
      dataIndex: 'createdTime',
    },
    {
      title: 'Đi trễ',
      key: 'late',
      dataIndex: 'late',
    },
    {
      title: 'Về sớm',
      key: 'early',
      dataIndex: 'early',
    },
    {
      title: 'Thời gian nghỉ lễ',
      key: 'dayOff',
      dataIndex: 'dayOff',
    },
    {
      title: 'Tính thêm giờ',
      key: 'addHours',
      dataIndex: 'addHours',
    },
    {
      title: 'Thời gian làm việc thực tế',
      key: 'realWorkingHours',
      dataIndex: 'realWorkingHours',
    },
];

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

const OnLeaveTable: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false)

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

    return (
      <>  
        <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
            <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
                <span><b>Danh sách hợp đồng</b></span>
                <Row>
                  <Button type="primary"><HistoryOutlined /></Button>
                  <Button type="primary" style={{marginLeft:'12px'}}><ExportOutlined /></Button>
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Tạo mới</Button>
                  <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                </Row>
            </Flex>
            <Table 
                scroll={{ x: 3000, y:350}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}}  
            />
        </div>
        <Drawer 
        title="Import hợp đồng và nhân viên" 
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
        }
        >
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
                        <Button>Hủy</Button>
                        <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="insertDepartment" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'contractName'}
                        label={'Tên hợp đồng'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên hợp đồng!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Tên hợp đồng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'employeeId'}
                        label={'Mã nhân viên'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Số lần chấm công" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'employee'}
                        label={'Nhân viên'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng nhập Nhân viên!',
                          },
                        ]}
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
                        name={'department'}
                        label={'Phòng ban'}
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
                        name={'position'}
                        label={'Chức vụ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'signDate'}
                        label={'Ngày ký'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <DatePicker placeholder='Vui lòng nhập Ngày ký' format={dateFormatList} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'startDate'}
                        label={'Ngày bắt đầu'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng nhập Ngày bắt đầu!',
                          },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <DatePicker placeholder='Vui lòng nhập Ngày bắt đầu' format={dateFormatList} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {
                        value ? 
                          <Form.Item
                          name={'endDate'}
                          label={'Ngày kết thúc không xác định'}
                          labelCol={{ span:24 }}
                          >
                          </Form.Item> : 
                          <Form.Item
                            name={'endDate'}
                            label={'Ngày kết thúc'}
                            rules={[
                              {
                              required: true,
                              message: 'Vui lòng nhập Ngày kết thúc!',
                              },
                            ]}
                            labelCol={{ span:24 }}
                            wrapperCol={{ span:24 }}
                            >
                            <DatePicker placeholder='Vui lòng nhập Ngày kết thúc' format={dateFormatList} />
                          </Form.Item>
                        }
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'contractType'}
                        label={'Loại hợp đồng'}
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
                        name={'salaryRate'}
                        label={'Tỷ lệ hưởng lương'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input type={'number'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'workingHours'}
                        label={'Giờ làm việc'}
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
                        name={'salary'}
                        label={'Tiền công, lương tháng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input type={'number'} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'salary'}
                        label={'Hợp đồng không xác định thời hạn'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Radio.Group defaultValue={false} onChange={onChange} value={value}>
                            <Radio value={true}>True</Radio>
                            <Radio value={false}>False</Radio>
                          </Radio.Group>
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
    )
}

export default OnLeaveTable;