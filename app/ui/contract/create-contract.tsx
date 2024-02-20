import { Drawer, Row, Space, Button, Form, Col, Input, Select, DatePicker, Radio, message } from "antd"
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState } from "react";
import { specialCharactersRegex } from "@/app/utils/validateInput";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import NhanVienApi from "@/app/api/nhanvien";
import { NhanVienResponse } from "@/app/models/nhanvien/nhanvien-response";
import { CreateHopDongRequest } from "@/app/models/hopdong/create-hopdong-request";
import { FormatDate } from "@/app/utils/formatDate";
import HopDongApi from "@/app/api/hopdong";

const { Option } = Select

const CreateContract = (props:any) => {
    const {show, close} = props
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState(false);
    const [data, setData] = useState<NhanVienResponse[]>([]);

    const changeSelect = (e:any) => {
      form.setFieldValue('maNhanVien',e)
    }

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

      let response = await HopDongApi.addHopDong(requestData);
        if(response.statusCode === '200'){
            // refresh()
            close()
            messageApi.open({
                type: 'success',
                content: 'Thêm mới hợp đồng thành công',
                className: 'custom-class',
                style: {
                    marginTop: '40vh',
                    fontSize:'16px'
                },
                duration: 1.5,
            });
        }
        else {
            console.log(response.message)
        }

    };

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
            title="Thêm mới hợp đồng nhân viên" 
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
            <Form form={form} name="insertContract" onFinish={onFinish}>
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
                            {
                              validator(_, value) {
                                  return specialCharactersRegex(value)
                              },
                            }
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
                            <Select placeholder = "Vui lòng chọn" onChange={(e) => changeSelect(e)}>
                                {data?.map((item) => <Option value= {item.maNhanVien}>{item.hoTen}</Option>)}
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
                            <Option value="Thử việc">Thử việc</Option>
                            <Option value="Chính thức">Chính thức</Option>
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

export default CreateContract