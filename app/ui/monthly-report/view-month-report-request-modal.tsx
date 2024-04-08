/* eslint-disable @typescript-eslint/no-explicit-any */
import DanhSachDonApi from "@/app/api/danhsachdon";
import { Button, Form, Modal, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

import { memo, useEffect, useState } from "react";
const { Option } = Select;

const ViewMonthlyReportRequestModal = (props: any) => {
  const [form] = useForm();
  const [quyBu, setQuyBu] = useState(0);
  const { data, generalData, show, close, employeeData } = props;

  const getQuyBuHienCo = async (maNhanVien: string, nam: number) => {
    const response = await DanhSachDonApi.getQuyBuHienCo(maNhanVien, nam);
    if (response?.statusCode === "200") {
      setQuyBu(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const timeDiff = (tangCaTu: string, tangCaDen: string) => {
    const tangCaTuDate = tangCaTu.split(":").map(Number);
    const time1 = new Date(0, 0, 0, tangCaTuDate[0], tangCaTuDate[1]).getTime();
    const tangCaDenDate = tangCaDen.split(":").map(Number);
    const time2 = new Date(
      0,
      0,
      0,
      tangCaDenDate[0],
      tangCaDenDate[1],
    ).getTime();

    const diffms = Math.abs(time2 - time1);

    const minutes = Math.floor(diffms / (1000 * 60));

    return minutes;
  };

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
                padding: "2px 0px",
              }}
            >
              <span>Loại đơn:</span>
              <span>Đơn xin nghỉ bù</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Quỹ nghỉ bù hiện có: </span>
              <span>{quyBu}</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Số phút xin bù: </span>
              <span>{data?.soPhutXinBu}</span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "2px 0px",
                width: "100%",
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
                padding: "2px 0px",
              }}
            >
              <span>Loại đơn:</span>
              <span>Đơn xin nghỉ phép</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Quỹ nghỉ phép hiện có: </span>
              <span>960</span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "2px 0px",
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
          </>
        );
      case 2:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Loại đơn:</span>
              <span>Đơn xin hưởng chế độ con nhỏ</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Từ ngày: {dayjs(data?.tuNgay).format("DD/MM/YYYY")} </span>
              <span>
                Đến ngày: {dayjs(data?.denNgay).format("DD/MM/YYYY")}{" "}
              </span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "2px 0px",
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
          </>
        );
      case 4:
        return (
          <>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Loại đơn:</span>
              <span>Đơn tăng ca nhân viên</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>Tăng ca từ: {data?.tangCaTu}</span>
              <span>đến : {data?.tangCaDen}</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "2px 0px",
              }}
            >
              <span>
                Quy đổi số phút: {timeDiff(data?.tangCaTu, data?.tangCaDen)}
              </span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "2px 0px",
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
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log(data);

    if (data && data.loaiDon === 1) {
      getQuyBuHienCo(
        generalData?.maNhanVien,
        new Date(data?.ngayLamViec).getFullYear(),
      );
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
      <Form form={form} name="viewApplication">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ color: "#b98868" }}>Đơn nhân viên</h3>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "2px 0px",
            }}
          >
            <b>Thông tin chi tiết nhân viên</b>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "2px 0px",
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
              padding: "2px 0px",
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
              padding: "2px 0px",
            }}
          >
            <span>Phòng ban: {generalData?.phongBan} </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "2px 0px",
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
              padding: "2px 0px",
              marginTop: "24px",
            }}
          >
            <b>Nội dung chi tiết đơn </b>
          </Space>
          {renderManageView(data?.loaiDon)}
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(ViewMonthlyReportRequestModal);
