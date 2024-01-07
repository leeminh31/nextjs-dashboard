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
        title: 'Ngày tính phép',
        dataIndex: 'calculationDay',
        key: 'calculationDay',
        width:150,
        align:'center'
    },
    {
        title: 'Thông tin nhân viên',
        dataIndex: 'employeeId',
        key: 'employeeId',
        children: [
          {
            title: 'Mã NS',
            dataIndex: 'employeeId',
            key: 'employeeId',
            width:100,
          },
          {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            width:100,
          },
          {
            title: 'Phòng ban',
            dataIndex: 'department',
            key: 'department',
            width:150,
          },
          {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
            width:100,
          },
          {
            title: 'Chuẩn ngày',
            dataIndex: 'standardDate',
            key: 'standardDate',
            width:100,
          },
        ],
    },
    {
        title: 'Ngày tháng',
        dataIndex: 'datetime',
        key: 'datetime',
        children: [
          {
            title: 'Ngày vào',
            dataIndex: 'startDate',
            key: 'startDate',
            width:100,
          },
          {
            title: 'Ngày ký HĐLĐ',
            dataIndex: 'signDate',
            key: 'signDate',
            width:150,
          },
          {
            title: 'Ngày hưởng phép năm',
            dataIndex: 'onLeaveYear',
            key: 'onLeaveYear',
            width:200,
          },
          {
            title: 'Ngày nghỉ việc',
            dataIndex: 'resignationDay',
            key: 'resignationDay',
            width:150,
          },
        ],
    },
    {
        title: 'Dữ liệu phép tăng theo từng tháng',
        key: 'monthlyOnLeaveData',
        dataIndex: 'monthlyOnLeaveData',
        children: [
          {
            title: 'Thâm niên tính phép (Năm)',
            dataIndex: 'yearsForOnLeave',
            key: 'yearsForOnLeave',
            width:250,
          },
          {
            title: 'Số ngày phép (ngày)',
            dataIndex: 'onLeaveDays',
            key: 'onLeaveDays',
            width:200,
          },
          {
            title: 'Phép tăng theo thâm niên',
            dataIndex: 'onLeaveIncrement',
            key: 'onLeaveIncrement',
            width:200,
          },
          {
            title: 'Phép hiếu hỉ',
            dataIndex: 'onLeaveForWedding',
            key: 'onLeaveForWedding',
            width:100,
          },
          {
            title: 'Phép năm (phút)',
            dataIndex: 'onLeaveYearByMinutes',
            key: 'onLeaveYearByMinutes',
            width:100,
          },
          {
            title: 'Phép tồn',
            dataIndex: 'onLeaveLeft',
            key: 'onLeaveLeft',
            width:100,
          },
        ],
    },
    {
        title: 'Đã dùng theo dữ liệu chấm công hàng ngày',
        key: 'onLeaveUsed',
        dataIndex: 'onLeaveUsed',
        children: [
          {
            title: 'Tháng 1',
            dataIndex: 'january',
            key: 'january',
            width:100,
          },
          {
            title: 'Tháng 2',
            dataIndex: 'february',
            key: 'february',
            width:100,
          },
          {
            title: 'Tháng 3',
            dataIndex: 'march',
            key: 'march',
            width:100,
          },
          {
            title: 'Tháng 4',
            dataIndex: 'april',
            key: 'april',
            width:100,
          },
          {
            title: 'Tháng 5',
            dataIndex: 'may',
            key: 'may',
            width:100,
          },
          {
            title: 'Tháng 6',
            dataIndex: 'june',
            key: 'june',
            width:100,
          },
          {
            title: 'Tháng 7',
            dataIndex: 'july',
            key: 'july',
            width:100,
          },
          {
            title: 'Tháng 8',
            dataIndex: 'august',
            key: 'august',
            width:100,
          },
          {
            title: 'Tháng 9',
            dataIndex: 'september',
            key: 'september',
            width:100,
          },
          {
            title: 'Tháng 10',
            dataIndex: 'october',
            key: 'october',
            width:100,
          },
          {
            title: 'Tháng 11',
            dataIndex: 'november',
            key: 'november',
            width:100,
          },
          {
            title: 'Tháng 12',
            dataIndex: 'december',
            key: 'december',
            width:100,
          },
        ],
    },
    {
        title: 'Tổng đã nghỉ (phút)',
        key: 'totalByMinutes',
        dataIndex: 'totalByMinutes',
    },
    {
        title: 'Còn lại (phút)',
        key: 'leftByMinutes',
        dataIndex: 'leftByMinutes',
    },
    {
        title: 'Còn lại (ngày)',
        key: 'leftByDays',
        dataIndex: 'leftByDays',
    },
    {
        title: 'Ghi chú',
        key: 'description',
        dataIndex: 'description',
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
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                </Row>
            </Flex>
            <Table 
                scroll={{ x: 4000, y:350}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}}  
            />
        </div>
        <Drawer 
        title="Import phép và bù" 
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
      </>
    )
}

export default OnLeaveTable;