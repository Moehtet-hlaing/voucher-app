import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiDocumentDuplicate,
  HiMiniComputerDesktop,
} from "react-icons/hi2";
import Container from "../components/Container";

const DashboardPage = () => {
  return (
    <Container>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 ">
        <div className=" col-span-1">
          <ModuleBtn
            name={"Product Module"}
            icon={<HiCircleStack className=" size-12" />}
            url={"/product"}
          />
        </div>
        <div className=" col-span-1">
          <ModuleBtn
            name={"Sale Module"}
            icon={<HiMiniComputerDesktop className=" size-12"/>}
            url={"/sale"}
          />
        </div>
        <div className=" col-span-1">
          <ModuleBtn
            name={"Voucher Module"}
            icon={<HiDocumentDuplicate className=" size-12"/>}
            url={"/voucher"}
          />
        </div>
      </section>
    </Container>
  );
};

export default DashboardPage;
