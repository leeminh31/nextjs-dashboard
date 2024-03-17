import ShiftListTable from "@/app/ui/shift-list/shift-list-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách ca",
};

const ShiftListPage = () => {
  return (
    <>
      {/* <ShiftListForm/> */}
      <ShiftListTable />
    </>
  );
};

export default ShiftListPage;
