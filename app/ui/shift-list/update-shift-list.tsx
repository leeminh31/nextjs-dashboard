/* eslint-disable @typescript-eslint/no-explicit-any */
import CaLamViecApi from "@/app/api/calamviec";
import { UpdateCaLamViecRequest } from "@/app/models/calamviec/update-calamviec-request";
import { specialCharactersRegex } from "@/app/utils/validateInput";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Space,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const UpdateShiftList = (props: any) => {
  const { refresh, show, close, data } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (dayjs(values.gioBatDauCa) >= dayjs(values.gioKetThucCa)) {
      messageApi.open({
        type: "error",
        content: "Giờ kết thúc ca không được nhỏ hơn giờ bắt đầu ca",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (dayjs(values.gioKetThucNghi) <= dayjs(values.gioBatDauNghi)) {
      messageApi.open({
        type: "error",
        content: "Giờ kết thúc nghỉ phải lớn hơn giờ bắt đầu nghỉ",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (
      dayjs(values.gioKetThucCa) < dayjs(values.gioBatDauNghi) ||
      dayjs(values.gioBatDauCa) > dayjs(values.gioBatDauNghi)
    ) {
      messageApi.open({
        type: "error",
        content: "Giờ bắt đầu nghỉ phải nằm trong khoảng thời gian của ca",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    if (
      dayjs(values.gioKetThucCa) < dayjs(values.gioKetThucNghi) ||
      dayjs(values.gioBatDauCa) > dayjs(values.gioKetThucNghi)
    ) {
      messageApi.open({
        type: "error",
        content: "Giờ kết thúc nghỉ phải nằm trong khoảng thời gian của ca",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
      return;
    }

    const requestData: UpdateCaLamViecRequest = {
      maCa: values.maCa,
      tenCa: values.tenCa,
      gioBatDauCa: dayjs(values.gioBatDauCa).format("HH:mm:00"),
      gioKetThucCa: dayjs(values.gioKetThucCa).format("HH:mm:00"),
      gioBatDauNghi: dayjs(values.gioBatDauNghi).format("HH:mm:00"),
      gioKetThucNghi: dayjs(values.gioKetThucNghi).format("HH:mm:00"),
    };

    const response = await CaLamViecApi.updateCaLamViec(requestData);
    if (response?.statusCode === "200") {
      refresh();
      close();
      messageApi.open({
        type: "success",
        content: "Chỉnh sửa ca làm việc thành công",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else if (response.statusCode === "551") {
      messageApi.open({
        type: "error",
        content: response.message,
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật ca làm việc thất bại",
        className: "custom-class",
        style: {
          fontSize: "16px",
        },
        duration: 1.5,
      });
    }
  };

  useEffect(() => {
    if (show)
      form.setFieldsValue({
        maCa: data.maCa,
        tenCa: data.tenCa,
        gioBatDauCa: dayjs(data.gioBatDauCa, "HH:mm"),
        gioKetThucCa: dayjs(data.gioKetThucCa, "HH:mm"),
        gioBatDauNghi: dayjs(data.gioBatDauNghi, "HH:mm"),
        gioKetThucNghi: dayjs(data.gioKetThucNghi, "HH:mm"),
      });
  }, [show]);

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        maCa: data.maCa,
        tenCa: data.tenCa,
        gioBatDauCa: dayjs(data.gioBatDauCa, "HH:mm"),
        gioKetThucCa: dayjs(data.gioKetThucCa, "HH:mm"),
        gioBatDauNghi: dayjs(data.gioBatDauNghi, "HH:mm"),
        gioKetThucNghi: dayjs(data.gioKetThucNghi, "HH:mm"),
      });
    }
  }, [data]);

  return (
    <Drawer
      size="large"
      title="Chỉnh sửa"
      placement="right"
      onClose={close}
      open={show}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={close}>Hủy</Button>
            <Button onClick={() => form.submit()} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      }
    >
      {contextHolder}
      <Form form={form} name="updateShiftList" onFinish={onFinish}>
        <Row gutter={24}>
          <Form.Item
            name={"maCa"}
            label={"maCa"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ display: "none" }}
          >
            <Input />
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name={"tenCa"}
              label={"Tên ca"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tên ca!",
                },
                {
                  validator(_, value) {
                    return specialCharactersRegex(value);
                  },
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Vui lòng nhập Tên ca" />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
          <Col span={12}>
            <Form.Item
              name={"gioBatDauCa"}
              label={"Giờ bắt đầu ca"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Giờ bắt đầu ca!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TimePicker
                style={{ width: "100%", height: "40px" }}
                placeholder="Vui lòng chọn"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"gioKetThucCa"}
              label={"Giờ kết thúc ca"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Giờ kết thúc ca!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TimePicker
                style={{ width: "100%", height: "40px" }}
                placeholder="Vui lòng chọn"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"gioBatDauNghi"}
              label={"Giờ bắt đầu nghỉ"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Giờ bắt đầu nghỉ!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TimePicker
                style={{ width: "100%", height: "40px" }}
                placeholder="Vui lòng chọn"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"gioKetThucNghi"}
              label={"Giờ kết thúc nghỉ"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Giờ kết thúc nghỉ!",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TimePicker
                style={{ width: "100%", height: "40px" }}
                placeholder="Vui lòng chọn"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default UpdateShiftList;
