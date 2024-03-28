/* eslint-disable @typescript-eslint/no-explicit-any */
import { HRMSystemApi } from "@/app/constant/constant";
import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Row, Space, message } from "antd";
import React, { useEffect, useRef, useState } from "react";

const ImportTimeKeeping = (props: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { show, close, refresh } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [fileName, setFileName] = useState("");
  const [] = Form.useForm();

  const dowloadFile = async () => {
    fetch(HRMSystemApi + "DuLieuChamCong/dowload", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: null,
    })
      .then((res) => res.blob())
      .then((response) => {
        const objectURL = URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = objectURL;
        link.setAttribute("download", "DuLieuChamCong.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  const uploadFile = async (file: any) => {
    fetch(HRMSystemApi + "DuLieuChamCong/upload", {
      method: "POST",
      body: file,
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.statusCode === "200") {
          refresh();
          messageApi.open({
            type: "success",
            content: "Nhập dữ liệu chấm công thành công",
            className: "custom-class",
            style: {
              fontSize: "16px",
            },
            duration: 1.5,
          });
          close();
        } else {
          messageApi.open({
            type: "error",
            content: "Vui lòng kiểm tra lại file",
            className: "custom-class",
            style: {
              fontSize: "16px",
            },
            duration: 1.5,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    inputFileRef.current.value = "";
  };

  const formSubmit = () => {
    const form = new FormData();
    form.append("formFile", inputFileRef.current.files[0]);
    uploadFile(form);
  };

  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const form = new FormData();
      form.append("formFile", e.target.files[0]);

      setFileName(e.target.files[0].name);
      // uploadFile(form)
    }
  };

  useEffect(() => {
    if (show) {
      setFileName("");
      inputFileRef.current.value = "";
    }
  }, [show]);

  return (
    <Drawer
      title="Nhập dữ liệu chấm công"
      className="time-keeping"
      placement="right"
      onClose={close}
      open={show}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={close}>Hủy</Button>
            <Button onClick={formSubmit} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      }
    >
      {contextHolder}
      <Space direction="vertical">
        <p>Tải file template mẫu</p>
        <Button
          onClick={dowloadFile}
          type="primary"
          icon={<DownloadOutlined />}
        >
          File mẫu
        </Button>
      </Space>
      <input
        onChange={onFileChangeCapture}
        style={{ display: "none" }}
        ref={inputFileRef}
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <p>Chọn file cần nhập</p>
      <Button
        icon={<UploadOutlined />}
        onClick={() => inputFileRef?.current?.click()}
      >
        Chọn file
      </Button>
      {fileName !== "" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>{fileName}</p>
          <Button
            onClick={() => {
              setFileName("");
              inputFileRef.current.value = "";
            }}
          >
            <DeleteOutlined size={8} />
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default ImportTimeKeeping;
