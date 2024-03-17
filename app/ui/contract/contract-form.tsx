"use client";

import { Form, Select, theme } from "antd";
import React, { useEffect, useState } from "react";
const { Option } = Select;

const ContractForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    padding: "24px",
  };

  const onFinish = () => {
    console.log("submit");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return <></>;
};

export default ContractForm;
