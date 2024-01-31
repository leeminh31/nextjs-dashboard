"use client"

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, theme, Flex, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {usePathname, useRouter} from 'next/navigation';
import { faPaperPlane, faClock, faCalendarCheck, faCreditCard} from '@fortawesome/free-regular-svg-icons'
import { faWrench, faArrowRightFromBracket, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

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
    getItem('Danh sách phòng ban', '/dashboard/departments-list'),
    getItem('Danh sách nhân viên', '/dashboard/employee-list'),
    getItem('Quản lý hợp đồng', '/dashboard/contract'),
    getItem('Điều chuyển nhân viên', '/dashboard/staff-transfer'),
  ]),
  getItem('Báo cáo chấm công', 'sub2', <FontAwesomeIcon icon={faCreditCard} />,[
    getItem('Danh sách ca', '/dashboard/shift-list'),
    getItem('Báo cáo theo tháng', '/dashboard/monthly-report'),
    getItem('Danh sách chấm công', '/dashboard/timekeeping-list'),
  ]),
  getItem('Đơn & giải trình', 'sub3', <FontAwesomeIcon icon={faPaperPlane} />,[
    getItem('Quản lý đơn yêu cầu', '/dashboard/manage-requests'),
    getItem('Quản lý giải trình', '/dashboard/manage-explanations'),
  ]),

  getItem('Phép & bù', 'sub4', <FontAwesomeIcon icon={faClock} />,[
    getItem('Quản lý phép', '/dashboard/on-leave'),
    getItem('Quản lý bù', '/dashboard/compensatory-leave'),
  ]),

  getItem('Phân ca & xuất báo cáo', 'sub5', <FontAwesomeIcon icon={faArrowRightFromBracket} />, [
    getItem('Xuất báo cáo', '/dashboard/export-report'),
    getItem('Phân ca nhân viên', '/dashboard/staff-shifts'),
  ]),
];

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState('')
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname)

  useEffect(() => {
    setCurrent(pathname)
  },[])

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
              inlineCollapsed={collapsed}
              selectedKeys={[current]}
              items={items}
              onClick={(e) => {
                  router.push(`${e.key}`)
                  setCurrent(e.key)
                }
              }
            />
          </Sider>
          <Content
            style={{
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
  );
}
