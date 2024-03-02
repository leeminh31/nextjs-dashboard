import { Button, Row,Col, Space, Drawer,  Form, Input, Select, DatePicker, Radio, message } from 'antd';
import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import NhanVienApi from '@/app/api/nhanvien';
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request';
import { NhanVienResponse } from '@/app/models/nhanvien/nhanvien-response';
import HopDongApi from '@/app/api/hopdong';
import { FormatDate } from '@/app/utils/formatDate';
import { UpdateHopDongRequest } from '@/app/models/hopdong/update-hopdong-request';
import dayjs from 'dayjs';
import { monthDiff } from '@/app/utils/validateInput';
const {Option} = Select

const UpdateContract = (props:any) => {
  const [messageApi, contextHolder] = message.useMessage();
    const {show, close, refresh, data} = props
    const [form] = Form.useForm();
    const [value, setValue] = useState(false);
    const [employeeData, setEmployeeData] = useState<NhanVienResponse[]>([]);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

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

    const closeUpdateDrawer = () => {
        form.resetFields()
    }

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

    const onFinish = async (values: any) => {
      let dateStart = new Date(values.ngayBatDauHopDong);
      let dateEnd = new Date(values.ngayKetThucHopDong);
      console.log("Ket Thuc",FormatDate(values.ngayKetThucHopDong))
      
      if(dateStart.getTime() >= dateEnd.getTime() ) {
        messageApi.open({
            type: 'error',
            content: 'Ngày kết thúc bắt buộc lớn hơn ngày bắt đầu',
            className: 'custom-class',
            style: {
                fontSize:'16px'
            },
            duration: 1.5,
        });
        return
      }

      if(values.loaiHopDong === "Thử việc" && monthDiff(dateStart, dateEnd) > 3) {
        messageApi.open({
          type: 'error',
          content: 'Không được phép nhập khoảng thời gian lớn hơn 3 tháng',
          className: 'custom-class',
          style: {
              fontSize:'16px'
          },
          duration: 1.5,
        });
        return
      }

      if(values.loaiHopDong === "Chính thức" && monthDiff(dateStart, dateEnd) >12) {
        messageApi.open({
          type: 'error',
          content: 'Không được phép nhập khoảng thời gian lớn hơn 12 tháng.',
          className: 'custom-class',
          style: {
              fontSize:'16px'
          },
          duration: 1.5,
        });
        return
      }

      const requestData : UpdateHopDongRequest = {
        tenHopDong: values.tenHopDong ,
        maNhanVien: values.maNhanVien ,
        ngayBatDauHopDong: FormatDate(values.ngayBatDauHopDong) ,
        ngayKetThucHopDong: FormatDate(values.ngayKetThucHopDong) ,
        loaiHopDong: values.loaiHopDong ,
        tiLeHuongLuong: values.tyLeHuongLuong ,
        gioLamViec: values.gioLamViec,
        congChuan: values.congChuan ,
      }

      let response = await HopDongApi.updateHopDong(requestData);
        if(response.statusCode === '200'){
            refresh()
            close()
            messageApi.open({
                type: 'success',
                content: 'Cập nhật hợp đồng thành công',
                className: 'custom-class',
                style: {
  
                    fontSize:'16px'
                },
                duration: 1.5,
            });
        }
        else if (response.statusCode === '551') {
          messageApi.open({
            type: 'error',
            content: response.message,
            className: 'custom-class',
            style: {
                fontSize:'16px'
            },
            duration: 1.5,
        });
        }
        else {
          console.log(response.message)
        }
    };
  
    useEffect(() => {
      if(show)
        form.setFieldsValue({
          tenHopDong: data.tenHopDong ,
          maNhanVien: data.maNhanVien ,
          ngayBatDauHopDong: dayjs(data.ngayBatDauHopDong, "DD/MM/YYYY") ,
          ngayKetThucHopDong: dayjs(data.ngayKetThucHopDong, "DD/MM/YYYY") ,
          loaiHopDong: data.loaiHopDong ,
          tyLeHuongLuong: data.tiLeHuongLuong ,
          gioLamViec: data.gioLamViec ,
          congChuan: data.congChuan ,
          tenNhanVien: employeeData.find((item) => item.maNhanVien === data.maNhanVien)?.hoTen,
        })
    },[show])

  useEffect(() => {
    if(data != null) {
      console.log(data)
        form.setFieldsValue({
          tenHopDong: data.tenHopDong ,
          maNhanVien: data.maNhanVien ,
          ngayBatDauHopDong: dayjs(data.ngayBatDauHopDong, "DD/MM/YYYY") ,
          ngayKetThucHopDong: dayjs(data.ngayKetThucHopDong, "DD/MM/YYYY") ,
          loaiHopDong: data.loaiHopDong ,
          tyLeHuongLuong: data.tiLeHuongLuong ,
          gioLamViec: data.gioLamViec ,
          congChuan: data.congChuan ,
          tenNhanVien: employeeData.find((item) => item.maNhanVien === data.maNhanVien)?.hoTen,
        })
    }
  },[data])

    useEffect(() => {
      getEmployeeByParams({
        hoTen: null,
        maNhanVien: null,
        idVanTay: null,
        maPhongBan: null,
        chucVu: null
        })
    },[])

    return (
      <Drawer 
      size='large' 
      title="Cập nhật hợp đồng nhân viên" 
      placement="right" 
      onClose={close} 
      open={show} 
      footer= {
          <Row justify={'end'}>
              <Space>
                  <Button onClick={close}>Hủy</Button>
                  <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
              </Space>
          </Row>
      }
  >
    {contextHolder}
      <Form form={form} name="updateContract" onFinish={onFinish}>
          <Row gutter={24}>
              <Col span={12}>
                  <Form.Item
                  name={'tenHopDong'}
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
                      <Input placeholder="Vui lòng nhập Tên hợp đồng" disabled />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'maNhanVien'}
                  label={'Mã nhân viên'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                      <Input placeholder="Mã nhân viên" disabled/>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'tenNhanVien'}
                  label={'Tên Nhân viên'}
                  rules={[
                    {
                    required: true,
                    message: 'Vui lòng chọn',
                    },
                  ]}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                      <Select placeholder = "Vui lòng chọn" disabled>
                        {employeeData?.map((item, index) => <Option key={index} value= {item.maNhanVien}>{item.hoTen}</Option>)}
                      </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'loaiHopDong'}
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
                    <Select showSearch optionFilterProp="value" placeholder = "Vui lòng chọn" disabled>
                      <Option value="Thử việc">Thử việc</Option>
                      <Option value="Chính thức">Chính thức</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'ngayBatDauHopDong'}
                  label={'Ngày bắt đầu'}
                  rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    },
                  ]}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                    <DatePicker placeholder='Vui lòng nhập Ngày bắt đầu' format={dateFormatList[0]} />
                  </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'ngayKetThucHopDong'}
                  label={'Ngày kết thúc'}
                  rules={[
                    {
                    required: true,
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    },
                  ]}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                  <DatePicker placeholder='Vui lòng nhập Ngày kết thúc' format={dateFormatList[0]} />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                  <Form.Item
                  name={'tyLeHuongLuong'}
                  label={'Tỷ lệ hưởng lương'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin',
                    },
                    {
                      validator(_, value) {
                          if(value !== null && value !== undefined && value !== "")
                            if(value > 100) 
                              return Promise.reject("Tỷ lệ hưởng lương không được phép lớn hơn 100")
                          return Promise.resolve()
                      },
                    }
                  ]}
                  >
                    <Input type={'number'}/>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'gioLamViec'}
                  label={'Giờ làm việc'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đầy đủ thông tin',
                    },
                  ]}
                  >
                    <Input type={'number'} />
                  </Form.Item>
              </Col>
          </Row>
      </Form>
      </Drawer>
    )
}

export default UpdateContract