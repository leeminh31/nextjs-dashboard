'use client'

import React, { useEffect, useState } from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, Skeleton } from 'antd';
import 'dotenv/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {
    EditTwoTone,
    EyeTwoTone,
    HistoryOutlined,
    ExportOutlined,
    UploadOutlined,
    DownloadOutlined,
    LockTwoTone,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateEmployeeList from './create-employee-list';
import UpdateEmployeeList from './update-employee-list';
import ViewEmployeeList from './view-employee-list';
import ChangePassword from './change-password';

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
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      width:50
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employeeId',
    },
    {
      title: 'Id vân tay',
      dataIndex: 'fingerprintId',
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'employeeName',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'position',
      },
    {
        title: 'Phòng ban',
        dataIndex: 'department',
    },
    {
        title: 'Mail công việc',
        dataIndex: 'mail',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'action',
      fixed:'right',
      align:'center',
      width:200,
      render: () => {
          return (
              <Space style={{gap:'16px'}}>
                  <Button icon={<EditTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setUpdateOpen(true)}></Button>
                  <Button icon={<EyeTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setViewOpen(true)}></Button>
                  <Button icon={<LockTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setChangePasswordOpen(true)}></Button>
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
    console.log(process.env.API_URL)
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
        <UpdateEmployeeList show={updateOpen} close={() => setUpdateOpen(false)} />
        <ViewEmployeeList show={viewOpen} close={() => setViewOpen(false)} />
        <ChangePassword show={changePasswordOpen} close={() => setChangePasswordOpen(false)} />
    </>
    );
};

export default EmployeeListTable;
