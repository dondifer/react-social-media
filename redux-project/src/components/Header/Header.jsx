/* eslint-disable react/prop-types */
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { token } = useSelector((state) => state.auth);
  const items = !token
    ? [
        {
          label: "Login",
          key: "",
          icon: <LoginOutlined />,
        },
        {
          label: "Register",
          key: "register",
          icon: <UserAddOutlined />,
        },
      ]
    : [
        {
          label: "Profile",
          key: "profile",
          icon: <ProfileOutlined />,
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ];
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    if (e.key !== "logout") {
      navigate(`/${e.key}`);
    } else {
      setCurrent("");
      navigate(`/`);
    }

    setCurrent(e.key);
  };

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      setCurrent("products");
    }
  }, [token]);
  return (
    <Menu
      className="menu"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
