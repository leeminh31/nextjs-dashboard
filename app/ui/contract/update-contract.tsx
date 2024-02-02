import { Button, Row,Col, Space, Drawer,  Form, Input, Select, DatePicker, Radio } from 'antd';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
const {Option} = Select

const UpdateContract = (props:any) => {
    const {show, close} = props
    const [form] = Form.useForm();
    const [value, setValue] = useState(false);
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const closeUpdateDrawer = () => {
        form.resetFields()
    }

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Drawer 
            size='large' 
            title="Thông tin chi tiết" 
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
    )
}

export default UpdateContract