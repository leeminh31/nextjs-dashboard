'use client'

import React, {useEffect, useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
const { Option } = Select;

interface DataType {
  key: string;
  employee: string;
  employeeId: string;
  contract:string;
  department:string;
  role:string;
  signDate: Date;
  startDate: Date;
  endDate: Date;
  contractType: string;
  status: string;
}



const data: DataType[] = [
  {
    key: '1',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Ẩm thực',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy',
    children: [
      {
        key: '2',
        employee: 'Bùi Thị Yên',
        employeeId: 'APG112233',
        contract: 'APG112233',
        department:'Ẩm thực',
        role:'BA',
        signDate: new Date(Date.now()),
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        contractType: 'Thử việc',
        status: 'Đang chạy'
      }
    ]
  },
  {
    key: '2',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '3',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Nghỉ việc'
  },
  {
    key: '4',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Nghỉ việc'
  },
  {
    key: '5',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '6',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '7',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '8',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '9',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '10',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '11',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '12',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
  {
    key: '13',
    employee: 'Bùi Thị Yên',
    employeeId: 'APG112233',
    contract: 'APG112233',
    department:'Develope',
    role:'BA',
    signDate: new Date(Date.now()),
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    contractType: 'Thử việc',
    status: 'Đang chạy'
  },
];

const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

const MonthlyReportTable: React.FC = ({date} :any) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [form] = Form.useForm();
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [value, setValue] = useState(false)

    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(localizedFormat);
    dayjs.tz.setDefault('Asia/Ho_Chi_Minh');


    const generateColumns = () => {
      let cols: ColumnsType<DataType> = [{
          title: '#',
          dataIndex: 'key',
          key: 'key',
          width:65,
          fixed:'left',
        },
        {
            title: 'Bộ phận',
            dataIndex: 'department',
            key: 'department',
            fixed:'left',
            width:75,
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'employeeId',
            key: 'employeeId',
            fixed:'left',
            width:75,
        },
        {
          title: 'Họ và tên',
          dataIndex: 'fullname',
          key: 'fullname',
          fixed:'left',
          width:75,
        },
        {
          title: 'Tổng công',
          dataIndex: 'contract',
          key: 'contract',
          fixed:'left',
          width:75,
        },
      ];

      const daysOfWeekInVietnamese = [
            'Chủ Nhật',
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
      ];
    
      let days = [];

      // Lấy ngày hiện tại ở múi giờ của Việt Nam
      const getDate = dayjs(new Date(date)).tz();
      let startDate = new Date(getDate.year(),getDate.month(),1)
      while(startDate.getMonth() === getDate.month()) {
        days.push(new Date(startDate))
        startDate.setDate(startDate.getDate() +1)
      }

      console.log(days)
      days.map((day:Date) => {
        const dateCol = dayjs(day).tz();
        // Định dạng ngày theo mẫu "dddd (D/M)"
        const dayOfWeekNumber = dateCol.day();
        const dayOfWeekVietnamese = daysOfWeekInVietnamese[dayOfWeekNumber];
    
        // Định dạng ngày theo mẫu "Thứ 2 (D/M)"
        const formattedDate = `${dayOfWeekVietnamese} (${dateCol.format('DD/MM')})`;
        console.log(formattedDate)

        
        let column:ColumnsType<DataType> = [{
          title: formattedDate,
          dataIndex:dateCol.daysInMonth.toString(),
          key:dateCol.daysInMonth.toString(),
          width:75
        }];

        cols.push(column[0])
      })

      // const days = {
      //   title: "Days",
      //   dataIndex: "date",
      //   defaultSorter: "ascend",
      //   key: "title",
      //   sorter: (a, b) => a.date.localeCompare(b.date),
      //   sortDirections: ["descend", "ascend"]
      //   render: (date) => getDayName(new Date(date)),
      // };
      // cols.push(days); // add 'Days' obj to Columns.
      
      // // for render: property in cols need to return a function. Here creates that.
      // const generateRender = (row) => {
      //   console.log("gen row----", row);
      //   return (row) => row.section + " - " + row.subject;
      // };
    
      // // create the col objects for each 'Period'. This method works assuming response data has only unique 'Periods'.
      // data.map((row) => {
    
      //   let period = {}; // for create 'Period' obj for cols.
      //   period["title"] = row.period;
      //   period["key"] = row.period;
      //   period["render"] = generateRender(row); // only need this if you render customized data.
      //   cols.push(period); // add Current Period obj to Columns.
      // });
    
      return cols;
    };

    const closeAddDrawer = () => {
      setAddOpen(false)
      form.resetFields()
    }
  
    const closeUpdateDrawer = () => {
      setUpdateOpen(false)
      form.resetFields()
    }

    const closeViewDrawer = () => {
      setViewOpen(false)
      form.resetFields()
    }

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    const parseDate = dayjs(new Date(date))

    useEffect(() => {
      generateColumns()
    }, [date])

    return (
      <>  
        <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
            <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
                <span><b>{`Báo cáo thống kê từ ngày 01/${parseDate.month()+1}/${parseDate.year()} đến ngày ${parseDate.daysInMonth()}/${parseDate.month()+1}/${parseDate.year()}`}</b></span>
                <Row>
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                </Row>
            </Flex>
            <Table 
                scroll={{ x:4000, y:500}} 
                rowSelection={rowSelection} 
                columns={generateColumns()} 
                dataSource={data}
                pagination={{ showQuickJumper:true, total:50 ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}} 
            />
        </div>
        <Drawer 
        title="Import dữ liệu chấm công" 
        placement="right" 
        onClose={() => setImportOpen(false)} 
        open={importOpen}
        footer= {
          <Row justify={'end'}>
              <Space>
                  <Button onClick={() => setImportOpen(false)}>Hủy</Button>
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
      </>
    )
}

export default MonthlyReportTable;