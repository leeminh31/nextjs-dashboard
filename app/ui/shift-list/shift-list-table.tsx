import React, { useState } from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, TimePicker, Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import {
    EditTwoTone,
    EyeTwoTone,
    HistoryOutlined,
    ExportOutlined,
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
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

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'key',
      width:50
    },
    {
      title: 'Tên ca',
      dataIndex: 'shiftName',
    },
    {
      title: 'Công ty',
      dataIndex: 'company',
    },
    {
      title: 'Giờ bắt đầu làm việc',
      dataIndex: 'employeeNumber',
    },
    {
      title: 'Giờ kết thúc làm việc',
      dataIndex: 'timekeepingTimes',
    },
    {
      title: 'Giờ bắt đầu nghỉ',
      dataIndex: 'boss',
    },
    {
      title: 'Giờ kết thúc nghỉ',
      dataIndex: 'secretary',
    },
    {
      title: 'Tổng thời gian làm việc',
      dataIndex: 'superiorDepartment',
    },
    {
        title: 'Tổng thời gian nghỉ',
        dataIndex: 'superiorDepartment',
    },
    {
        title: 'Ca ăn',
        dataIndex: 'superiorDepartment',
    },
    {
        title: 'Ca gãy',
        dataIndex: 'superiorDepartment',
    },
    {
        title: 'Ca nghỉ',
        dataIndex: 'superiorDepartment',
    },
    {
        title: 'Mã ca nghỉ',
        dataIndex: 'superiorDepartment',
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
                  <Button icon={<EyeTwoTone />} style={{backgroundColor:'transparent', border:'none', boxShadow:'none'}} onClick={() => setViewOpen(true)}></Button>
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
                <span style={{textAlign:'center'}}><b>Quản lý phòng ban</b></span>
                <Col>
                    <Button type="primary" style={{marginLeft:'12px'}}><ExportOutlined /></Button>
                    <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setAddOpen(true)}>Thêm mới</Button>
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
        <Drawer 
        title="Import phòng ban" 
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
        }>
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
                        name={'shiftName'}
                        label={'Tên ca'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Tên ca" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'company'}
                        label={'Công ty'}
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
                        name={'startWorkingHour'}
                        label={'Thời gian bắt đầu làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endWorkingHour'}
                        label={'Thời gian kết thúc làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'startRelaxHour'}
                        label={'Thời gian bắt đầu nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endRelaxHour'}
                        label={'Thời gian kết thúc nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca nghỉ'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'splitShiff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'breakfast'}
                        label={'Ăn sáng'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'lunch'}
                        label={'Ăn trưa'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'dinner'}
                        label={'Ăn tối'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'nightMeal'}
                        label={'Ăn đêm'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'timekeeping'}
                        label={'Số lần chấm công'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Số lần chấm công" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'shiftId'}
                        label={'Mã ca nghỉ'}
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
                        name={'shiftName'}
                        label={'Tên ca'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Tên ca" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'company'}
                        label={'Công ty'}
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
                        name={'startWorkingHour'}
                        label={'Thời gian bắt đầu làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endWorkingHour'}
                        label={'Thời gian kết thúc làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'startRelaxHour'}
                        label={'Thời gian bắt đầu nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endRelaxHour'}
                        label={'Thời gian kết thúc nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca nghỉ'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'splitShiff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'breakfast'}
                        label={'Ăn sáng'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'lunch'}
                        label={'Ăn trưa'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'dinner'}
                        label={'Ăn tối'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'nightMeal'}
                        label={'Ăn đêm'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'timekeeping'}
                        label={'Số lần chấm công'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Số lần chấm công" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'shiftId'}
                        label={'Mã ca nghỉ'}
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
            onClose={closeViewDrawer} 
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
                        name={'shiftName'}
                        label={'Tên ca'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Tên ca" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'company'}
                        label={'Công ty'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" disabled>
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
                        name={'startWorkingHour'}
                        label={'Thời gian bắt đầu làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endWorkingHour'}
                        label={'Thời gian kết thúc làm'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'startRelaxHour'}
                        label={'Thời gian bắt đầu nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'endRelaxHour'}
                        label={'Thời gian kết thúc nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca nghỉ'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group disabled>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'splitShiff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value} disabled>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        name={'shiffOff'}
                        label={'Ca gãy'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group disabled>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'breakfast'}
                        label={'Ăn sáng'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group disabled>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'lunch'}
                        label={'Ăn trưa'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group onChange={onChange} value={value} disabled>
                                    <Radio value={true}>Có</Radio>
                                    <Radio value={false}>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'dinner'}
                        label={'Ăn tối'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group disabled>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                        name={'nightMeal'}
                        label={'Ăn đêm'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Tên ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Row>
                                <Radio.Group disabled>
                                    <Radio>Có</Radio>
                                    <Radio>Không</Radio>
                                </Radio.Group>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'timekeeping'}
                        label={'Số lần chấm công'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Vui lòng nhập Số lần chấm công" disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'shiftId'}
                        label={'Mã ca nghỉ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" disabled>
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
  );
};

export default ShiftListTable;
