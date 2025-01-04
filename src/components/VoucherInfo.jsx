import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { tailspin } from "ldrs";
import toast from "react-hot-toast";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../stores/useRecordStore";
import { useNavigate } from "react-router-dom";
import reactUseCookie from "react-use-cookie";
tailspin.register();

const VoucherInfo = () => {
  const { records, resetRecords } = useRecordStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [token] = reactUseCookie("my_token");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const generateInvoiceNumber = () => {
    const datePart = new Date()
      .toISOString()
      .slice(0, 10) // Get current date as YYYY-MM-DD
      .replace(/-/g, ""); // Remove dashes
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit random number
    return `INV-${datePart}-${randomPart}`; // Example: INV-20240608-1234
  };

  const onSubmit = async (data) => {
    setIsSending(true);
    const total = records.reduce((pv, cv) => pv + cv.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;
    const currentVoucher = { ...data, records, total, tax, net_total };
    console.log(currentVoucher);

    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(currentVoucher),
    });
    const result = await res.json();
    console.log(result);

    if (res.status === 201) {
      setIsSending(false);
      toast.success("Voucher created successfully");
      resetRecords();
      reset();

    }else{
      toast.error(result.message)
    }

    if (data.redirect_to_detail) {
      navigate(`/dashboard/voucher/details/${result.data.id}`);
    }
  };
  return (
    <div className=" grid grid-cols-4 gap-3">
      <div className="col-span-3 ">
        <SaleForm />
        <VoucherTable />
      </div>
      <div className="col-span-1">
        <form
          id="infoForm"
          action=""
          className=" flex flex-col h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1  gap-3">
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="first_name"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    errors.voucher_id ? "text-red-500" : ""
                  }`}
                >
                  Voucher ID
                </label>
                <input
                  defaultValue={generateInvoiceNumber()}
                  type="text"
                  {...register("voucher_id", {
                    required: true,
                  })}
                  className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
       block w-full p-2.5 ${
         errors.voucher_id
           ? "border-red-500 focus:border-red-500 focus:ring-red-500"
           : ""
       }`}
                />
                {errors.voucher_id?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm ">
                    Product name is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="first_name"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    errors.customer_name ? "text-red-500" : ""
                  }`}
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  {...register("customer_name", {
                    required: true,
                  })}
                  className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
       block w-full p-2.5 ${
         errors.customer_name
           ? "border-red-500 focus:border-red-500 focus:ring-red-500"
           : ""
       }`}
                />
                {errors.customer_name?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm ">
                    Customer name is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="">
                <label
                  htmlFor="first_name"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    errors.customer_email ? "text-red-500" : ""
                  }`}
                >
                  Customer Email
                </label>
                <input
                  type="text"
                  {...register("customer_email", {
                    required: true,
                  })}
                  className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
       block w-full p-2.5 ${
         errors.customer_email
           ? "border-red-500 focus:border-red-500 focus:ring-red-500"
           : ""
       }`}
                />
                {errors.customer_email?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm ">
                    Customer email is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-8">
                <label
                  htmlFor="first_name"
                  className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                    errors.sale_date ? "text-red-500" : ""
                  }`}
                >
                  Sale Date
                </label>
                <input
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  type="date"
                  {...register("sale_date", {
                    required: true,
                  })}
                  className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
       block w-full p-2.5 ${
         errors.sale_date
           ? "border-red-500 focus:border-red-500 focus:ring-red-500"
           : ""
       }`}
                />
                {errors.sale_date?.type === "required" && (
                  <p role="alert" className="text-red-500 text-sm ">
                    Sale date is required
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end gap-3 mt-auto">
            <div className="flex items-center">
              <label
                htmlFor="redirect-to-detail"
                className="me-2 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                Redirect to voucher detail
              </label>
              <input
                form="infoForm"
                id="redirect-to-detail"
                type="checkbox"
                {...register("redirect_to_detail")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="all-correct"
                className="me-2 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                Make sure all fields are correct
              </label>
              <input
                required
                form="infoForm"
                id="all-correct"
                type="checkbox"
                {...register("all_correct")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button
              form="infoForm"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <div className="flex justify-between items-center">
                Confirm Voucher
                {isSending && ( // Default values shown
                  <l-tailspin
                    size="20"
                    stroke="5"
                    speed="0.9"
                    color="white"
                  ></l-tailspin>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherInfo;
