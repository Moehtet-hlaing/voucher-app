import React, { useState } from 'react'
import { HiOutlineTrash, HiPencil, HiPlus, HiSearch } from "react-icons/hi";
import ShowDate from './ShowDate';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import { zoomies } from "ldrs";

zoomies.register();


const VoucherListRow = ({voucher:{id,voucher_id,customer_name,customer_email,sale_date}}) => {
    const { mutate } = useSWRConfig();
    const [deleting, setDeleting] = useState(false);
  
    const handleDeleteBtn = async () => {
      setDeleting(true);
      await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
        method: "DELETE",
      });
      mutate(import.meta.env.VITE_API_URL + "/vouchers");
      setDeleting(false);
     toast.success("Voucher deleted successfully");
    };
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{voucher_id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {customer_name}
              </th>
              <td className="px-6 py-4 text-end">{customer_email}</td>
              <td className="px-6 py-4 text-end">
                <ShowDate timestamp={sale_date} />
              </td>
              <td className="px-4 py-2 text-end">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                 
                  <button
                    onClick={handleDeleteBtn}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-transparent border border-slate-600 rounded-lg hover:bg-slate-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-slate-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                  >
                    {deleting ? (
              <l-zoomies
                size="10"
                stroke="5"
                bg-opacity="0.1"
                speed="1.4"
                color="black"
              ></l-zoomies>
            ) : (
              <HiOutlineTrash />
            )}
                  </button>
                </div>
              </td>
            </tr>
  )
}

export default VoucherListRow