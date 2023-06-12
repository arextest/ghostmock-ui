import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from "@ant-design/pro-form";
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import { message, Tabs, Space } from "antd";
import type { CSSProperties } from "react";
import React, { useState } from "react";
import { UserService } from "../../../services/UserService";

import { useHistory } from "react-router-dom";

type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  marginLeft: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

export default () => {
  const [loginType, setLoginType] = useState<LoginType>("phone");

  const history = useHistory();
  return (
    <div style={{ backgroundColor: "white" }}>
      <LoginForm
        title="Github"
        subTitle="全球最大同性交友网站"
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined style={iconStyles}></AlipayCircleOutlined>
            <TaobaoCircleOutlined style={iconStyles}></TaobaoCircleOutlined>
            <WeiboCircleOutlined style={iconStyles}></WeiboCircleOutlined>
          </Space>
        }
        onFinish={async (values) => {
          // await waitTime(2000);
          // {"ricoId":"fasf","password":"asgasga"}
          UserService.login({
            ricoId: values.username,
            password: values.password,
          }).then((res) => {
            // console.log(res)
            localStorage.setItem("token", res.data.access_token);
            history.push("/dashboard");
          });

          console.log(values);
          message.success("提交成功");
          return true;
        }}
      >
        <Tabs
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
          <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
        </Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名: admin or user"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码: ant.design"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
        )}
        {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="mobile"
              placeholder={"手机号"}
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
