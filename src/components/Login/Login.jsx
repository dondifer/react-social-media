import { Button, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { notification } from "antd";

const Login = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { isSuccess, isError, message, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
      if (token) {
        navigate(`/profile`);
      }
    }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onFinish = (values) => {
    dispatch(login(formData));
    console.log("Success:", formData);
  };

  const onChange = (e) => {
    const name = e.target.id.split("_")[1];
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div>
        <h2>Login</h2>
        <Form
          name="normal-login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            onChange={onChange}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            onChange={onChange}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
