import React, { useRef, useState } from "react";
import {HiSearch, HiX } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Container from "./Container";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import { debounce } from "lodash";
import Pagination from "./Pagination";
import reactUseCookie from "react-use-cookie";


const VoucherList = () => {
  const [token] = reactUseCookie("my_token");
  const fetcher = (url) => fetch(url,{headers:{"Authorization":`Bearer ${token}`}}).then((res) => res.json());
  const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_API_URL}/vouchers`);
  // const [search,setSearch] = useState("");
  // const [fetchUrl, setFetchUrl] = useState(`${import.meta.env.VITE_API_URL}/vouchers`);
  const {data, error , isLoading} = useSWR(
    fetchUrl    ,fetcher);
    // const handleSearch = (e) => {
    //   setSearch(e.target.value);
    //   // console.log(e.target.value);
    // }

    const handleSearch = debounce((e) => {
      // setSearch(e.target.value);
      setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`);
    },500);
    const searchInput = useRef();
    const handleClear = () => {
      // setSearch("");
      searchInput.current.value = "";
    }
    const updateFetchUrl = (url) => setFetchUrl(url);
    if(isLoading) return <p>Loading...</p>;
    // console.log(data);
  return (
    <section>
      
      <div className="flex justify-between mb-3 px-5">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
            ref = {searchInput}
              onChange={handleSearch}
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search voucher"
            />
            {/* {search && <button onClick={handleClear} className="size-6 absolute top-0 end-1 bottom-0 m-auto text-red-600"><HiX className=" active:scale-90 duration-200"/></button>} */}
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
            {isLoading ? <tr className="hidden last:table-row odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td colSpan={5} className="px-6 py-4  text-center">
                Loading...
              </td>
            </tr> : (data?.data?.map((voucher, index) => 
            <VoucherListRow key={voucher.id} voucher={voucher} />
          ))
           }
          </tbody>
        </table>
      </div>
      {!isLoading &&       <Pagination links={data?.links} meta={data?.meta} updateFetchUrl={updateFetchUrl}/>
    }
          </section>
  );
};

export default VoucherList;
