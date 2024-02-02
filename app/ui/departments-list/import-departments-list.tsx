import { Button, Row, Space, Drawer, Upload, Form } from 'antd';
import {
    UploadOutlined,
    DownloadOutlined,
  } from '@ant-design/icons';

const ImportDepartmentsList = (props:any) => {
    const {show,close} = props
    const [form] = Form.useForm()

    return(
        <Drawer 
        title="Import phòng ban" 
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
        }>
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

export default ImportDepartmentsList