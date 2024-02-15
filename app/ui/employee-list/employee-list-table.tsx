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
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request';
import { HRMSystemApi } from '@/app/constant/constant';
import { UpdateNhanVienRequest } from '@/app/models/nhanvien/update-nhanvien-request';
import NhanVienApi from '@/app/api/nhanvien';

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
  const [addOpen, setAddOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState();
  const [updateData, setUpdateData] = useState<UpdateNhanVienRequest>();

  const getEmployeeById = async (maNhanVien:string) => {
    try {
        const response = await fetch(HRMSystemApi+`/NhanVien/${maNhanVien}`, {
          method: "GET", // or 'PUT'
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify(searchRequest),
        });
    
        const result = await response.json();
        setUpdateData(result.data);
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
  }

  const onUpdate = (maNhanVien:any) => {
    setUpdateOpen(true);
    getEmployeeById(maNhanVien);
  }

  const onView = (maNhanVien:any) => {
    setViewOpen(true);
    getEmployeeById(maNhanVien);
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      width:50
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'maNhanVien',
    },
    {
      title: 'Id vân tay',
      dataIndex: 'idVanTay',
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'hoTen',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'chucVu',
      },
    {
        title: 'Phòng ban',
        dataIndex: 'phongBan',
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
      render: (record) => {
          return (
              <Space style={{gap:'16px'}}>
                  <Button icon={<EditTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => onUpdate(record.maNhanVien)}></Button>
                  <Button icon={<EyeTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => onView(record.maNhanVien)}></Button>
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

  const getEmployeeByParams = async (searchRequest :SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null
    });

    console.log(response.data)
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

  useEffect(() => {
    setLoading(false)
    getEmployeeByParams()
    // getAllDepartments();
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
      <UpdateEmployeeList data={updateData} show={updateOpen} close={() => setUpdateOpen(false)} />
      <ViewEmployeeList data={updateData} show={viewOpen} close={() => setViewOpen(false)} />
      <ChangePassword show={changePasswordOpen} close={() => setChangePasswordOpen(false)} />
    </>
    );
};

export default EmployeeListTable;


