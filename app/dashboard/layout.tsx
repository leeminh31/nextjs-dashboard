"use client";

import {
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  faClock,
  faCreditCard,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Skeleton,
  Space,
  theme,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
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
  getItem("Quản lý nhân viên", "sub1", <UserOutlined />, [
    getItem("Danh sách phòng ban", "/dashboard/departments-list"),
    getItem("Danh sách nhân viên", "/dashboard/employee-list"),
    getItem("Quản lý hợp đồng", "/dashboard/contract"),
    // getItem('Điều chuyển nhân viên', '/dashboard/staff-transfer'),
  ]),
  getItem(
    "Báo cáo chấm công",
    "sub2",
    <FontAwesomeIcon icon={faCreditCard} />,
    [
      getItem("Danh sách ca", "/dashboard/shift-list"),
      getItem("Báo cáo theo tháng", "/dashboard/monthly-report"),
      getItem("Danh sách chấm công", "/dashboard/timekeeping-list"),
    ],
  ),
  getItem("Đơn & giải trình", "sub3", <FontAwesomeIcon icon={faPaperPlane} />, [
    getItem("Quản lý đơn yêu cầu", "/dashboard/manage-requests"),
    getItem("Quản lý giải trình", "/dashboard/manage-explanations"),
  ]),

  getItem("Phép & bù", "sub4", <FontAwesomeIcon icon={faClock} />, [
    getItem("Quản lý phép", "/dashboard/on-leave"),
    getItem("Quản lý bù", "/dashboard/compensatory-leave"),
  ]),

  // getItem(
  //   "Phân ca & xuất báo cáo",
  //   "sub5",
  //   <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  //   [
  //     getItem("Xuất báo cáo", "/dashboard/export-report"),
  //     getItem("Phân ca nhân viên", "/dashboard/staff-shifts"),
  //   ],
  // ),
];

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  // const userDetails = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user") || "{}")
  //   : null;
  // const token = localStorage.getItem("token")
  //   ? localStorage.getItem("token")
  //   : null;

  const handleLogOut = async () => {
    setLoading(true);
    localStorage.clear();
    setLoading(false);
    router.replace("/login");
  };

  const itemLogout: MenuProps["items"] = [
    {
      label: (
        <a style={{ padding: "5px" }} onClick={handleLogOut}>
          <Space>
            <LogoutOutlined />
            Đăng xuất
          </Space>
        </a>
      ),
      key: "0",
    },
  ];

  // useEffect(() => {
  //   if (token) {
  //     var user = JSON.parse(token);
  //     var expiredTime = new Date(user.expiredTimeUTC).getTime();
  //     if (expiredTime > Date.now()) {
  //       router.replace("/login");
  //       localStorage.clear();
  //       return;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (token) {
  //     var user = JSON.parse(token);
  //     var expiredTime = new Date(user.expiredTimeUTC).getTime();
  //     if (expiredTime > Date.now()) {
  //       router.replace("/login");
  //       localStorage.clear();
  //       return;
  //     }
  //     setUsername(user.hoTen);
  //   } else {
  //     router.replace("/login");
  //     localStorage.clear();
  //   }
  // }, [token]);

  useEffect(() => {
    const getTokenFromLocalStorage = localStorage?.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;

    console.log("Token", getTokenFromLocalStorage);

    // if (!getTokenFromLocalStorage) {
    //   router.replace("/login");
    //   return;
    // }
    setUsername(getTokenFromLocalStorage?.hoTen);
    setCurrent(pathname);
    setLoading(false);
  }, []);

  return (
    <Skeleton loading={loading} active>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify={"space-between"}>
            <Flex>
              <span
                style={{
                  paddingLeft: "30px",
                  width: "215px",
                  display: "inline-block",
                  fontSize: "24px",
                }}
              >
                <b>HRM Admin</b>
              </span>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              />
            </Flex>
            <Flex style={{ marginRight: "2rem" }} align={"center"}>
              <Avatar
                size={{ xs: 10, sm: 14, md: 18, lg: 30, xl: 36, xxl: 40 }}
                icon={<UserOutlined />}
                style={{ marginRight: "10px" }}
              />
              <h3 style={{ margin: 0, color: "#A35F32" }}>{username}</h3>

              <Dropdown menu={{ items: itemLogout }} trigger={["hover"]}>
                <a
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <DownOutlined style={{ color: "#000" }} />
                  </Space>
                </a>
              </Dropdown>
              {/* <FontAwesomeIcon style={{marginLeft: "10px"}} icon={faChevronDown} /> */}
            </Flex>
          </Flex>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: colorBgContainer }}
            width={250}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              inlineCollapsed={collapsed}
              selectedKeys={[current]}
              items={items}
              onClick={(e) => {
                router.push(`${e.key}`);
                setCurrent(e.key);
              }}
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
    </Skeleton>
  );
}
