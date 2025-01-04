import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { create } from "zustand";
import useRecordStore from "../stores/useRecordStore";
import toast from "react-hot-toast";
import reactUseCookie from "react-use-cookie";

const SaleForm = () => { 
  const [token] = reactUseCookie("my_token");
  const fetcher = (url) => fetch(url,{headers:{"Authorization":`Bearer ${token}`}}).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + "/products?limit=100",
    fetcher
  );
//   if(isLoading) return <p>Loading...</p>;
// console.log(data);
  
  const {records, addRecord, changeQuantity } = useRecordStore();
  // console.log(import.meta.env.VITE_API_URL + "/products");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);
    const currentProductId = currentProduct.id;
    const isExisted = records.find(({product:{id}}) => id === currentProductId);
    if (isExisted){
      changeQuantity(isExisted.product_id, data.quantity);
      
    } else{
      addRecord({
        // id: Date.now(),
        product: currentProduct,
        product_id: currentProductId,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      });
      toast.success("Record created successfully");
      reset();
    }
    
  };



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="createRecordForm">
        <div className="grid grid-cols-4 gap-3 bg-blue-50 rounded-lg p-5">
          <div className="col-span-2">
            <label
              htmlFor="productSelect"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Product
            </label>
            <select
              {...register("product")}
              required
              id="productSelect"
              // name="product_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a product</option>
              {!isLoading && 
              (
                data.data.map((product) => (
                  <option key={product.id} value={JSON.stringify(product)}>
                    {product.product_name}
                  </option>
                ))
              )
              }
            </select>
          </div>
          <div className="col-span-1">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Quantity
              </label>
              <input
                {...register("quantity")}
                type="number"
                id="quantity"
                name="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="w-full h-full text-blue-700 border border-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 0  focus:outline-none "
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
