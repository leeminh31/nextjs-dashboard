import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Row, Space, Upload } from "antd";
import { useState } from "react";

const ImportCompensatoryLeave = () => {
  const [form] = Form.useForm();
  const [importOpen, setImportOpen] = useState(false);

  return (
    <Drawer
      title="Import phép và bù"
      placement="right"
      onClose={() => setImportOpen(false)}
      open={importOpen}
      footer={
        <Row justify={"end"}>
          <Space>
            <Button onClick={() => setImportOpen(false)}>Hủy</Button>
            <Button onClick={() => form.submit()} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      }
    >
      <Upload>
        <p>File upload</p>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Space direction="vertical">
        <p>Template file</p>
        <Button type="primary" icon={<DownloadOutlined />}>
          Tải xuống template
        </Button>
      </Space>
    </Drawer>
  );
};

export default ImportCompensatoryLeave;
