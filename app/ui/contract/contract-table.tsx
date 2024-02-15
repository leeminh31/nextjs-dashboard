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
import { HopDongResponse } from '@/app/models/hopdong/hopdong-response';
const { Option } = Select;

const rowSelection: TableRowSelection<HopDongResponse> = {
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

    const columns: ColumnsType<HopDongResponse> = [
      {
          title: 'STT',
          key: 'key',
          width:50
      },
      {
          title: 'Tên hợp đồng',
          dataIndex: 'tenHopDong',
          key: 'tenHopDong',
      },
      {
          title: 'Mã nhân viên',
          dataIndex: 'maNhanVien',
          key: 'maNhanVien',
      },
      {
        title: 'Tên nhân viên',
        dataIndex: 'tenNhanVien',
        key: 'tenNhanVien',
      },
      {
          title: 'Ngày bắt đầu',
          key: 'ngayBatDau',
          dataIndex: 'ngayBatDau',
      },
      {
          title: 'Ngày kết thúc',
          key: 'ngayKetThuc',
          dataIndex: 'ngayKetThuc',
      },
      {
          title: 'Loại hợp đồng',
          key: 'loaiHopDong',
          dataIndex: 'loaiHopDong',
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
            </>
          ) 
      },
  ];

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
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Thêm mới</Button>
                  </Row>
              </Flex>
              <Table 
                  scroll={{ x: 1500, y:500}} 
                  // rowSelection={rowSelection} 
                  columns={columns} 
                  // dataSource={data}
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