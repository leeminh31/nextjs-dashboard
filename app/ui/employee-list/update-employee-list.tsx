import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, Skeleton, DatePicker } from 'antd';
const {Option} = Select


const UpdateEmployeeList = (props:any) => {
    const {show, close} = props
    const [form] = Form.useForm()

    const onFinish = () => {

    }

    return (
        <Drawer 
            size='large' 
            title="Sửa nhân viên" 
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
            <Form form={form} name="updateEmployee" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'employeeId'}
                        label={'Mã nhân viên'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập mã nhân viên!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Mã nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'employeeName'}
                        label={'Tên nhân viên'}
                        rules={[
                            {
                            required: true,
                            message: 'Vui lòng nhập tên nhân viên!',
                            },
                        ]}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Tên nhân viên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'position'}
                        label={'Chức vụ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Chức vụ" />
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
                        name={'fingerprintId'}
                        label={'ID vân tay'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='ID vân tay' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'mail'}
                        label={'Mail công việc'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Mail công việc' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'dateOfBirth'}
                        label={'Ngày sinh'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày sinh' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'phone'}
                        label={'Số điện thoại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Số điện thoại'/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'identityCard'}
                        label={'Căn cước công dân'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Căn cước công dân' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'dateOfIssuance'}
                        label={'Ngày cấp'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày cấp' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'hometown'}
                        label={'Quê quán'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Quê quán' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'currentAddress'}
                        label={'Nơi ở hiện tại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Nơi ở hiện tại' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'relative'}
                        label={'Người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Người thân liên hệ' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'relativePhone'}
                        label={'Số điện thoại người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số điện thoại người thân liên hệ' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'bankAccount'}
                        label={'Số tài khoản ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số tài khoản ngân hàng' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'bank'}
                        label={'Ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='text' placeholder='Ngân hàng' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default UpdateEmployeeList