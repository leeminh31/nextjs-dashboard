import React, { useState } from 'react';
import { Button, Table, Row,Col, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {
    EditTwoTone,
    EyeTwoTone,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  id: string;
  department:string;
  company: string;
  employeeNumber: number;
  timekeepingTimes: number;
  boss:string;
  secretary:string;
  superiorDepartment:string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
  },
  {
    title: 'ID',
    dataIndex: 'id',
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
                <EditTwoTone />
                <EyeTwoTone />
            </Space>
        )
    }
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i+1,
    id: '512',
    department:'Buồng phòng',
    company: 'CÔNG TY CỔ PHẦN QUẢN LÝ KHÁCH SẠN & DỊCH VỤ MANDALA - CHI NHÁNH HÒA BÌNH',
    employeeNumber: 31,
    timekeepingTimes: 3,
    boss:'Bùi Thị Yên',
    secretary:'Bùi Thị Yên',
    superiorDepartment:'Bếp',
  });
}

const DepartmentsListTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div style={{backgroundColor:'#fff', padding:'24px'}}>
        <Row justify={'space-between'} style={{marginBottom:'24px'}}>
            <span style={{textAlign:'center'}}><b>Quản lý phòng ban</b></span>
            <Col>
                <Button type="primary"><FontAwesomeIcon icon={faClockRotateLeft} /></Button>
                <Button type="primary" style={{marginLeft:'12px'}}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Button>
                <Button type="primary" style={{marginLeft:'12px'}}>Import</Button>
                <Button type="primary" style={{marginLeft:'12px'}}>Thêm mới</Button>
                <Button type="primary" style={{marginLeft:'12px'}}>Xóa</Button>
            </Col>
        </Row>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default DepartmentsListTable;
