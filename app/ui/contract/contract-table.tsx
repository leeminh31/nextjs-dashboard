'use client'

import React, {useEffect, useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio, Skeleton } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEye } from '@fortawesome/free-solid-svg-icons'
import ImportContract from './import-contract';
import CreateContract from './create-contract';
import UpdateContract from './update-contract';
import ViewContract from './view-contract';
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

const ContractTable: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false);
    const [loading, setLoading] = useState(true);

    const columns: ColumnsType<DataType> = [
      {
          title: '#',
          dataIndex: 'key',
          key: 'key',
          width:50
      },
      {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
      },
      {
          title: 'Nhân viên',
          dataIndex: 'employee',
          key: 'employee',
      },
      {
          title: 'Mã nhân viên',
          dataIndex: 'employeeId',
          key: 'employeeId',
      },
      {
          title: 'Tên hợp đồng',
          dataIndex: 'contract',
          key: 'contract',
      },
      {
          title: 'Phòng ban',
          key: 'department',
          dataIndex: 'department',
      },
      {
          title: 'Chức vụ',
          key: 'role',
          dataIndex: 'role',
      },
      {
          title: 'Ngày ký',
          key: 'signDate',
          dataIndex: 'signDate',
      },
      {
          title: 'Ngày bắt đầu',
          key: 'startDate',
          dataIndex: 'startDate',
      },
      {
          title: 'Ngày kết thúc',
          key: 'endDate',
          dataIndex: 'endDate',
      },
      {
          title: 'Loại hợp đồng',
          key: 'contractType',
          dataIndex: 'contractType',
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          let color = status === 'Đang chạy' ? 'green' : 'volcano'
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
          width:100,
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

    const closeImportDrawer = () => {
      setImportOpen(false)
    }

    const closeViewDrawer = () => {
      setViewOpen(false)
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
      setLoading(false);
    }, [])

    return (
      <>  
        <Skeleton loading = {loading} active>
          <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
              <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
                  <span><b>Danh sách hợp đồng</b></span>
                  <Row>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Tạo mới</Button>
                    <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                  </Row>
              </Flex>
              <Table 
                  scroll={{ x: 1500, y:500}} 
                  rowSelection={rowSelection} 
                  columns={columns} 
                  dataSource={data}
                  pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
              />
          </div>
        </Skeleton>
        <ImportContract show={importOpen} close={() => setImportOpen(false)}/>
        <CreateContract show={addOpen} close={() => setAddOpen(false)}/>
        <UpdateContract show={updateOpen} close={() => setUpdateOpen(false)}  />
        <ViewContract show={viewOpen} close={() => setViewOpen(false)} />
      </>
    )
}

export default ContractTable;