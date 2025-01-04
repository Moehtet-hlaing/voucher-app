import printJS from "print-js";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import "../index.css";
import html2pdf from "html2pdf.js";
import reactUseCookie from "react-use-cookie";


const VoucherCard = () => {
  const [token] = reactUseCookie("my_token");
  const fetcher = (url) => fetch(url,{headers:{"Authorization":`Bearer ${token}`}}).then((res) => res.json());
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/vouchers/${id}`,
    fetcher
  );
  const handlePrint = () => {
    printJS({
      printable: "printArea",
      type: "html",
     targetStyles: ["*"],
    })
  }
  const handlePdf = () => {
    const element = document.getElementById("printArea");

    // Options for html2pdf
    const options = {
      margin: 10,
      filename: "exported-content.pdf",
      html2canvas: {
        scale: 4, // Scale for higher quality PDF
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait", // A4 paper format and portrait orientation
      },
    };

    // Convert the HTML element to PDF and trigger download/print
    html2pdf()
      .from(element)
      .set(options)
      .save() // Save the PDF file automatically
  }

  if (isLoading) return <p>Loading...</p>;
  console.log(data);
  return (
    <div className="flex gap-5">
      <div id="printArea"  className="w-[14.8cm]  mx-auto p-5 bg-white shadow-lg rounded-lg">
        {/* Invoice Content */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between mb-8">
            <div className="text-left w-1/2">
              <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
              <p className="text-gray-600 ">{data?.data?.voucher_id}</p>
            </div>
            <div className="text-right w-1/2">
              <p className="mb-2 ">Invoice to</p>
              <p className="font-semibold">{data?.data?.customer_name}</p>
              <p className="text-gray-600 ">{data?.data?.sale_date}</p>
            </div>
          </div>

          {/* Invoice Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 ">No</th>
                <th className="text-left py-3 ">Description</th>
                <th className="text-right py-3 ">Qty</th>
                <th className="text-right py-3 ">Price</th>
                <th className="text-right py-3 ">Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.records.map((record, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 ">{index + 1}</td>
                  <td className="py-3 ">
                    {record.product.product_name}
                  </td>
                  <td className="text-right py-3 ">{record.quantity}</td>
                  <td className="text-right py-3 ">
                    {record.product.price}
                  </td>
                  <td className="text-right py-3 ">{record.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-b border-gray-200">
                <td colSpan={4} className="py-3  text-end">
                  Total
                </td>
                <td className="py-3  text-end">{parseFloat(data?.data?.total).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td colSpan={4} className="py-3  text-end">
                  Tax
                </td>
                <td className="py-3  text-end">{parseFloat(data?.data?.tax).toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td colSpan={4} className="py-3  text-end">
                  Net Total
                </td>
                <td className="py-3  text-end">{parseFloat(data?.data?.net_total).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Payment Details */}
          <div className=" border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold mb-3 ">
                  Payment Transfer to
                </h3>
                <div className="space-y-2 w-1/2">
                  <p >Kpay,Wave: 09250152018</p>
                  <p >KBZ Bank : 0273010270502560</p>
                  <p >AYA Bank : 2000367412</p>
                </div>
              </div>
              <div className="flex flex-col text-end ">
                <div className=" ">
                  <h3 className="font-bold  mb-3 ">MMS IT</h3>
                </div>
                <div className=" space-y-2 ">
                  <p >48, 1st Floor, Shan Kone St.</p>
                  <p >+959-250-152-018</p>
                  <p >enquiry@mms-it.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 mx-auto  border-t-2 p-5">
            <p className="text-center "> Thanks to You</p>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handlePrint} className= " bg-blue-500 text-white px-4 py-2 rounded mt-4">Print</button>
        <button onClick={handlePdf} className= " bg-blue-500 text-white px-4 py-2 rounded mt-4">Download PDF</button>
      </div>

    </div> 
   
  );
};

export default VoucherCard;
