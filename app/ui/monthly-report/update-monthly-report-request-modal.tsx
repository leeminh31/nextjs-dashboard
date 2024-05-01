/* eslint-disable @typescript-eslint/no-explicit-any */
import DanhSachDonApi from "@/app/api/danhsachdon";
import QuyPhepApi from "@/app/api/quyphep";
import { UpdateDonBuRequest } from "@/app/models/donbu/update-donbu-request";
import { UpdateDonConNhoRequest } from "@/app/models/donconnho/update-donconnho-request";
import { UpdateDonPhepRequest } from "@/app/models/donphep/update-donphep-request";
import { UpdateDonTangCaRequest } from "@/app/models/dontangca/update-dontangca-request";
import { SearchQuyPhepRequest } from "@/app/models/quyphep/search-quyphep-request";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
const { Option } = Select;

const UpdateMonthlyReportRequestModal = (props: any) => {
  const [form] = useForm();
  const { data, refresh, generalData, show, close, employeeData, ngayLamViec } =
    props;
  const [requestType, setRequestType] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
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

  const onFinish = async (values: any) => {
    const ngaylamViecInsert = dayjs(ngayLamViec)
      .add(1, "day")
      .format("DD/MM/YYYY");

    if (data?.loaiDon === 1) {
      const requestData: UpdateDonBuRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayLamViec: new Date(ngaylamViecInsert),
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        soPhutXinBu: values.soPhutXinBu,
        trangThai: "0",
        maDonBu: data?.maDonBu,
      };

      const response = await DanhSachDonApi.updateDonBu(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien, new Date(ngaylamViecInsert));
        close();
        messageApi.open({
          type: "success",
          content: "Sửa đơn bù thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (data?.loaiDon === 2) {
      const dateTuNgay = new Date(values.tuNgay);
      const dateDenNgay = new Date(values.denNgay);

      if (
        Math.floor(
          (dateDenNgay.getTime() - dateTuNgay.getTime()) / (24 * 3600 * 1000),
        ) > 366
      ) {
        messageApi.open({
          type: "error",
          content: "Khoảng thời gian không được phép lớn hơn 12 tháng",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        return;
      }

      const requestData: UpdateDonConNhoRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tuNgay: values.tuNgay,
        denNgay: values.denNgay,
        trangThai: "0",
        maDonConNho: data?.maDonConNho,
      };

      const response = await DanhSachDonApi.updateDonConNho(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien, new Date(ngaylamViecInsert));
        close();
        messageApi.open({
          type: "success",
          content: "Sửa đơn con nhỏ thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (data?.loaiDon === 3) {
      const requestData: UpdateDonPhepRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngaylamViecInsert),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        trangThai: "0",
        maDonPhep: data?.maDonPhep,
      };

      const response = await DanhSachDonApi.updateDonPhep(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien, new Date(ngaylamViecInsert));
        close();
        messageApi.open({
          type: "success",
          content: "Sửa đơn phép thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    if (data?.loaiDon === 4) {
      const requestData: UpdateDonTangCaRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngaylamViecInsert),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tangCaTu: dayjs(values.tangCaTu).format("HH:mm:ss"),
        tangCaDen: dayjs(values.tangCaDen).format("HH:mm:ss"),
        trangThai: "0",
        maDonTangCa: data?.maDonTangCa,
      };

      const response = await DanhSachDonApi.updateDonTangCa(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien, new Date(ngaylamViecInsert));
        close();
        messageApi.open({
          type: "success",
          content: "Sửa đơn tăng ca thành công",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        form.resetFields();
        setRequestType(0);
      } else {
        console.log(response.message);
      }
    }

    close();
  };

  const handleRequestType = (e: any) => {
    setRequestType(e);
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
                <b style={{ width: "70px", color: "#996B4D" }}>{quyBu}</b>
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <Input style={{ width: "70px" }} type={"number"} />
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
              <Form.Item
                name="lyDo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TextArea style={{ width: "420px" }} rows={4} />
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
                  defaultValue={quyPhep * 480}
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
              <Form.Item
                name="lyDo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TextArea style={{ width: "420px" }} rows={4} />
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
              <Form.Item
                label="Từ ngày: "
                name="tuNgay"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "120px" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item
                label="Đến ngày: "
                name="denNgay"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <DatePicker
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
              <Form.Item
                name="lyDo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TextArea style={{ width: "420px" }} rows={4} />
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
              <Form.Item
                label="Tăng ca từ"
                name="tangCaTu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TimePicker
                  style={{ width: "100px" }}
                  placeholder="Vui lòng chọn"
                />
              </Form.Item>
              <Form.Item
                label="đến: "
                name="tangCaDen"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TimePicker
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
              <span>
                Quy đổi số phút: {timeDiff(data?.tangCaTu, data?.tangCaDen)}
              </span>
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
              <Form.Item
                name="lyDo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập đầy đủ thông tin",
                  },
                ]}
              >
                <TextArea style={{ width: "420px" }} rows={4} />
              </Form.Item>
            </Space>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (data && data.loaiDon === 1) {
      getQuyBuHienCo(
        generalData?.maNhanVien,
        new Date(ngayLamViec).getFullYear(),
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
      getQuyPhepHienCo({
        tenNhanVien: null,
        maNhanVien: data.maNhanVien,
        tenPhongBan: null,
        nam: new Date(ngayLamViec).getFullYear(),
      });
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
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {" "}
            Sửa đơn{" "}
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
        name="viewApplication"
        onFinish={onFinish}
      >
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
              <Select disabled onChange={handleRequestType}>
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

export default memo(UpdateMonthlyReportRequestModal);
