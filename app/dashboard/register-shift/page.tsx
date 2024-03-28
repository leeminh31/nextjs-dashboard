import RegisterShiftTable from "@/app/ui/register-shift/register-shift-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký ca làm việc",
};

const RegisterShiftPage = () => {
  return (
    <>
      <RegisterShiftTable />
    </>
  );
};

export default RegisterShiftPage;
