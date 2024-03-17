"use client";

import NhanVienApi from "@/app/api/nhanvien";
import { HRMSystemApi } from "@/app/constant/constant";
import { SearchNhanVienRequest } from "@/app/models/nhanvien/search-nhanvien-request";
import { Form, Select, theme } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const EmployeeListForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgContainer,
    marginBottom: "24px",
    padding: "24px",
  };

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const searchData: SearchNhanVienRequest = {
      hoTen: values.hoTen,
      maNhanVien: values.maNhanVien,
      idVanTay: parseInt(values.idVanTay),
      maPhongBan: parseInt(values.phongBan),
      chucVu: values.chucVu,
    };

    getEmployeeByParams(searchData);
  };

  const getEmployeeByParams = async (searchRequest: SearchNhanVienRequest) => {
    let response = await NhanVienApi.getNhanVien(searchRequest);
    if (response.statusCode === "200") {
      console.log(response.data);
      setDepartments(response.data);
    } else {
      console.log(response.message);
    }
  };

  const getAllDepartments = async () => {
    try {
      const response = await fetch(HRMSystemApi + "/PhongBan", {
        method: "GET", // or 'PUT'
      });
      const result = await response.json();
      console.log("Success:", result);
      setDepartments(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  useEffect(() => {
    setLoading(false);
    getEmployeeByParams({
      hoTen: null,
      maNhanVien: null,
      idVanTay: null,
      maPhongBan: null,
      chucVu: null,
    });
    getAllDepartments();
  }, []);

  return <></>;
};

export default EmployeeListForm;
