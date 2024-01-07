'use client'

import React, {useState} from 'react';
import { Button, Table, Row,Col, Space, Drawer, Upload, Form, Input, Select, theme, Flex, Tag, DatePicker, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  EditTwoTone,
  EyeTwoTone,
  HistoryOutlined,
  ExportOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft,faArrowUpRightFromSquare, faPencil, faEye } from '@fortawesome/free-solid-svg-icons'
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

const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width:50
    },
    {
      title: 'Ngày tính bù',
      dataIndex: 'compensatoryDays',
      key: 'compensatoryDays',
      width:150
    },
    {
      title: 'Mã nhân sự',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width:150
    },
    {
      title: 'Họ và tên',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width:150
    },
    {
      title: 'Ngày vào làm',
      key: 'startWorkingDate',
      dataIndex: 'startWorkingDate',
      width:150
    },
    {
      title: 'Cấp bậc',
      key: 'rank',
      dataIndex: 'rank',
      width:100
    },
    {
      title: 'Phòng ban',
      key: 'department',
      dataIndex: 'department',
      width:150
    },
    {
      title: 'Chức vụ',
      key: 'position',
      dataIndex: 'position',
      width:100
    },
    {
      title: 'Ngày nghỉ việc',
      key: 'endWorkingDate',
      dataIndex: 'endWorkingDate',
      width:150
    },
    {
      title: 'Ngày ký HĐLĐ',
      key: 'signDate',
      dataIndex: 'signDate',
      width:150
    },
    {
      title: 'Loại hợp đồng',
      key: 'contractType',
      dataIndex: 'contractType',
    },
    {
      title: 'Tháng 1',
      key: 'january',
      dataIndex: 'january',
      width:750,
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          width:250,
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 2',
      key: 'february',
      dataIndex: 'february',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 3',
      key: 'march',
      dataIndex: 'march',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 4',
      key: 'april',
      dataIndex: 'april',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 5',
      key: 'may',
      dataIndex: 'may',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 6',
      key: 'june',
      dataIndex: 'june',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 7',
      key: 'july',
      dataIndex: 'july',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 8',
      key: 'august',
      dataIndex: 'august',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 9',
      key: 'september',
      dataIndex: 'september',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 10',
      key: 'october',
      dataIndex: 'october',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 11',
      key: 'november',
      dataIndex: 'november',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tháng 12',
      key: 'december',
      dataIndex: 'december',
      children: [
        {
          title: 'Phát sinh tăng',
          dataIndex: 'havingIncreased',
          key: 'havingIncreased',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Sử dụng',
          dataIndex: 'used',
          key: 'used',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
        {
          title: 'Tăng ca',
          dataIndex: 'overtime',
          key: 'overtime',
          children: [
            {
              title: 'Thử việc',
              dataIndex: 'probation',
              key: 'probation',
              width:100,
            },
            {
              title: 'Chính thức',
              dataIndex: 'official',
              key: 'official',
              width:150,
            },
          ],
        },
      ],
    },
    {
      title: 'Tổng tăng (phút)',
      dataIndex: 'totalIncrementbyMinutes',
      key: 'totalIncrementbyMinutes',
      children: [
        {
          title: 'Thử việc',
          dataIndex: 'probation',
          key: 'probation',
          width:100,
        },
        {
          title: 'Chính thức',
          dataIndex: 'official',
          key: 'official',
          width:150,
        },
        {
          title: 'TV-OVT',
          dataIndex: 'tv-ovt',
          key: 'tv-ovt',
          width:100,
        },
        {
          title: 'CT-OVT',
          dataIndex: 'ct-ovt',
          key: 'ct-ovt',
          width:100,
        },
      ],
    },
    {
      title: 'Tổng dùng (phút)',
      dataIndex: 'totalUsingByMinutes',
      key: 'totalUsingByMinutes',
      children: [
        {
          title: 'Thử việc',
          dataIndex: 'probation',
          key: 'probation',
          width:100,
        },
        {
          title: 'Chính thức',
          dataIndex: 'official',
          key: 'official',
          width:150,
        },
      ],
    },
    {
      title: 'Còn lại (Ngày)',
      dataIndex: 'leftByDays',
      key: 'leftByDays',
      children: [
        {
          title: 'Thử việc',
          dataIndex: 'probation',
          key: 'probation',
          width:100,
        },
        {
          title: 'Chính thức',
          dataIndex: 'official',
          key: 'official',
          width:150,
        },
        {
          title: 'Còn lại',
          dataIndex: 'left',
          key: 'left',
          width:100,
        },
      ],
    },
    {
      title: 'Ghi chú',
      dataIndex: 'description',
      key: 'description',
      width:100,
    }
];

const data: DataType[] = [
  {
    key: '1',
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

const CompensatoryLeaveTable: React.FC = () => {
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

    const closeAddDrawer = () => {
      setAddOpen(false)
      form.resetFields()
    }
  
    const closeUpdateDrawer = () => {
      setUpdateOpen(false)
      form.resetFields()
    }

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    return (
      <>  
        <div style={{paddingLeft:"24px",paddingRight:"24px", backgroundColor:colorBgContainer, marginTop:"20px"}}>
            <Flex justify='space-between' align='center' style={{height:"50px", borderBottom:"1px solid #bbbfc1", marginBottom:"10px"}}>
                <span><b>Quản lý bù</b></span>
                <Row>
                  <Button type="primary" style={{marginLeft:'12px'}} onClick={() => setImportOpen(true)}>Import</Button>
                </Row>
            </Flex>
            <Table 
                size='small'
                scroll={{ x: 11700, y:500}} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                pagination={{ showQuickJumper:true ,defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], locale:{ jump_to: "Đến", page: 'Trang', items_per_page: '/ trang' }, showTotal:(total) => `Tổng ${total} bản ghi`}}  
            />
        </div>
        <Drawer 
        title="Import phép và bù" 
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

export default CompensatoryLeaveTable;