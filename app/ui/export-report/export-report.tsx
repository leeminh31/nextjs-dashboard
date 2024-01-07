import { Col, DatePicker, Row, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

const ExportReport = () => {
    return (
        <>
            <Row style={{padding:'24px'}}>
                <Col span={24}>
                    <span style={{display:'inline-block', width:'50px'}}>Tháng</span>
                    <DatePicker picker="month"/>
                </Col>
                <Col span={24}>
                    <span style={{display:'inline-block', width:'50px'}}>Năm</span>
                    <DatePicker picker="year"/>
                </Col>
                <Col span={24}>
                    <h2>Xuất File báo cáo</h2>
                </Col>
                <Col span={24} style={{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo tổng hợp chấm công</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo chấm công đếm số lần</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo đi muộn dưới 5 phút và trên 5 phút</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo ca đêm, ca gãy</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo phép bù</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo ca ăn</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Thống kê báo cáo tuần</span>
                </Col>
                <Col span={24} style= {{padding:'15px'}}>
                    <Button icon={<DownloadOutlined/>}>Tải xuống</Button>
                    <span style={{marginLeft:'20px', color:'#b98868'}}>Báo cáo chấm công trùng</span>
                </Col>
            </Row>    
        </>
    )
}

export default ExportReport