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
                <Space direction='vertical'>
                    <p>Tải file template mẫu</p>
                    <Button type='primary' icon={<DownloadOutlined />}>File mẫu</Button>
                </Space>
                <Upload>
                    <p>Chọn file cần nhập</p>
                    <Button icon={<UploadOutlined />}>Chọn file</Button>
                </Upload>
        </Drawer>
    )
}

export default ImportContract
