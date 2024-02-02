import { Drawer, Row, Space, Button, Upload, Form } from "antd"
import React, {useEffect, useState} from 'react';
import {
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';

const ImportContract = (props:any) => {
    const {show, close} = props
    const [form] = Form.useForm();

    return (
        <Drawer 
            title="Import hợp đồng và nhân viên" 
            placement="right" 
            onClose={close} 
            open={show}
            footer= {
            <Row justify={'end'}>
                <Space>
                    <Button onClick={close}>Hủy</Button>
                    <Button onClick={() => form.submit()}  type='primary'>Lưu</Button>
                </Space>
            </Row>
            }
            >
                <Upload>
                    <p>File upload</p>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Space direction='vertical'>
                    <p>Template file</p>
                    <Button type='primary' icon={<DownloadOutlined />}>Tải xuống template</Button>
                </Space>
        </Drawer>
    )
}

export default ImportContract
