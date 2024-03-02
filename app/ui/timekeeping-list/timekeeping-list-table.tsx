'use client'

import React, {useEffect, useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  EditTwoTone,
  EyeTwoTone,
  HistoryOutlined,
  ExportOutlined,
  UploadOutlined,
  DownloadOutlined,
  LockTwoTone,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { RangePickerProps } from 'antd/es/date-picker';
import { SearchDuLieuChamCongRequest } from '@/app/models/dulieuchamcong/search-dulieuchamcong-request';
import DuLieuChamCongApi from '@/app/api/dulieuchamcong';
import CaLamViecApi from '@/app/api/calamviec';
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request';
import NhanVienApi from '@/app/api/nhanvien';
import { NhanVienResponse } from '@/app/models/nhanvien/nhanvien-response';
import { CaLamViecResponse } from '@/app/models/calamviec/calamviec-response';
import Item from 'antd/es/list/Item';
import { DuLieuChamCongResponse } from '@/app/models/dulieuchamcong/dulieuchamcong-response';
import { record } from 'zod';
import { PhongBanResponse } from '@/app/models/phongban/phongban-response';
import PhongBanApi from '@/app/api/phongban';
import { SearchPhongBanRequest } from '@/app/models/phongban/search-phongban-request';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DataType {
    key: React.Key;
    maChamCong: number;
    idVanTay: number;
    hoTen: string;
    maNhanVien:string;
    phongBan:string;
    ngayChamCong:string;
    caLam: string;
    chamLan1: Date;
    chamLan2: Date;
    chamLan3: Date;
}


//   {
//     key: '1',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '2',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '3',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Nghỉ việc'
//   },
//   {
//     key: '4',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Nghỉ việc'
//   },
//   {
//     key: '5',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '6',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '7',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '8',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '9',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '10',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '11',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '12',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
//   {
//     key: '13',
//     employee: 'Bùi Thị Yên',
//     employeeId: 'APG112233',
//     contract: 'APG112233',
//     department:'Develope',
//     role:'BA',
//     signDate: new Date(Date.now()),
//     startDate: new Date(Date.now()),
//     endDate: new Date(Date.now()),
//     contractType: 'Thử việc',
//     status: 'Đang chạy'
//   },
// ];

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

const TimekeepingListTable: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { token } = theme.useToken();
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false);
    const [timeKeeping, setTimeKeeping] = useState<DuLieuChamCongResponse[]>([]);
    const [data, setData] = useState<DataType[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [shiftList, setShiftList] = useState<CaLamViecResponse[]>();
    const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>();
    const [departmentData, setDepartmentData] = useState<PhongBanResponse[]>();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const formStyle: React.CSSProperties = {
        maxWidth: 'none',
        background: token.colorBgContainer,
        padding:'24px'
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width:50,
            render: (value, record, index) => {
                return (
                <>{(page - 1) * pageSize + index + 1}</>
                )
            }
        },
        {
            title: 'ID vân tay',
            dataIndex: 'idVanTay',
            key: 'idVanTay',
            render: (value, record, index) => {

                return (
                    <>
                        {employeeData?.find((item) => item.maNhanVien === record.maNhanVien)?.idVanTay}
                    </>
                )
            }
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (value, record, index) => {

                return (
                    <>
                        {employeeData?.find((item) => item.maNhanVien === record.maNhanVien)?.hoTen}
                    </>
                )
            }
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'maNhanVien',
            key: 'maNhanVien',
        },
        {
            title: 'Phòng ban',
            key: 'phongBan',
            dataIndex: 'phongBan',
            render: (value, record, index) => {

                return (
                    <>
                        {departmentData?.find((item) => item.maPhongBan === employeeData?.find((item) => item.maNhanVien === record.maNhanVien)?.maPhongBan)?.tenPhongBan }
                    </>
                )
            }
        },
        {
            title: 'Ngày làm việc',
            key: 'ngayChamCong',
            dataIndex: 'ngayChamCong',
            render: (value,record, index) => {
                console.log(value)
                const showValue = dayjs(value).format("DD/MM/YYYY")

                return (
                    <>
                        {showValue}
                    </>
                )
            }
        },
        {
            title: 'Ca làm',
            key: 'caLam',
            dataIndex: 'caLam',
            render: (value, record, index) => {
                return (
                    <>
                        {shiftList?.find((item) => item.maCa === employeeData?.find((item) => item.maNhanVien === record.maNhanVien)?.maCa)?.tenCa }
                    </>
                )
            }
        },
        {
            title: 'Chấm lần 1',
            key: 'chamLan1',
            dataIndex: 'chamLan1',
            render: (value, record, index) => {
                return (
                    <>
                        {timeKeeping?.filter((item) => item.lanChamCong === 1 )?.find((item) => item.maChamCong === record.maChamCong)?.gioChamCong}
                    </>
                )
            }
        },
        {
            title: 'Chấm lần 2',
            key: 'chamLan2',
            dataIndex: 'chamLan2',
            render: (value, record, index) => {
                return (
                    <>
                        {timeKeeping?.filter((item) => item.lanChamCong === 2 )?.find((item) => item.maChamCong === record.maChamCong)?.gioChamCong}
                    </>
                )
            }
        },
        {
            title: 'Chấm lần 3',
            key: 'chamLan3',
            dataIndex: 'chamLan3',
            render: (value, record, index) => {
                return (
                    <>
                        {timeKeeping?.filter((item) => item.lanChamCong === 3 )?.find((item) => item.maChamCong === record.maChamCong)?.gioChamCong}
                    </>
                )
            }
        },
    ];

    const getDepartmentsByParams = async (searchRequest :SearchPhongBanRequest) => {
        let response = await PhongBanApi.getPhongBan(searchRequest);
        if(response.statusCode === '200' ){
          setDepartmentData(response.data?.reverse())
        //   setTotalRecords(response.data?.length)
        } else if (response.statusCode === '545') {
          setDepartmentData([]);
        //   setTotalRecords(0);
        }
        else {
          console.log(response.message)
        }
      }

    const getShiftName = async () => {
        let response = await CaLamViecApi.getCaLamViec(null);
        if(response?.statusCode === '200') {
            console.log(response.data)
            setShiftList(response.data.reverse())
        } else if (response.statusCode === '545') {
            setShiftList(response.data)
        }
        else {
            console.log(response.message)
        }
    }

    const getTimeKeepingListByParams = async (searchRequest :SearchDuLieuChamCongRequest) => {
        let response = await DuLieuChamCongApi.getHopDong(searchRequest);
        if(response?.statusCode === '200') {
            console.log(response.data)
            setTimeKeeping(response.data.reverse())
            setData(response.data.reverse())
            setTotalRecords(response.data?.length)
        } else if (response?.statusCode === '545') {
            setTimeKeeping(response.data.reverse())
            setData(response.data)
            setTotalRecords(0)
        }
        else {
            console.log(response.message)
        }
    }

    const getEmployeeByParams = async (searchRequest : SearchNhanVienRequest) => {
        let response = await NhanVienApi.getNhanVien(searchRequest);
        if(response?.statusCode === '200') {
            console.log("---------------------")
            console.log(response.data)
            setEmployeeData(response.data.reverse())
        } else if (response?.statusCode === '545') {
            setEmployeeData(response.data)
        }
        else {
            console.log(response.message)
        }
    }

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

    useEffect(() => {
        getTimeKeepingListByParams({
            maNhanVien:null,
            ngayLamViec: null
        })

        getEmployeeByParams({
            hoTen: null,
            maNhanVien: null,
            idVanTay: null,
            maPhongBan: null,
            chucVu: null
        })

        getDepartmentsByParams({
            tenPhongBan:null,
            thuKyPhongBan: null,
            truongPhongBan: null
        })

        getShiftName()
    },[])

    return (
    <>  
        <Form style={formStyle} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        name="ngayChamCong"
                        label="Ngày chấm công"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <RangePicker/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="hoTen"
                        label="Tên nhân viên"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Tên nhân viên" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="maNhanVien"
                        label="Mã nhân viên"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Mã nhân viên" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        name="idVanTay"
                        label="ID vân tay"
                        labelCol={{style: {width: 120, textAlign:"left"}}}
                    >
                        <Input placeholder="Vui lòng nhập Mã vân tay" style={{borderRadius:"0px"}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="end">
                <Button type='primary' htmlType='submit' >Tìm kiếm</Button>
                <Button >Tạo lại</Button>
            </Row>
        </Form>
        <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
            <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
                <span><b>Danh sách chấm công</b></span>
            </Flex>
            <Table 
                scroll={{ x: 1200, y:350}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                
                pagination={{ showQuickJumper:true, total:totalRecords ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, 
                onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                  },
                showTotal:(total) => `Tổng ${total} bản ghi`}}  
            />
        </div>
        <Drawer 
        title="Import hợp đồng và nhân viên" 
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
            <Form form={form} name="insertDepartment" onFinish={onFinish}>
                <Row gutter={24}>
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
                            <Input placeholder="Vui lòng nhập Tên hợp đồng" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'employeeId'}
                        label={'Mã nhân viên'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Số lần chấm công" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'employee'}
                        label={'Nhân viên'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng nhập Nhân viên!',
                          },
                        ]}
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
                        name={'department'}
                        label={'Phòng ban'}
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
                        name={'position'}
                        label={'Chức vụ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'signDate'}
                        label={'Ngày ký'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <DatePicker placeholder='Vui lòng nhập Ngày ký' format={dateFormatList} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'startDate'}
                        label={'Ngày bắt đầu'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng nhập Ngày bắt đầu!',
                          },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <DatePicker placeholder='Vui lòng nhập Ngày bắt đầu' format={dateFormatList} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {
                        value ? 
                          <Form.Item
                          name={'endDate'}
                          label={'Ngày kết thúc không xác định'}
                          labelCol={{ span:24 }}
                          >
                          </Form.Item> : 
                          <Form.Item
                            name={'endDate'}
                            label={'Ngày kết thúc'}
                            rules={[
                              {
                              required: true,
                              message: 'Vui lòng nhập Ngày kết thúc!',
                              },
                            ]}
                            labelCol={{ span:24 }}
                            wrapperCol={{ span:24 }}
                            >
                            <DatePicker placeholder='Vui lòng nhập Ngày kết thúc' format={dateFormatList} />
                          </Form.Item>
                        }
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'contractType'}
                        label={'Loại hợp đồng'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng chọn!',
                          },
                        ]}
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
                        name={'salaryRate'}
                        label={'Tỷ lệ hưởng lương'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input type={'number'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'workingHours'}
                        label={'Giờ làm việc'}
                        rules={[
                          {
                          required: true,
                          message: 'Vui lòng chọn!',
                          },
                        ]}
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
                        name={'salary'}
                        label={'Tiền công, lương tháng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Input type={'number'} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'salary'}
                        label={'Hợp đồng không xác định thời hạn'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                          <Radio.Group defaultValue={false} onChange={onChange} value={value}>
                            <Radio value={true}>True</Radio>
                            <Radio value={false}>False</Radio>
                          </Radio.Group>
                        </Form.Item>
                    </Col>
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

export default TimekeepingListTable;