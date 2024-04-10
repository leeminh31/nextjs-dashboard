/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Form, Space } from "antd";
import { memo, useEffect } from "react";

const ViewOnLeave = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (show) form.resetFields();
  }, [show]);

  useEffect(() => {}, []);

  return (
    <Drawer
      className="on-leave-drawer"
      onClose={close}
      size="default"
      placement="right"
      open={show}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#b98868" }}>Quỹ phép nhân viên</h2>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Thông tin nhân viên: </span>
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
          <span>Chi tiết quỹ phép</span>
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
          <span>Tổng phép: {data?.tongPhep}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Sử dụng: </span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 1: {data?.thang1} </span>
          <span>Tháng 2: {data?.thang2}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 3: {data?.thang3} </span>
          <span>Tháng 4: {data?.thang4}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 5: {data?.thang5} </span>
          <span>Tháng 6: {data?.thang6}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 7: {data?.thang7} </span>
          <span>Tháng 8: {data?.thang8}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 9: {data?.thang9} </span>
          <span>Tháng 10: {data?.thang10}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tháng 11: {data?.thang11} </span>
          <span>Tháng 12: {data?.thang12}</span>
        </Space>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#996B4D",
            padding: "8px",
          }}
        >
          <span>Tổng sử dụng: {data?.daDung} </span>
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

export default memo(ViewOnLeave);
