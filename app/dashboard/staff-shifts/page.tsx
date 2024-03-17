import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phân ca nhân viên",
};

const StaffShiftsPage = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <h2 style={{ textAlign: "center" }}>Phân ca nhân viên</h2>
        </Col>
        <Col span={16}>
          <Row>
            <Col span={12} style={{ padding: "24px" }}>
              <Card>
                <Button
                  style={{ maxWidth: "200px" }}
                  icon={<DownloadOutlined />}
                >
                  Chọn file import
                </Button>
                <Button style={{ maxWidth: "100px" }} type="primary">
                  Import data
                </Button>
              </Card>
            </Col>
            <Col span={12} style={{ padding: "24px" }}>
              <Card>
                <Button
                  type="primary"
                  style={{ maxWidth: "200px" }}
                  icon={<DownloadOutlined />}
                >
                  File import mẫu
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ padding: "24px" }}>
          <h2>Hướng dẫn Import phân ca</h2>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            Bước 1: Tải file excel mẫu import phân ca tại nút File import mẫu
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            Bước 2: Chỉnh sửa file excel muốn import giống với file excel mẫu
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            Bước 3: Chọn file excel muốn import tại nút Chọn file import Khi
            chọn file import xong, bấm nút Import data, hệ thống sẽ trả về kết
            quả nếu file bị lỗi tại 2 bảng ở dưới : Danh sách ca không tồn tại
            và Mã nhân viên không tồn tại. Nhân sự kiểm tra lại file excel.
            <br />
            Trong quá trình import ca, hệ thống sẽ hiển thị thông báo lên màn
            hình. Nếu import lỗi, hệ thống sẽ báo lỗi, và nhân sự có thể import
            lại file, các ca sẽ được ghi đè.
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            <i>Chú ý</i>
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            <i>
              -Trong quá trình import vui lòng không tắt hoặc thoát hệ thống cho
              đến khi import xong
            </i>
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            <i>
              -Hệ thống chỉ thực hiện import khi file giống với file mẫu, nếu
              file import khác với file mẫu thì hệ thống sẽ không import.
            </i>
          </p>
          <p style={{ fontSize: "16px", textAlign: "justify" }}>
            <i>
              -Các ca trong file import phải là các ca đã có trên hệ thống. Kiểm
              tra các ca đã có trên hệ thống hay chưa tại màn hình Danh sách ca.
            </i>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default StaffShiftsPage;
