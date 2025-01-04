import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiDocumentDuplicate,
  HiMiniComputerDesktop,
  HiUserCircle,
} from "react-icons/hi2";
import Container from "../components/Container";
import Logout from "../components/Logout";

const DashboardPage = () => {
  return (
    <Container>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        <div className=" col-span-1">
          <ModuleBtn
            name={"Product Module"}
            icon={<HiCircleStack className=" size-12" />}
            url={"/dashboard/product"}
          />
        </div>
        <div className=" col-span-1">
          <ModuleBtn
            name={"Sale Module"}
            icon={<HiMiniComputerDesktop className=" size-12" />}
            url={"/dashboard/sale"}
          />
        </div>
        <div className=" col-span-1">
          <ModuleBtn
            name={"Voucher Module"}
            icon={<HiDocumentDuplicate className=" size-12" />}
            url={"/dashboard/voucher"}
          />
        </div>
        <div className=" col-span-1">
          <ModuleBtn
            name={"User Profile"}
            icon={<HiUserCircle className=" size-12" />}
            url={"/dashboard/user-profile"}
          />
        </div>
      </section>
      <div className=" text-end underline text-blue-500 mt-10">
        <Logout />
      </div>
    </Container>
  );
};

export default DashboardPage;
