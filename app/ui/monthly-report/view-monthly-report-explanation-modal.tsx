/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useEffect } from "react";
const { Option } = Select;

const ViewMonthlyReportExplanationModal = (props: any) => {
  const [form] = useForm();
  const { data, generalData, show, close, employeeData } = props;
  useEffect(() => {
    console.log(data);
    if (data) {
      form.setFieldsValue({
        loaiGiaiTrinh: data.loaiGiaiTrinh,
        lyDo: data.lyDo,
      });
    }
  }, [show]);

  return (
    <Modal
      className="manage-request-drawer"
      closable={false}
      centered
      footer={
        <>
          <Button
            onClick={() => {
              close();
              form.resetFields();
            }}
          >
            {" "}
            Thoát{" "}
          </Button>
        </>
      }
      open={show}
      width={500}
    >
      <Form className="view-request" form={form} name="createExplanationModal">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ color: "#b98868" }}>Giải trình nhân viên</h3>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <b>Thông tin chi tiết nhân viên</b>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <span>Họ tên nhân viên: {generalData?.hoTen} </span>
            <span>
              Ngày tạo: {dayjs(data?.ngayTaoGiaiTrinh).format("DD/MM/YYYY")}
            </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <span>Mã nhân viên: {generalData?.maNhanVien} </span>
            <span>
              Ngày làm việc: {dayjs(data?.ngayLamViec).format("DD/MM/YYYY")}
            </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <span>Phòng ban: {generalData?.phong} </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <span>
              Chức vụ:{" "}
              {
                employeeData?.find(
                  (e: { maNhanVien: any }) => e.maNhanVien === data?.maNhanVien,
                )?.chucVu
              }{" "}
            </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
              marginTop: "24px",
            }}
          >
            <b>Nội dung chi tiết giải trình: </b>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <Form.Item label="Loại giải trình" name="loaiGiaiTrinh">
              <Select disabled>
                <Option value="Đi muộn">Đi muộn</Option>
                <Option value="Về sớm">Về sớm</Option>
              </Select>
            </Form.Item>
          </Space>
          <Space
            direction="vertical"
            style={{
              color: "#996B4D",
              padding: "0 16px",
              width: "100%",
            }}
          >
            <span>Lý do: </span>
            <Form.Item name="lyDo">
              <TextArea disabled style={{ width: "420px" }} rows={4} />
            </Form.Item>
          </Space>
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(ViewMonthlyReportExplanationModal);
