/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useEffect } from "react";
const { Option } = Select;

const ViewMonthlyReportRequestModal = (props: any) => {
  const [form] = useForm();
  const { data, generalData, show, close, employeeData } = props;

  useEffect(() => {
    console.log(data);
    if (data && data.loaiDon === 1) {
      form.setFieldsValue({
        loaiDon: data.loaiDon,
        soPhutXinBu: data.soPhutXinBu,
        lyDo: data.lyDo,
      });
    }

    if (data && data.loaiDon === 2) {
      form.setFieldsValue({
        loaiDon: data.loaiDon,
        tuNgay: dayjs(data.tuNgay),
        denNgay: dayjs(data.denNgay),
        lyDo: data.lyDo,
      });
    }

    if (data && data.loaiDon === 3) {
      form.setFieldsValue({
        loaiDon: data.loaiDon,
        lyDo: data.lyDo,
      });
    }

    if (data && data.loaiDon === 4) {
      form.setFieldsValue({
        loaiDon: data.loaiDon,
        tangCaTu: dayjs(data.tangCaTu, "HH:mm:ss"),
        tangCaDen: dayjs(data.tangCaDen, "HH:mm:ss"),
        lyDo: data.lyDo,
      });
    }
  }, [show]);

  const renderManageView = (loaiDon: number) => {
    switch (loaiDon) {
      case 1:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="quyNghiBuHienCo"
                label="Quỹ nghỉ bù hiện có"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <b style={{ width: "70px", color: "#996B4D" }}>960</b>
              </Form.Item>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="soPhutXinBu"
                label="Số phút xin bù"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <Input disabled style={{ width: "70px" }} type={"number"} />
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
          </>
        );
      case 3:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="quyNghiBuHienCo"
                label="Quỹ nghỉ phép hiện có"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <Input
                  style={{ width: "70px" }}
                  type={"number"}
                  defaultValue="960"
                  disabled
                />
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
          </>
        );
      case 2:
        return (
          <>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item label="Từ ngày: " name="tuNgay">
                <DatePicker
                  disabled
                  style={{ width: "120px" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item label="Đến ngày: " name="denNgay">
                <DatePicker
                  disabled
                  style={{ width: "120px" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                />
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
          </>
        );
      case 4:
        return (
          <>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <Form.Item label="Tăng ca từ" name="tangCaTu">
                <TimePicker
                  disabled
                  style={{ width: "100px" }}
                  placeholder="Vui lòng chọn"
                />
              </Form.Item>
              <Form.Item label="đến: " name="tangCaDen">
                <TimePicker
                  disabled
                  style={{ width: "100px" }}
                  placeholder="Vui lòng chọn"
                />
              </Form.Item>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "0 16px",
              }}
            >
              <span>Quy đổi số phút: </span>
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
          </>
        );
      default:
        return null;
    }
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
            Tạo đơn{" "}
          </Button>
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
      <Form className="view-request" form={form} name="viewApplication">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ color: "#b98868" }}>Đơn nhân viên</h3>
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
              Ngày tạo: {dayjs(data?.ngayTaoDon).format("DD/MM/YYYY")}
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
            <span>Phòng ban: {generalData?.phongBan} </span>
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
            <b>Nội dung chi tiết đơn: </b>
          </Space>
          <Space
            style={{
              display: "flex",
              color: "#996B4D",
              padding: "0 16px",
            }}
          >
            <Form.Item
              labelCol={{ style: { width: 180, textAlign: "left" } }}
              label="Loại đơn"
              name="loaiDon"
            >
              <Select disabled>
                <Option value={1}>Đơn bù</Option>
                <Option value={2}>Đơn con nhỏ</Option>
                <Option value={3}>Đơn phép</Option>
                <Option value={4}>Đơn tăng ca</Option>
              </Select>
            </Form.Item>
          </Space>
          {renderManageView(data?.loaiDon)}
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(ViewMonthlyReportRequestModal);
