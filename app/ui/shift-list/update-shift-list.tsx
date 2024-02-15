import { Button, Row,Col, Space, Drawer, Form, Input, Select, TimePicker } from 'antd';

const UpdateShiftList = (props:any) => {
    const { show, close } = props
    const {Option} = Select
    const [form] = Form.useForm();
    const onFinish = () => {

    }

    return (
        <Drawer 
            size='large' 
            title="Chỉnh sửa" 
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
            <Form form={form} name="updateShiftList" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'tenCa'}
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
                        name={'gioBatDauCa'}
                        label={'Giờ bắt đầu ca'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Giờ bắt đầu ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'gioKetThucCa'}
                        label={'Giờ kết thúc ca'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Giờ kết thúc ca!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'gioBatDauNghi'}
                        label={'Giờ bắt đầu nghỉ'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Giờ bắt đầu nghỉ!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'gioKetThucNghi'}
                        label={'Giờ kết thúc nghỉ'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập Giờ kết thúc nghỉ!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <TimePicker style={{width:'100%', height:'40px'}} popupStyle={{width:'30%'}} use12Hours format="h:mm a" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default UpdateShiftList