import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, Skeleton, DatePicker } from 'antd';
const {Option} = Select
import { FormatDate } from '@/app/utils/formatDate';
import { HRMSystemApi } from '@/app/constant/constant';

const UpdateEmployeeList = (props:any) => {
    const {show, close, data} = props
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        const requestData = {
            maNhanVien: values.maNhanVien,
            hoTen: values.hoTen,
            chucVu: values.chucVu,
            mail: values.mail,
            ngaySinh: FormatDate(values.ngaySinh),
            soCCCD: values.soCCCD,
            ngayCap: FormatDate(values.ngayCap),
            queQuan: values.queQuan,
            noiOHienTai: values.noiOHienTai,
            nguoiThanLienHe: values.nguoiThanLienHe,
            soDienThoaiNguoiLienHe: values.soDienThoaiNguoiLienHe,
            stkNganHang: values.stkNganHang,
            nganHang: values.nganHang,
            maPhongBan: parseInt(values.maPhongBan),
            soDienThoai: values.soDienThoai,
            IDVanTay: parseInt(values.IDVanTay)
        }

        console.log(requestData)

        try {
            const response = await fetch(HRMSystemApi+'/NhanVien/update', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                            <Input placeholder="Mã nhân viên" value={data.maNhanVien} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'hoTen'}
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
                            <Input placeholder="Tên nhân viên" value={data.hoTen}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'chucVu'}
                        label={'Chức vụ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder="Chức vụ" value={data.chucVu}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'maPhongBan'}
                        label={'Phòng ban'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Select placeholder = "Vui lòng chọn" value={data.maPhongBan}>
                                <Option value="1">Bùi Thị Yên</Option>
                                <Option value="2">Bùi Thị Yên</Option>
                                <Option value="3">Bùi Thị Yên</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'IDVanTay'}
                        label={'ID vân tay'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='ID vân tay' value={data.idVanTay}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'mail'}
                        label={'Mail công việc'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Mail công việc' value={data.mail}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'ngaySinh'}
                        label={'Ngày sinh'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày sinh' value={data.ngaySinh}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soDienThoai'}
                        label={'Số điện thoại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Số điện thoại' value={data.soDienThoai}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soCCCD'}
                        label={'Căn cước công dân'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' maxLength={20} placeholder='Căn cước công dân' value={data.soCCCD}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'ngayCap'}
                        label={'Ngày cấp'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <DatePicker placeholder='Ngày cấp' value={data.ngayCap}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'queQuan'}
                        label={'Quê quán'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Quê quán' value={data.queQuan}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'noiOHienTai'}
                        label={'Nơi ở hiện tại'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Nơi ở hiện tại' value={data.noiOHienTai}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'nguoiThanLienHe'}
                        label={'Người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input placeholder='Người thân liên hệ' value={data.nguoiThanLienHe}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'soDienThoaiNguoiLienHe'}
                        label={'Số điện thoại người thân liên hệ'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số điện thoại người thân liên hệ' value={data.soDienThoaiNguoiLienHe}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'stkNganHang'}
                        label={'Số tài khoản ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='number' placeholder='Số tài khoản ngân hàng' value={data.stkNganHang}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name={'nganHang'}
                        label={'Ngân hàng'}
                        labelCol={{ span:24 }}
                        wrapperCol={{ span:24 }}
                        >
                            <Input type='text' placeholder='Ngân hàng' value={data.nganHang}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default UpdateEmployeeList