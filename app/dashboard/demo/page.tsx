"use client"

import React, { useState } from 'react';
import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, theme, Flex, Avatar } from 'antd';
import DemoPage from '@/app/ui/demo/demo';
import DepartmentsList from '@/app/ui/departments-list/departments-list';
import EmployeeList from '@/app/ui/employee-list/employee-list';
import StaffTransfer from '@/app/ui/staff-transfer/staff-transfer';
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faClock, faCalendarCheck, faCreditCard} from '@fortawesome/free-regular-svg-icons'
import { faWrench, faArrowRightFromBracket, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ShiftList from '@/app/ui/shift-list/shift-list';
import TimekeepingList from '@/app/ui/timekeeping-list/timekeeping-list';
import ManageRequests from '@/app/ui/manage-requests/manage-requests';
import ManageExplanations from '@/app/ui/manage-explanations/manage-explanations';
import OnLeave from '@/app/ui/on-leave/on-leave';
import CompensatoryLeave from '@/app/ui/compensatory-leave/compensatory-leave';
import ExportReport from '@/app/ui/export-report/export-report';
import StaffShifts from '@/app/ui/staff-shifts/staff-shifts';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Quản lý nhân viên', 'sub1', <UserOutlined />, [
    getItem('Danh sách phòng ban', 'departments-list'),
    getItem('Danh sách nhân viên', 'employee-list'),
    getItem('Quản lý hợp đồng', 'demo'),
    getItem('Điều chuyển nhân viên', 'staff-transfer'),
  ]),
  getItem('Báo cáo chấm công', 'sub2', <FontAwesomeIcon icon={faCreditCard} />,[
    getItem('Danh sách ca', 'shift-list'),
    getItem('Báo cáo theo tháng', 'monthly-report'),
    getItem('Danh sách chấm công', 'timekeeping-list'),
  ]),
  getItem('Đơn & giải trình', 'sub3', <FontAwesomeIcon icon={faPaperPlane} />,[
    getItem('Quản lý đơn yêu cầu', 'manage-requests'),
    getItem('Quản lý giải trình', 'manage-explanations'),
  ]),

  getItem('Phép & bù', 'sub4', <FontAwesomeIcon icon={faClock} />,[
    getItem('Quản lý phép', 'on-leave'),
    getItem('Quản lý bù', 'compensatory-leave'),
  ]),

  getItem('Phân ca & xuất báo cáo', 'sub5', <FontAwesomeIcon icon={faArrowRightFromBracket} />, [
    getItem('Xuất báo cáo', 'export-report'),
    getItem('Phân ca nhân viên', 'staff-shifts'),
  ]),
];

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem]= useState('demo');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const componentsSwtich = (key: any) => {
    console.log(key)
    switch (key) {
      case 'demo':
        return (<DemoPage/>);
      case 'departments-list':
        return (<DepartmentsList/>);
      case 'employee-list':
        return (<EmployeeList/>);
      case 'staff-transfer':
        return (<StaffTransfer/>);
      case 'shift-list':
        return (<ShiftList/>);
      case 'timekeeping-list':
        return (<TimekeepingList />);
      case 'manage-requests':
        return (<ManageRequests />);
      case 'manage-explanations':
        return (<ManageExplanations />);
      case 'on-leave':
        return (<OnLeave/>)
      case 'compensatory-leave':
        return (<CompensatoryLeave/>)
      case 'export-report':
        return (<ExportReport/>)
      case 'staff-shifts':
        return (<StaffShifts/>)
      default:
        break;
    }
  };

  return (
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify= {'space-between'}>
            <Flex>
              <span style={{paddingLeft:"30px", width:"215px", display:"inline-block"}}><b>HRM Admin</b></span>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  backgroundColor:'#fff',
                  color:"#000"
                }}
              />
            </Flex>
            <Flex style={{marginRight: "2rem"}} align={'center'}>
              <Avatar
                size={{ xs: 10, sm: 14, md: 18, lg: 30, xl: 36, xxl: 40 }}
                icon={<AntDesignOutlined />}
                style={{marginRight: "10px"}}
              />
              <h3 style={{margin:0}}>HNCS Yen Bui</h3>
              <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faChevronDown} />
            </Flex>
          </Flex>
          
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer}} width={250}>
          <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['demo']}
              defaultOpenKeys={['sub1']}
              inlineCollapsed={collapsed}
              items={items}
              onClick={(e) => 
                setSelectedMenuItem(e.key)}
            />
          </Sider>
        <Content
          style={{
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {componentsSwtich(selectedMenuItem)}
        </Content>
      </Layout>
          
      </Layout>
  );
};

export default App;
