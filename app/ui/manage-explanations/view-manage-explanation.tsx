/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
const { Option } = Select;

const ViewManagExplanation = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();

  const onFinish = () => {};

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        maNhanVien: data.maNhanVien,
        hoTen: data.hoTen,
        chucVu: data.chucVu,
        mail: data.mail,
        ngaySinh:
          data.ngaySinh !== undefined
            ? dayjs(data.ngaySinh, "DD/MM/YYYY")
            : null,
        soCCCD: data.soCCCD,
        ngayCap:
          data.ngayCap !== undefined ? dayjs(data.ngayCap, "DD/MM/YYYY") : null,
        queQuan: data.queQuan,
        noiOHienTai: data.noiOHienTai,
        nguoiThanLienHe: data.nguoiThanLienHe,
        soDienThoaiNguoiLienHe: data.soDienThoaiNguoiLienHe,
        stkNganHang: data.stkNganHang,
        nganHang: data.nganHang,
        maPhongBan: data.maPhongBan,
        soDienThoai: data.soDienThoai,
        idVanTay: data.idVanTay,
      });
    }
  }, [data]);

  useEffect(() => {}, []);

  return (
    <Modal
      className="manage-request-drawer"
      closable={false}
      centered
      footer={
        <>
          <Button onClick={close}> Thoát </Button>
        </>
      }
      open={show}
      width={500}
    >
      <Form form={form} name="viewExplanation" onFinish={onFinish}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ color: "#b98868" }}>Giải trình nhân viên</h3>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <b>Thông tin chi tiết nhân viên</b>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Họ tên nhân viên: {data?.hoTen} </span>
            <span>Ngày tạo: {data?.ngayTaoGiaiTrinh}</span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Mã nhân viên: {data?.maNhanVien} </span>
            <span>Ngày làm việc: {data?.ngayLamViec}</span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Phòng ban: {data?.phongBan} </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Chức vụ: {data?.chucVu} </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Nội dung chi tiết giải trình</span>
          </Space>
          <Space
            style={{
              display: "flex",
              color: "#996B4D",
              padding: "8px",
            }}
          >
            <span>Loại giải trình:</span>
            <Select
              disabled
              value={data?.loaiGiaiTrinh}
              placeholder="Vui lòng chọn"
            >
              <Option value="Đi muộn">Đi muộn</Option>
              <Option value="Về sớm">Về sớm</Option>
            </Select>
          </Space>
          <Space
            direction="vertical"
            style={{
              color: "#996B4D",
              padding: "8px",
              width: "90%",
            }}
          >
            <p>Lý do: </p>
            <TextArea
              style={{ width: "100%" }}
              rows={4}
              disabled
              value={data?.lyDo}
            />
          </Space>
        </Space>
      </Form>
    </Modal>
  );
};

export default ViewManagExplanation;
