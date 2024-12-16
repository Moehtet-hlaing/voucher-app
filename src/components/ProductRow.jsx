import React, { useState } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import { useSWRConfig } from "swr";
import { zoomies } from "ldrs";
import toast from "react-hot-toast";

zoomies.register();

// Default values shown

const ProductRow = ({ product: { id, product_name, price, created_at } }) => {
  const date = new Date(created_at);
  const currentDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const { mutate } = useSWRConfig();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteBtn = async () => {
    setDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
    });
    mutate(import.meta.env.VITE_API_URL + "/products");
    setDeleting(false);
   toast.success("Product deleted successfully");
  };
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">{price}</td>
      <td className="px-6 py-4 text-end">
        <p className="text-xs">{currentDate}</p>
        <p className="text-xs">{currentTime}</p>
      </td>
      <td className="px-4 py-2 text-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className="flex justify-center items-center size-10 text-sm font-medium text-slate-600 bg-transparent border border-slate-600 rounded-s-lg
            "
          >
            <HiPencil />
          </button>
          <button
            onClick={handleDeleteBtn}
            type="button"
            className="size-10 text-sm font-medium text-slate-600 bg-transparent border 
            border-slate-600 rounded-e-lg  dark:border-white 
            dark:text-white flex justify-center items-center"
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
  );
};

export default ProductRow;