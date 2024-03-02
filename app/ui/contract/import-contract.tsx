import { Drawer, Row, Space, Button, Upload, Form, UploadProps, message, Input } from "antd"
import React, {useEffect, useRef, useState} from 'react';
import {
    UploadOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import RestConnection from "@/app/api/rest";
import { HRMSystemApi } from "@/app/constant/constant";

const ImportContract = (props:any) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const {show, close, refresh} = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const dowloadFile = async () => {
        fetch(HRMSystemApi + "HopDong/dowload", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            body: null
        })
        .then(res => res.blob())
        .then( response => {
            var objectURL = URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = objectURL;
            link.setAttribute('download', 'MasterFile.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        })         
    }

    const uploadFile = async (file :any) => {
        fetch( HRMSystemApi + 'HopDong/upload', {
            method: 'POST',
            body: file
        })
        .then(  r => r.json())
        .then(response => {
            console.log(response)
            if (response.statusCode === "200") {
                refresh()
                messageApi.open({
                    type: 'success',
                    content: 'Nhập hợp đồng thành công',
                    className: 'custom-class',
                    style: {
                        fontSize:'16px'
                    },
                    duration: 1.5,
                });
                close()
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Vui lòng kiểm tra lại file',
                    className: 'custom-class',
                    style: {
                        fontSize:'16px'
                    },
                    duration: 1.5,
                });
            }
        })
        .catch ((err) => {
            console.log(err)
        })
        inputFileRef.current.value = "";
    }

    const onFileChangeCapture = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        if(e.target.files != null)
        {
            let form = new FormData();
            form.append('formFile', e.target.files[0]);
            uploadFile(form)
        }
    };

    return (
        <Drawer 
            title="Nhập hợp đồng" 
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
                {contextHolder}
                <Space direction='vertical'>
                    <p>Tải file template mẫu</p>
                    <Button onClick={dowloadFile} type='primary' icon={<DownloadOutlined />}>File mẫu</Button>
                </Space>
                <input onChange={onFileChangeCapture} style={{display:'none'}} ref={inputFileRef} type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <p>Chọn file cần nhập</p>
                <Button icon={<UploadOutlined />} onClick={() => inputFileRef?.current?.click()}>Chọn file</Button>
        </Drawer>
    )
}

export default ImportContract
