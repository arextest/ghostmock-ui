import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, Dropdown, Avatar } from "antd";
import "./index.css";
import { LoginOutlined } from "@ant-design/icons";
// import Sider from "antd/es/layout/Sider";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  InsertRowBelowOutlined,
  PhoneOutlined,
  FileSearchOutlined,
  ApartmentOutlined,
  BlockOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import { HashRouter, useHistory } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../../routers";
import logoSvg from "../../assets/img/logo.svg";
import { matchRoute, loginOut, getUrlByEmployNO } from "../../utils/util";

export default (props: any) => {
  const [collapsed, setcollapsed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === "/") {
      history.push("/mocks");
    }
  }, [history.location.pathname]);

  interface Breadcrumb {
    path: string;
    name: string;
    type: string;
  }
  type PathName = string;

  //登录登出
  const userDropdownRender = (
    <>
      <Menu selectable={false}>
        <Menu.Item key="user:logout" className="site-layout-personal-item">
          <LoginOutlined />
          <span onClick={loginOut}>退出登陆</span>
        </Menu.Item>
      </Menu>
    </>
  );

  // 面包屑配置，type:'jumpable'可跳转，primary 普通的
  const breadcrumb: Record<PathName, Breadcrumb[]> = {
    // "/activity-manager": ["activity-manager"],
    // "/feedback": ["feedback"],
    // "/account/settings": ["account", "settings"],
    // "/account/center": ["account", "center"],
    // "/airflow-code": [
    //   {
    //     path: "/airflow-code",
    //     name: "Airflow Code",
    //     type: "jumpable",
    //   },
    // ],
    "/mocks": [
      {
        path: "/mocks",
        name: "",
        type: "jumpable",
      },
    ],
    "/resources": [
      {
        path: "/resources",
        name: "",
        type: "jumpable",
      },
    ],
    "/namespaces": [
      {
        path: "/namespaces",
        name: "",
        type: "jumpable",
      },
    ],
    // "/airflow-code/:id/edit": [
    //   {
    //     path: "/airflow-code",
    //     name: "Airflow Code",
    //     type: "jumpable",
    //   },
    //   {
    //     path: "/airflow-code",
    //     name: "编辑",
    //     type: "primary",
    //   },
    // ],
    // "/airflow-code/create": [
    //   {
    //     path: "/airflow-code",
    //     name: "Airflow Code",
    //     type: "jumpable",
    //   },
    //   {
    //     path: "",
    //     name: "创建",
    //     type: "primary",
    //   },
    // ],
  };

  function f() {
    for (let s in breadcrumb) {
      if (matchRoute(s, history.location.pathname)) {
        return breadcrumb[s];
      }
    }
    return [];
  }

  const breadcrumbMap = f();
  return (
    <div id="components-layout-demo-side">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => {
            setcollapsed(true);
          }}
        >
          <div
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          >
            <img src={logoSvg} alt="" style={{ width: "32px" }} />
            <span>ghost Mock</span>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onSelect={(val) => {
              history.push("/" + val.keyPath.reverse().join("/"));
            }}
          >
            <Menu.Item key="mocks" icon={<ApartmentOutlined />}>
              Mocks
            </Menu.Item>
            <Menu.Item key="resources" icon={<BlockOutlined />}>
              Resources
            </Menu.Item>
            <Menu.Item key="namespaces" icon={<FileDoneOutlined />}>
              Namespaces
            </Menu.Item>
            {/* <Menu.Item key="action" icon={<ApartmentOutlined />}>
              Action
            </Menu.Item>
            <Menu.Item key="airflow-code" icon={<BoxPlotOutlined />}>
              Airflow Code
            </Menu.Item>
            <Menu.Item key="job" icon={<ContainerOutlined />}>
              Job
            </Menu.Item>
            <Menu.Item key="task" icon={<FileDoneOutlined />}>
              Task
            </Menu.Item>
            <Menu.Item key="elfinder" icon={<FileSearchOutlined />}>
              Elfinder
            </Menu.Item> */}
            {
              <SubMenu key="account" icon={<UserOutlined />} title="Settings">
                <Menu.Item key="center">Enviroment</Menu.Item>
                <Menu.Item key="settings">Settings</Menu.Item>
              </SubMenu>
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Dropdown
              className="site-layout-personal"
              overlay={userDropdownRender}
              placement="topRight"
            >
              {/* getUrlByEmployNO(localStorage.getItem('Employee')) */}
              <span>
                <Avatar
                  src={getUrlByEmployNO(
                    localStorage.getItem("Employee") || "0"
                  )}
                />{" "}
                {localStorage.getItem("DisplayName") || "未登录"}
              </span>
            </Dropdown>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {breadcrumbMap.map((item, index: number) => (
                <Breadcrumb.Item key={index}>
                  {
                    {
                      jumpable: (
                        <a
                          onClick={() => {
                            history.push(item.path);
                          }}
                        >
                          {item.name}
                        </a>
                      ),
                      primary: <span>{item.name}</span>,
                    }[item.type]
                  }
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 0 }}>
              <HashRouter>{renderRoutes(props.route.children)}</HashRouter>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
