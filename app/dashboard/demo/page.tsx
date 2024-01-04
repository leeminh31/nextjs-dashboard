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
import {useRouter} from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faClock, faCalendarCheck, faCreditCard} from '@fortawesome/free-regular-svg-icons'
import { faWrench, faArrowRightFromBracket, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DepartmentsList from '@/app/ui/departments-list/departments-list';
import EmployeeList from '@/app/ui/employee-list/employee-list';


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
    getItem('Điều chuyển nhân viên', '4'),
  ]),
  getItem('Báo cáo chấm công', '5', <FontAwesomeIcon icon={faCreditCard} />),
  getItem('Đơn & giải trình', '6', <FontAwesomeIcon icon={faPaperPlane} />),

  getItem('Phép & bù', '7', <FontAwesomeIcon icon={faClock} />),

  getItem('Phân ca & xuất báo cáo', 'sub2', <FontAwesomeIcon icon={faArrowRightFromBracket} />, [
    getItem('Option 9', '8'),
    getItem('Option 10', '9'),
  ]),
  getItem('KPIs', '10', <FontAwesomeIcon icon={faArrowRightFromBracket} />),
  getItem('Đặt phòng họp', '11', <FontAwesomeIcon icon={faCalendarCheck} />),
  getItem('Cấu hình khóa', '12', <FontAwesomeIcon icon={faWrench} />),
  getItem('Báo cáo tuần', '13', <BookOutlined />),
];

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem]= useState('demo');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const componentsSwtich = (key) => {
    console.log(key)
    switch (key) {
      case 'demo':
        return (<DemoPage/>);
      case 'departments-list':
        return (<DepartmentsList/>);
      case 'employee-list':
        return (<EmployeeList/>);
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
                size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 40, xxl: 50 }}
                icon={<AntDesignOutlined />}
                style={{marginRight: "10px"}}
              />
              HCNS YÊN BUI
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
