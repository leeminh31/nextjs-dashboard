/* eslint-disable @typescript-eslint/no-explicit-any */
import DanhSachDonApi from "@/app/api/danhsachdon";
import QuyPhepApi from "@/app/api/quyphep";
import { SearchQuyPhepRequest } from "@/app/models/quyphep/search-quyphep-request";
import { Button, Form, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ViewManageRequest = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();
  const [quyBu, setQuyBu] = useState(0);
  const [quyPhep, setQuyPhep] = useState(0);

  const getQuyPhepHienCo = async (request: SearchQuyPhepRequest) => {
    const response = await QuyPhepApi.getQuyPhep(request);
    if (response?.statusCode === "200") {
      setQuyPhep(response?.data[0]?.conLai);
    } else {
      console.log(response?.message);
    }
  };

  const getQuyBuHienCo = async (maNhanVien: string, nam: number) => {
    const response = await DanhSachDonApi.getQuyBuHienCo(maNhanVien, nam);
    if (response?.statusCode === "200") {
      setQuyBu(response?.data);
    } else {
      console.log(response?.message);
    }
  };

  const onFinish = () => {};

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
              <span>{data.soPhutXinBu}</span>
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
                value={data.lyDo}
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
              <span>{quyPhep * 480}</span>
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
                value={data.lyDo}
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
              <span>Từ ngày: {data.tuNgay} </span>
              <span>Đến ngày: {data.denNgay} </span>
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
                value={data.lyDo}
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
              <span>Tăng ca từ: {data.tangCaTu}</span>
              <span>đến : {data.tangCaDen}</span>
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
                Quy đổi số phút: {timeDiff(data.tangCaTu, data.tangCaDen)}
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
                value={data.lyDo}
              />
            </Space>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (data) {
      console.log(dayjs(data?.ngayLamViec, "dd/MM/YYYY").year());
      if (data?.loaiDon === 3) {
        getQuyPhepHienCo({
          tenNhanVien: null,
          maNhanVien: data.maNhanVien,
          tenPhongBan: null,
          nam: dayjs(data?.ngayLamViec, "dd/MM/YYYY").year(),
        });
      }

      if (data?.loaiDon === 1) {
        getQuyBuHienCo(
          data.maNhanVien,
          dayjs(data?.ngayLamViec, "dd/MM/YYYY").year(),
        );
      }
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
      <Form form={form} name="viewApplication" onFinish={onFinish}>
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
            <span>Họ tên nhân viên: {data?.hoTen} </span>
            <span>Ngày tạo: {data?.ngayTaoDon}</span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "2px 0px",
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
              padding: "2px 0px",
            }}
          >
            <span>Phòng ban: {data?.phongBan} </span>
          </Space>
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#996B4D",
              padding: "2px 0px",
            }}
          >
            <span>Chức vụ: {data?.chucVu} </span>
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

export default ViewManageRequest;
