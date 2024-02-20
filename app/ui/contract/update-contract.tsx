import { Button, Row,Col, Space, Drawer,  Form, Input, Select, DatePicker, Radio, message } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import NhanVienApi from '@/app/api/nhanvien';
import { SearchNhanVienRequest } from '@/app/models/nhanvien/search-nhanvien-request';
import { NhanVienResponse } from '@/app/models/nhanvien/nhanvien-response';
import HopDongApi from '@/app/api/hopdong';
import { FormatDate } from '@/app/utils/formatDate';
import { CreateHopDongRequest } from '@/app/models/hopdong/create-hopdong-request';
const {Option} = Select

const UpdateContract = (props:any) => {
  const [messageApi, contextHolder] = message.useMessage();
    const {show, close} = props
    const [form] = Form.useForm();
    const [value, setValue] = useState(false);
    const [data, setData] = useState<NhanVienResponse[]>([]);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const getEmployeeByParams = async (searchRequest :SearchNhanVienRequest) => {
      let response = await NhanVienApi.getNhanVien(searchRequest);
      if(response.statusCode === '200') {
          setData(response.data.reverse())
      } else if (response.statusCode === '545') {
          setData(response.data)
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
      const requestData : CreateHopDongRequest = {
        tenHopDong: values.tenHopDong ,
        maNhanVien: values.maNhanVien ,
        ngayBatDauHopDong: FormatDate(values.ngayBatDau) ,
        ngayKetThucHopDong: FormatDate(values.ngayKetThuc) ,
        loaiHopDong: values.loaiHopDong ,
        tiLeHuongLuong: values.tyLeHuongLuong ,
        gioLamViec: values.gioLamViec,
        congChuan: values.congChuan ,
      }

      let response = await HopDongApi.updateHopDong(requestData);
        if(response.statusCode === '200'){
            // refresh()
            close()
            messageApi.open({
                type: 'success',
                content: 'Cập nhật hợp đồng thành công',
                className: 'custom-class',
                style: {
                    marginTop: '40vh',
                    fontSize:'16px'
                },
                duration: 1.5,
            });
        }
        else {
          messageApi.open({
            type: 'error',
            content: 'Cập nhật hợp đồng thất bại',
            className: 'custom-class',
            style: {
                marginTop: '40vh',
                fontSize:'16px'
            },
            duration: 1.5,
        });
            console.log(response.message)
        }
    };

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
                      <Input placeholder="Vui lòng nhập Tên hợp đồng" />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'maNhanVien'}
                  label={'Mã nhân viên'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                      <Input placeholder="Số lần chấm công" />
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
                  name={'ngayBatDau'}
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
                <Form.Item
                  name={'ngayKetThuc'}
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
                    <Select placeholder = "Vui lòng chọn">
                      <Option value="1">Thử việc</Option>
                      <Option value="2">Chính thức</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'tyLeHuongLuong'}
                  label={'Tỷ lệ hưởng lương'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
                  >
                    <Input type={'number'}/>
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'gioLamViec'}
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
                    <Input type={'number'} />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item
                  name={'congChuan'}
                  label={'Công chuẩn'}
                  labelCol={{ span:24 }}
                  wrapperCol={{ span:24 }}
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