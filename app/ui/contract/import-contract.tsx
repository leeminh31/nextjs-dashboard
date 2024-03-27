import { HRMSystemApi } from "@/app/constant/constant";
import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, message, Row, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";

const ImportContract = (props: any) => {
  const inputFileRefContract = useRef<HTMLInputElement>(null);
  const { show, close, refresh } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [fileName, setFileName] = useState("");
  const [form] = Form.useForm();

  const dowloadFile = async () => {
    fetch(HRMSystemApi + "HopDong/dowload", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: null,
    })
      .then((res) => res.blob())
      .then((response) => {
        var objectURL = URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = objectURL;
        link.setAttribute("download", "MasterFile.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  const uploadFile = async (file: any) => {
    fetch(HRMSystemApi + "HopDong/upload", {
      method: "POST",
      body: file,
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.statusCode === "200") {
          refresh();
          messageApi.open({
            type: "success",
            content: "Nhập hợp đồng thành công",
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
    inputFileRefContract.current.value = "";
  };

  const formSubmit = () => {
    let form = new FormData();
    form.append("formFile", inputFileRefContract.current.files[0]);
    uploadFile(form);
  };

  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      let form = new FormData();
      form.append("formFile", e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    if (show) {
      setFileName("");
      inputFileRefContract.current.value = "";
    }
  }, [show]);

  return (
    <Drawer
      title="Nhập hợp đồng"
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
        ref={inputFileRefContract}
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <p>Chọn file cần nhập</p>
      <Button
        icon={<UploadOutlined />}
        onClick={() => inputFileRefContract?.current?.click()}
      >
        Chọn file
      </Button>
      {fileName !== "" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>{fileName}</p>
          <Button
            onClick={() => {
              setFileName("");
              inputFileRefContract.current.value = "";
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

export default ImportContract;
