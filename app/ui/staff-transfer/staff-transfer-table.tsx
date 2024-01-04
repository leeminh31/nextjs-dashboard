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
        title: 'Ngày tạo',
        dataIndex: 'createDate',
        key: 'createDate',
    },
    {
        title: 'Tên phiếu',
        dataIndex: 'ticketName',
        key: 'ticketName',
    },
    {
        title: 'Loại phiếu',
        dataIndex: 'ticketType',
        key: 'ticketType',
    },
    {
        title: 'Công ty hiện tại',
        key: 'currentCompany',
        dataIndex: 'currentCompany',
    },
    {
        title: 'Công ty chuyển đến',
        key: 'deliverCompany',
        dataIndex: 'deliverCompany',
    },
    {
        title: 'Nhân viên',
        key: 'employee',
        dataIndex: 'employee',
    },
    {
        title: 'Phòng ban hiện tại',
        key: 'currentDepartment',
        dataIndex: 'currentDepartment',
    },
    {
        title: 'Phòng ban chuyển đến',
        key: 'deliverDepartment',
        dataIndex: 'deliverDepartment',
    },
    {
        title: 'Ngày kết thúc làm việc công ty hiện tại',
        key: 'endDateOfCurrentCompany',
        dataIndex: 'endDateOfCurrentCompany',
    },
    {
        title: 'Ngày kết thúc làm việc công ty mới',
        key: 'endDateOfDeliverCompany',
        dataIndex: 'endDateOfDeliverCompany',
    },
    {
        title: 'Ngày duyệt',
        key: 'approvalDate',
        dataIndex: 'approvalDate',
    },
    {
        title: 'Người duyệt',
        key: 'contractType',
        dataIndex: 'contractType',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'Đã duyệt' ? 'green' : 'volcano'
        return (
          <Tag color={color} >
              {status.toUpperCase()}
          </Tag>
        )
      }
    },
    {
        title: 'Hoạt động',
        key: 'action',
        fixed:'right',
        width:150,
        align: 'center' as 'center',
        render: () => (
          <>
            <Button style={{backgroundColor:'transparent', color:'#6c8cad', border:'none'}}>
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <Button style={{backgroundColor:'transparent', color:'#6c8cad', border:'none'}}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </>
        ) 
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

const StaffTransferTable: React.FC = () => {
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
    const [ticketType, setTicketType] = useState(0)

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
                <span><b>Kiểm kê phiếu điều chuyển nhân viên</b></span>
                <Row>
                  <Button type="primary" style={{marginLeft:'12px'}}><ExportOutlined /></Button>
                  <Button type="primary" onClick={() => setAddOpen(true)}>Tạo</Button>
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Duyệt</Button>
                  <Button type="primary" style={{marginLeft:'12px'}} >Hủy</Button>
                  <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                </Row>
            </Flex>
            <Table 
                scroll={{ x: 1800, y:350}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
            />
        </div>
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
            <Form form={form} name="insertStaffTransfer" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'ticketType'}
                        label={'Loại phiếu'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng chọn Loại phiếu!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Loại phiếu" onChange={(e) => setTicketType(e) } allowClear>
                                <Option value={1}>Công ty</Option>
                                <Option value={2}>Phòng ban</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'ticketName'}
                        label={'Tên Phiếu'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Tên phiếu " />
                        </Form.Item>
                    </Col>
                    {ticketType === 1 ?
                        <>
                            <Col span={12}>
                                <Form.Item
                                name={'currentCompany'}
                                label={'Công ty hiện tại'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'employee'}
                                label={'Nhân viên'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn nhân viên">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'deliverCompany'}
                                label={'Công ty chuyển đến'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn công ty chuyển đến!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn công ty ">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'department'}
                                label={'Phòng ban'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn phòng ban!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn phòng ban ">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'endDateOfCurrentCompany'}
                                label={'Ngày kết thúc công việc công ty cũ'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng nhập Ngày kết thúc công việc công ty cũ!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày kết thúc công việc công ty cũ' format={dateFormatList} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'startDateOfNewCompany'}
                                label={'Ngày vào làm công ty mới'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn phòng ban chuyển đến!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày vào làm công ty mới' format={dateFormatList} />
                                </Form.Item>
                            </Col>
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
                                    <Input placeholder="Vui lòng nhập Tên hợp đồng " />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'contracType'}
                                label={'Loại hợp đồng'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn Loại hợp đồng!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'signDate'}
                                label={'Ngày ký hợp đồng'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn phòng ban chuyển đến!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày ký hợp đồng' format={dateFormatList} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'endContractDate'}
                                label={'Ngày kết thúc hợp đồng mới'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn phòng ban chuyển đến!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày kết thúc hợp đồng mới' format={dateFormatList} />
                                </Form.Item>
                            </Col>
                        </> :
                        <>
                            <Col span={12}>
                                <Form.Item
                                name={'currentDepartment'}
                                label={'Phòng ban hiện tại'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'employee'}
                                label={'Nhân viên'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn nhân viên">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'deliverDepartment'}
                                label={'Công ty chuyển đến'}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Vui lòng chọn phòng ban chuyển đến!',
                                    },
                                ]}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                    <Select placeholder = "Vui lòng chọn">
                                        <Option value={1}>Bùi Thị Yên</Option>
                                        <Option value={2}>Bùi Thị Yên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'startDateDeliverDepartment'}
                                label={'Ngày vào làm phòng ban mới'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày vào làm phòng mới' format={dateFormatList} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name={'endDateCurrentDepartment'}
                                label={'Ngày kết thúc công việc phòng ban cũ'}
                                labelCol={{ span:24 }}
                                wrapperCol={{ span:24 }}
                                >
                                <DatePicker placeholder='Vui lòng nhập Ngày kết thúc công việc phòng ban cũ' format={dateFormatList} />
                                </Form.Item>
                            </Col>
                        </>
                    }
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

export default StaffTransferTable;