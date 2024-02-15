import React, { useEffect, useState } from 'react';
import { Button, Table, Row,Col, Space, Form, Select, Skeleton } from 'antd';
import {
    EditTwoTone,
    EyeTwoTone,
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateDepartmentsList from './create-departments-list';
import UpdateDepartmentsList from './update-departments-list';
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
  const [loading, setLoading] = useState(true);
  const [importOpen, setImportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
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
      title: 'Tên phòng ban',
      dataIndex: 'tenPhongBan',
    },
    {
      title: 'Số lần chấm công',
      dataIndex: 'timekeepingTimes',
    },
    {
      title: 'Trưởng phòng ban',
      dataIndex: 'boss',
    },
    {
      title: 'Thư ký',
      dataIndex: 'secretary',
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

  useEffect(() => {
    setLoading(false)
  },[])

  return (
    <>
        <Skeleton loading={loading} active>
            <div style={{backgroundColor:'#fff', padding:'24px'}}>
                <Row justify={'space-between'} style={{marginBottom:'24px'}}>
                    <span style={{textAlign:'center'}}><b>Quản lý phòng ban</b></span>
                    <Col>
                        <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Tạo mới</Button>
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
        </Skeleton>
        <CreateDepartmentsList show={addOpen} close={() => setAddOpen(false)} />
        <UpdateDepartmentsList show={updateOpen} close={() => setUpdateOpen(false)} />
    </>
  );
};

export default DepartmentsListTable;
