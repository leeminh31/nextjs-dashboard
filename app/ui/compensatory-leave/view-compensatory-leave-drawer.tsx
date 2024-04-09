/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Form, Space } from "antd";
import { memo, useEffect } from "react";

const ViewCompensatoryLeave = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (show) form.resetFields();
  }, [show]);

  useEffect(() => {}, []);

  return (
    <Drawer onClose={close} size="default" placement="right" open={show}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#b98868" }}>Quỹ bù nhân viên</h2>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Thông tin nhân viên </span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Họ tên nhân viên: </span>
          <span>{data?.hoTen}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Mã nhân viên: </span>
          <span>{data?.maNhanVien}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Phòng ban: </span>
          <span>{data?.phongBan}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Chi tiết quỹ bù</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Năm: {data?.nam}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng</span>
          <span>Phát sinh</span>
          <span>Sử dụng</span>
        </Space>
        {data?.thang.map((item: any, index: number) => {
          return (
            <Space
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "8px",
              }}
            >
              <span>{item.thang}</span>
              <span>{item.phatSinh}</span>
              <span>{item.suDung}</span>
            </Space>
          );
        })}
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tổng:</span>
          <span>{data?.phatSinh} </span>
          <span>{data?.suDung} </span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Còn lại: {data?.conLai} </span>
        </Space>
      </Space>
    </Drawer>
  );
};

export default memo(ViewCompensatoryLeave);
