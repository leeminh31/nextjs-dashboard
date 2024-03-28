/* eslint-disable @typescript-eslint/no-explicit-any */
import GiaiTrinhApi from "@/app/api/giaitrinh";
import { CreateGiaiTrinhRequest } from "@/app/models/giaitrinh/create-giaitrinh-request";
import { Button, Form, Modal, Select, Space, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useState } from "react";
const { Option } = Select;

const UpdateMonthlyReportExplanationModal: React.FC = (props: any) => {
  const [form] = useForm();
  const { data } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [createExplanationShow, setCreateExplanationShow] = useState(false);
  const [requestType, setRequestType] = useState(0);

  const onCreateExplanation = async (values: any) => {
    const ngayLamViec = currentDate;
    ngayLamViec.setDate(ngayLamViec.getDate() + 1);

    const requestData: CreateGiaiTrinhRequest = {
      maNhanVien: data?.maNhanVien,
      ngayLamViec: new Date(ngayLamViec),
      ngayTaoGiaiTrinh: new Date(),
      lyDo: values.lyDo,
      nguoiDuyet: "",
      loaiGiaiTrinh: values.loaiGiaiTrinh,
      trangThai: "0",
    };

    const response = await GiaiTrinhApi.createGiaiTrinh(requestData);
    if (response.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Thêm mới giải trình thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      form.resetFields();
    } else {
      console.log(response.message);
    }

    setCreateExplanationShow(false);
  };

  return (
    <Modal
      className="manage-request-drawer"
      closable={false}
      centered
      footer={
        <>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {" "}
            Tạo giải trình{" "}
          </Button>
          <Button
            onClick={() => {
              setCreateExplanationShow(false);
              form.resetFields();
              setRequestType(0);
            }}
          >
            {" "}
            Thoát{" "}
          </Button>
        </>
      }
      open={createExplanationShow}
      width={500}
    >
      {contextHolder}
      <Form
        className="view-request"
        form={form}
        name="createExplanationModal"
        onFinish={onCreateExplanation}
      >
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
            <span>Họ tên nhân viên: {data?.hoTen} </span>
            <span>Ngày tạo: {dayjs(new Date()).format("DD/MM/YYYY")}</span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <span>Mã nhân viên: {data?.maNhanVien} </span>
            <span>
              Ngày làm việc: {dayjs(currentDate).format("DD/MM/YYYY")}
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
            <span>Phòng ban: {data?.phongBan} </span>
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
                employeeData?.find((e) => e.maNhanVien === data?.maNhanVien)
                  ?.chucVu
              }{" "}
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
            <Form.Item label="Loại giải trình" name="loaiGiaiTrinh">
              <Select>
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
              <TextArea style={{ width: "420px" }} rows={4} />
            </Form.Item>
          </Space>
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(UpdateMonthlyReportExplanationModal);
