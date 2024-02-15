import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, Skeleton, DatePicker } from 'antd';
const {Option} = Select

const ViewEmployeeList = (props:any) => {
    const {show, close, data} = props
    const [form] = Form.useForm()

    const onFinish = () => {

    }

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
                    </Space>
                </Row>
            }
        >
            <Form form={form} name="viewEmployee" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                        name={'maNhanVien'}
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
                            <Input placeholder="Mã nhân viên" value={data?.maNhanVien} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'tenNhanVien'}
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
                            <Input placeholder="Tên nhân viên" value={data?.hoTen} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'chucVu'}
                        label={'Chức vụ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Chức vụ" value={data?.chucVu} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'phongBan'}
                        label={'Phòng ban'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" value={data?.maPhongBan} disabled>
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
                        name={'idVanTay'}
                        label={'ID vân tay'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='ID vân tay' value={data?.idVanTay} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'mail'}
                        label={'Mail công việc'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Mail công việc' value={data?.mail} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'ngaySinh'}
                        label={'Ngày sinh'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày sinh' value={data?.ngaySinh} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soDienThoai'}
                        label={'Số điện thoại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Số điện thoại' value={data?.soDienThoai} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soCCCD'}
                        label={'Căn cước công dân'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Căn cước công dân' value={data?.soCCCD} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'ngayCap'}
                        label={'Ngày cấp'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày cấp' value={data?.ngayCap} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'queQuan'}
                        label={'Quê quán'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Quê quán' value={data?.queQuan} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'noiOHienTai'}
                        label={'Nơi ở hiện tại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Nơi ở hiện tại' value={data?.noiOHienTai} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'nguoiThanLienHe'}
                        label={'Người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Người thân liên hệ' value={data?.nguoiThanLienHe} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soDienThoaiNguoiLienHe'}
                        label={'Số điện thoại người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số điện thoại người thân liên hệ' value={data?.soDienThoaiNguoiLienHe} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'stkNganHang'}
                        label={'Số tài khoản ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số tài khoản ngân hàng' value={data?.stkNganHang} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'nganHang'}
                        label={'Ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='text' placeholder='Ngân hàng' value={data?.nganHang} disabled/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default ViewEmployeeList