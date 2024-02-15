'use client'

import React, { use, useState } from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, TimePicker, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faArrowUpRightFromSquare, faL } from '@fortawesome/free-solid-svg-icons'
import {
    EditTwoTone,
    EyeTwoTone,
    HistoryOutlined,
    ExportOutlined,
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import CreateShiftList from './create-shift-list';
import UpdateShiftList from './update-shift-list';
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



const ShiftListTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const [breakfast, setBreakfast] =  useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [nightMeal, setNightMeal] = useState(false);
  const [shiftOff, setShiftOff] = useState(false);
  const [splitShift, setSplitShift] = useState(false);
  const [nightShift, setNightShift] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'key',
      width:50
    },
    {
        title: 'Tên ca',
        dataIndex: 'tenCa',
    },
    {
      title: 'Giờ bắt đầu ca',
      dataIndex: 'gioBatDauCa',
    },
    {
      title: 'Giờ kết thúc ca',
      dataIndex: 'gioKetThucCa',
    },
    {
      title: 'Giờ bắt đầu nghỉ',
      dataIndex: 'gioBatDauNghi',
    },
    {
      title: 'Giờ kết thúc nghỉ',
      dataIndex: 'gioKetThucNghi',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      fixed:'right',
      align:'center',
      width:150,
      render: () => {
          return (
              <Space style={{gap:'16px'}}>
                  <Button icon={<EditTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setUpdateOpen(true)}></Button>
                  {/* <Button icon={<EyeTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setViewOpen(true)}></Button> */}
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

  const handleOnChangeShiftRadio = (groupIndex:number, e:any) => {
    if(e.target.value) {
        setIsDisabled(true)
    } else {
        setIsDisabled(false)
    }
    groupIndex === 1 ? setShiftOff(e.target.value) : groupIndex === 2 ? setNightShift(e.target.value) : setSplitShift(e.target.value) 
  }

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

  const onChange = (e:any) => {
    setValue(e.target.value)
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
        <div style={{backgroundColor:'#fff', padding:'24px'}}>
            <Row justify={'space-between'} style={{marginBottom:'24px'}}>
                <span style={{textAlign:'center'}}><b>Danh sách ca</b></span>
                <Col>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Tạo mới</Button>
                    <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
                </Col>
            </Row>
            <Table 
            scroll={{x:1500, y:400}} 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={data} 
            pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
            />
        </div>
        <CreateShiftList show={addOpen} close={() => setAddOpen(false)} />
        <UpdateShiftList show={updateOpen} close={() => setUpdateOpen(false)} />
    </>
  );
};

export default ShiftListTable;
