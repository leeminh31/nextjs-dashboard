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
import HopDongApi from '@/app/api/hopdong';
import NhanVienApi from '@/app/api/nhanvien';
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request';
import { NhanVienResponse } from '@/app/models/nhanvien/nhanvien-response';
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
    const { token } = theme.useToken();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contractData, setContractData] = useState<HopDongResponse[]>([]);
    const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
    const [idList, setIdList] = useState<string[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const columns: ColumnsType<HopDongResponse> = [
      {
          title: 'STT',
          key: 'key',
          width:50,
          render: (value, record, index) => {
            return (
            <>{(page - 1) * pageSize + index + 1}</>
            )
          }
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
        dataIndex: 'hoTen',
        key: 'hoTen',
        render: (value, record) => {
          return (
              <>{employeeData.find((element) => element.maNhanVien === record.maNhanVien)?.hoTen}</>
          )
          }
      },
      {
          title: 'Ngày bắt đầu',
          key: 'ngayBatDauHopDong',
          dataIndex: 'ngayBatDauHopDong',
      },
      {
          title: 'Ngày kết thúc',
          key: 'ngayKetThucHopDong',
          dataIndex: 'ngayKetThucHopDong',
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

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorBgContainer,
    padding:'24px'
};

  const getEmployeeByParams = async (searchRequest :SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if(response.statusCode === '200') {
      setEmployeeData(response.data.reverse())
    } else if (response.statusCode === '545') {
      setEmployeeData(response.data)
    }
    else {
    console.log(response.message)
    }
  }

  const getContractByParams = async (tenHopDong: string | null, loaiHopDong:string | null) => {
    let tenHopDongParam = null
    if (tenHopDong !== '')
      tenHopDongParam = tenHopDong
    let response = await HopDongApi.getHopDong(tenHopDongParam, loaiHopDong);
    if(response.statusCode === '200') {
      setContractData(response.data.reverse())
    } else if (response.statusCode === '545') {
      setContractData(response.data)
      // setTotalRecords(0)
    }
    else {
      console.log(response.message)
    }
  }

  const getEmployeeIdByName = async (hoTen: string ) => {
    let response = await NhanVienApi.getAllEmployeeIdByName(hoTen);
    if(response.statusCode === '200') {
      console.log(response.data)
      setIdList(response.data.reverse())
    } else if (response.statusCode === '545') {
      setIdList(response.data)
      // setTotalRecords(0)
    }
    else {
      console.log(response.message)
    }
  }

  const onFinish = async (values: any) => {
    await getContractByParams(values.tenHopDong, values.loaiHopDong)
    if(values.hoTen !== '' && values.hoTen !== undefined ) {
      getEmployeeIdByName(values.hoTen)
      // console.log(idList)
      // let newResult = contractData.filter((item) => idList.includes(item.maNhanVien))
      // console.log(newResult)
      // setContractData(newResult)
      // return
    }
  }

  useEffect(() => {
    if( idList != []) {
      let newResult = contractData.filter((item) => idList.includes(item.maNhanVien))
      console.log(newResult)
      setContractData(newResult)
    }
  }, [idList])

    useEffect(() => {
      setLoading(false);
      getContractByParams(null,null)
      getEmployeeByParams({
        hoTen: null,
        maNhanVien: null,
        idVanTay: null,
        maPhongBan: null,
        chucVu: null
        })
    }, [])

    return (
      <>
      <Skeleton loading={loading} active>
            <Form form={form} onFinish={onFinish} style={formStyle} name="advanced_search">
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item
                            name='tenHopDong'
                            label="Tên hợp đồng"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Input placeholder="Tên hợp đồng" style={{borderRadius:"0px"}} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name='hoTen'
                            label="Tên nhân viên"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Input placeholder="Tên nhân viên" style={{borderRadius:"0px"}} />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            name='loaiHopDong'
                            label="Loại hợp đồng"
                            labelCol={{style: {width: 120, textAlign:"left"}}}
                        >
                            <Select
                                placeholder="Vui lòng chọn"
                            >
                                <Option value="Thử việc">Thử việc</Option>
                                <Option value="Chính thức">Chính thức</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end">
                    <Button type='primary' onClick={() => form.submit()} >Tìm kiếm</Button>
                    <Button onClick={() => form.resetFields()} >Tạo lại</Button>
                </Row>
            </Form>
        </Skeleton>     
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
                  dataSource={contractData}
                  pagination={{ 
                    showQuickJumper:true, 
                    total:50 ,
                    defaultPageSize: 10, 
                    showSizeChanger: true, 
                    pageSizeOptions: ['10', '20', '30'], 
                    locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' },
                    onChange: (page, pageSize) => {
                      setPage(page);
                      setPageSize(pageSize);
                    }, 
                    showTotal:(total) => `Tổng ${total} bản ghi`}} 
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