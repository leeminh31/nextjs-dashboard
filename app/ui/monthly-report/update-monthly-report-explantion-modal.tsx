/* eslint-disable @typescript-eslint/no-explicit-any */
import GiaiTrinhApi from "@/app/api/giaitrinh";
import { UpdateGiaiTrinhRequest } from "@/app/models/giaitrinh/update-giaitrinh-request";
import { Button, Form, message, Modal, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
const { Option } = Select;

const UpdateMonthlyReportExplanationModal = (props: any) => {
  const [form] = useForm();
  const { data, refresh, generalData, show, close, employeeData, ngayLamViec } =
    props;
  const [messageApi, contextHolder] = message.useMessage();
  const [requestType, setRequestType] = useState(0);

  const onUpdateExplanation = async (values: any) => {
    const ngaylamViecInsert = dayjs(ngayLamViec)
      .add(1, "day")
      .format("DD/MM/YYYY");

    const requestData: UpdateGiaiTrinhRequest = {
      maNhanVien: data?.maNhanVien,
      ngayLamViec: new Date(ngaylamViecInsert),
      ngayTaoGiaiTrinh: new Date(),
      lyDo: values.lyDo,
      nguoiDuyet: "",
      loaiGiaiTrinh: values.loaiGiaiTrinh,
      trangThai: "0",
      maGiaiTrinh: data?.maGiaiTrinh,
    };

    const response = await GiaiTrinhApi.updateGiaiTrinh(requestData);
    if (response.statusCode === "200") {
      refresh(generalData?.maNhanVien);
      close();
      messageApi.open({
        type: "success",
        content: "Cập nhật giải trình thành công",
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

    close();
  };

  useEffect(() => {
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
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {" "}
            Sửa giải trình{" "}
          </Button>
          <Button
            onClick={() => {
              close();
              form.resetFields();
              setRequestType(0);
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
      {contextHolder}
      <Form
        className="view-request"
        form={form}
        name="createExplanationModal"
        onFinish={onUpdateExplanation}
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
