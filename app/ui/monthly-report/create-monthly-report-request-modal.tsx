/* eslint-disable @typescript-eslint/no-explicit-any */
import DanhSachDonApi from "@/app/api/danhsachdon";
import { CreateDonBuRequest } from "@/app/models/donbu/create-donbu-request";
import { CreateDonConNhoRequest } from "@/app/models/donconnho/create-donconnho-request";
import { CreateDonPhepRequest } from "@/app/models/donphep/create-donphep-request";
import { CreateDonTangCaRequest } from "@/app/models/dontangca/create-dontangca-request";
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
import dayjs, { Dayjs } from "dayjs";
import { memo, useEffect, useState } from "react";
const { Option } = Select;

const CreateMonthlyReportRequestModal = (props: any) => {
  const [form] = useForm();
  const { show, refresh, generalData, close, ngayLamViec, employeeData } =
    props;
  const [messageApi, contextHolder] = message.useMessage();
  const [quyBu, setQuyBu] = useState(0);
  const [requestType, setRequestType] = useState(0);
  const [tangCaTu, setTangCaTu] = useState<Dayjs | null>(null);
  const [tangCaDen, setTangCaDen] = useState<Dayjs | null>(null);
  const [soPhut, setSoPhut] = useState<number | undefined>(0);

  const timeDiff = (tangCaTu: string, tangCaDen: string) => {
    if (tangCaTu && tangCaDen) {
      const tangCaTuDate = tangCaTu?.split(":").map(Number);
      const time1 = new Date(
        0,
        0,
        0,
        tangCaTuDate[0],
        tangCaTuDate[1],
      ).getTime();
      const tangCaDenDate = tangCaDen?.split(":").map(Number);
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

  const onFinish = async (values: any) => {
    const ngaylamViecInsert = dayjs(ngayLamViec)
      .add(1, "day")
      .format("DD/MM/YYYY");

    if (requestType === 1) {
      if (quyBu < parseInt(values.soPhutXinBu)) {
        messageApi.open({
          type: "error",
          content: "Số phút xin bù phải nhỏ hơn quỹ nghỉ bù hiện có",
          className: "custom-class",
          style: {
            fontSize: "16px",
          },
          duration: 1.5,
        });
        return;
      }

      const requestData: CreateDonBuRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayLamViec: new Date(ngaylamViecInsert),
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        soPhutXinBu: values.soPhutXinBu,
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonBu(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien);
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn bù thành công",
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

    if (requestType === 2) {
      const requestData: CreateDonConNhoRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tuNgay: values.tuNgay,
        denNgay: values.denNgay,
        trangThai: "0",
        ngayLamViec: new Date(ngaylamViecInsert),
      };

      const response = await DanhSachDonApi.createDonConNho(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien);
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn con nhỏ thành công",
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

    if (requestType === 3) {
      const requestData: CreateDonPhepRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngaylamViecInsert),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonPhep(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien);
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn phép thành công",
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

    if (requestType === 4) {
      const requestData: CreateDonTangCaRequest = {
        maNhanVien: generalData?.maNhanVien,
        ngayTaoDon: new Date(),
        ngayLamViec: new Date(ngaylamViecInsert),
        lyDo: values.lyDo,
        nguoiDuyet: "",
        tangCaTu: dayjs(values.tangCaTu).format("HH:mm:ss"),
        tangCaDen: dayjs(values.tangCaDen).format("HH:mm:ss"),
        trangThai: "0",
      };

      const response = await DanhSachDonApi.createDonTangCa(requestData);
      if (response.statusCode === "200") {
        refresh(generalData?.maNhanVien);
        close();
        messageApi.open({
          type: "success",
          content: "Thêm mới đơn tăng ca thành công",
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
                padding: "8px 16px",
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
                padding: "8px 16px",
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
                <Input style={{ width: "70px" }} type={"number"} />
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "8px 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
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
                padding: "8px 16px",
              }}
            >
              <Form.Item
                labelCol={{ style: { width: 180, textAlign: "left" } }}
                name="quyNghiPhepHienCo"
                label="Quỹ nghỉ phép hiện có"
                className="input-right-align"
                wrapperCol={{
                  style: { width: 180 },
                }}
              >
                <b style={{ width: "70px", color: "#996B4D" }}>{quyBu}</b>
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "8px 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
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
                padding: "8px 16px",
              }}
            >
              <Form.Item label="Từ ngày: " name="tuNgay">
                <DatePicker
                  style={{ width: "120px", border: "none", outline: "none" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
              <Form.Item label="Đến ngày: " name="denNgay">
                <DatePicker
                  style={{ width: "120px", border: "none", outline: "none" }}
                  placeholder="Chọn ngày"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "8px 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
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
                padding: "8px 16px",
              }}
            >
              <Form.Item label="Tăng ca từ" name="tangCaTu">
                <TimePicker
                  onChange={(e) => setTangCaTu(e)}
                  style={{ width: "100px", border: "none", outline: "none" }}
                  placeholder="Vui lòng chọn"
                  format="HH:mm"
                />
              </Form.Item>
              <Form.Item label="đến: " name="tangCaDen">
                <TimePicker
                  onChange={(e) => setTangCaDen(e)}
                  style={{ width: "100px", border: "none", outline: "none" }}
                  placeholder="Vui lòng chọn"
                  format="HH:mm"
                />
              </Form.Item>
            </Space>
            <Space
              style={{
                display: "flex",
                color: "#996B4D",
                padding: "8px 16px",
              }}
            >
              <span>Quy đổi số phút: </span>
              <span>{soPhut}</span>
            </Space>
            <Space
              direction="vertical"
              style={{
                color: "#996B4D",
                padding: "8px 16px",
                width: "100%",
              }}
            >
              <span>Lý do: </span>
              <Form.Item name="lyDo">
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
    if (tangCaTu && tangCaDen) {
      setSoPhut(
        timeDiff(
          dayjs(tangCaTu).format("HH:mm:ss"),
          dayjs(tangCaDen).format("HH:mm:ss"),
        ),
      );
    }
  }, [tangCaTu, tangCaDen]);

  useEffect(() => {
    if (requestType === 1) {
      getQuyBuHienCo(
        generalData?.maNhanVien,
        new Date(ngayLamViec).getFullYear(),
      );
    }
  }, [requestType]);

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
            <span>Mã nhân viên: {generalData?.maNhanVien} </span>
            <span>
              Ngày làm việc: {dayjs(ngayLamViec).format("DD/MM/YYYY")}
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
                  (e: { maNhanVien: any }) =>
                    e.maNhanVien === generalData?.maNhanVien,
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
              <Select value={requestType} onChange={handleRequestType}>
                <Option value={1}>Đơn bù</Option>
                <Option value={2}>Đơn con nhỏ</Option>
                <Option value={3}>Đơn phép</Option>
                <Option value={4}>Đơn tăng ca</Option>
              </Select>
            </Form.Item>
          </Space>
          {renderManageView(requestType)}
        </Space>
      </Form>
    </Modal>
  );
};

export default memo(CreateMonthlyReportRequestModal);
