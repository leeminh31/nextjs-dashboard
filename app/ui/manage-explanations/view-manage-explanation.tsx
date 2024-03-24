import PhongBanApi from "@/app/api/phongban";
import { PhongBanResponse } from "@/app/models/phongban/phongban-response";
import { SearchPhongBanRequest } from "@/app/models/phongban/search-phongban-request";
import { Button, Form, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const { Option } = Select;

const ViewManagExplanation = (props: any) => {
  const { show, close, data } = props;
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState<PhongBanResponse[]>([]);

  const onFinish = () => {};

  const getDepartmentsByParams = async (
    searchRequest: SearchPhongBanRequest,
  ) => {
    let response = await PhongBanApi.getPhongBan(searchRequest);
    if (response.statusCode === "200") {
      console.log(response.data);
      setDepartments(response.data);
    } else {
      console.log(response.message);
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
                padding: "8px",
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
                padding: "8px",
              }}
            >
              <span>Quỹ nghỉ bù hiện có: </span>
              <span>960</span>
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#996B4D",
                padding: "8px",
              }}
            >
              <span>Số phút xin bù: </span>
              <span>{data.soPhutXinBu}</span>
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
                padding: "8px",
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
                padding: "8px",
              }}
            >
              <span>Quỹ nghỉ phép hiện có: </span>
              <span>960</span>
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
                padding: "8px",
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
                padding: "8px",
              }}
            >
              <span>Từ ngày: {data.tuNgay} </span>
              <span>Đến ngày: {data.denNgay} </span>
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
                padding: "8px",
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
                padding: "8px",
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
                padding: "8px",
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
                padding: "8px",
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
    if (data != null) {
      console.log(data);

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

  useEffect(() => {
    getDepartmentsByParams({
      tenPhongBan: null,
      truongPhongBan: null,
      thuKyPhongBan: null,
    });
  }, []);

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
