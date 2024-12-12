import React from "react";
import { HiOutlineTrash, HiPencil, HiPlus, HiSearch } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";

const VoucherList = () => {
  return (
    <section>
      <div className="flex justify-between mb-3 px-5">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search voucher"
            />
          </div>
        </div>
        <div className="">
          <Link
            to={"/sale"}
            type="button"
            className="text-white gap-2 bg-blue-700 hover:bg-be-lu800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center"
          >
            Create Sale
            <HiComputerDesktop />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hidden last:table-row odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td colSpan={5} className="px-6 py-4  text-center">
                There is no voucher.
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">1</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Kyaw Kyaw
              </th>
              <td className="px-6 py-4 text-end">kyaw@gmail.com</td>
              <td className="px-6 py-4 text-end">
                <p className="text-xs">7 Sep 2021</p>
                <p className="text-xs">10:43 AM</p>
              </td>
              <td className="px-4 py-2 text-end">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className="px-3 py-2 text-sm font-medium text-slate-600 bg-transparent border border-slate-600 rounded-s-lg hover:bg-slate-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-slate-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  >
                    <HiPencil />
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-transparent border border-slate-600 rounded-e-lg hover:bg-slate-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-slate-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  >
                    <HiOutlineTrash />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VoucherList;
