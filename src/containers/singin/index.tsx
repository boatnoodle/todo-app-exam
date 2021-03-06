import React from "react";
import { Col, Row, Form, Input, Button, notification } from "antd";
import fetch from "isomorphic-unfetch";
import { API_ENDPOINT } from "utils/constant";
import { useHistory } from "react-router-dom";

export const SignIn: React.FC = () => {
  const history = useHistory();

  const signIn = async (payload: { username: string; password: string }) => {
    return await fetch(`${API_ENDPOINT}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ marginBottom: "24px" }}>
        <Col>เข้าสู่ระบบ</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={async ({ username, password }) => {
              const response = await signIn({ username, password });
              const data = await response.json();
              if (response?.status === 401) {
                notification["error"]({
                  message: "Invalid username or password",
                  description: "Please try again",
                });
              } else if (response?.status === 200) {
                localStorage.setItem("token", data?.token);
                history.push("/todo-list");
              }
            }}
          >
            <Form.Item
              label="ชื่อผู้ใช้งาน"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="รหัสผ่าน"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Row gutter={6} justify="center">
                <Col>
                  <Button type="primary" htmlType="submit">
                    เข้าสู่ระบบ
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    onClick={() => history.push("/sign-up")}
                  >
                    สมัครสมาชิก
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
