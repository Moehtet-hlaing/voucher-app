import React, { useState } from "react";
import { HiOutlineTrash, HiPencil, HiPlus, HiSearch } from "react-icons/hi";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductRow from "./ProductRow";
import ProductListEmptyStage from "./ProductListEmptyStage";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import reactUseCookie from "react-use-cookie";


const ProductList = () => {
  // const [search, setSearch] = useState("");
  const [token] = reactUseCookie("my_token");
  const fetcher = (url) => fetch(url,{headers:{"Authorization":`Bearer ${token}`}}).then((res) => res.json());
  const [fetchUrl, setFetchUrl] = useState(
    `${import.meta.env.VITE_API_URL}/products`
  );
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearchInput = (e) => {
    // setSearch(e.target.value);
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`);
  };
  if (isLoading) return <p>Loading...</p>;
  console.log(data);
  const updateFetchUrl = (url) => setFetchUrl(url);

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
              // value={search}
              onChange={handleSearchInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search product"
            />
          </div>
        </div>
        <div className="">
          <Link
            to="/dashboard/product/create"
            type="button"
            className="text-white gap-2 bg-blue-700 hover:bg-be-lu800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center"
          >
            Add new product
            <HiPlus />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md mb-5 sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data?.data?.length ? (
              data?.data?.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))
            ) : (
              <ProductListEmptyStage />
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl}/>}
    </section>
  );
};

export default ProductList;
