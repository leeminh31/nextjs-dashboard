import CompensatoryLeave from "@/app/ui/compensatory-leave/compensatory-leave";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bù",
};

export default function CompensatoryLeavePage() {
  return (
    <>
      <CompensatoryLeave />
    </>
  );
}
