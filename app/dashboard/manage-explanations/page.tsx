import ManageExplanations from "@/app/ui/manage-explanations/manage-explanations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý giải trình",
};

const ManageExplanationsPage = () => {
  return (
    <>
      <ManageExplanations />
    </>
  );
};

export default ManageExplanationsPage;
