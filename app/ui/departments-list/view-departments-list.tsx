import { Button, Row,Col, Space, Drawer, Form, Input, Select } from 'antd';
const {Option} = Select

const ViewDepartmentsList = (props:any) => {
    const {show,close} = props
    const [form] = Form.useForm()

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
    )
}

export default ViewDepartmentsList