import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import { BillDTO } from "../interfaces/BillDTO";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import BillService from "../services/BillService";
import DeleteIcon from "../icons/DeleteIcon";
import { mapBillToTableRepresenation } from "../interfaces/IBillTableRepresentation";

let bills_list: BillDTO[] = [
  {
    billId: "1",
    billEntries: [],
    date: "11.12.2022",
    totalPrice_NoVAT: 123,
    TotalPrice_VAT: 231,
  },
];
const Bills = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [bills, setBills] = useState<BillDTO[]>();

  const getAllBills = async () => {
    let response = await BillService.getAllBills({ page: 1 });
    console.log(response);
    if (response.isSuccess) {
      setBills(response.result.items);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center p-1">
      <div className="w-full h-[100px] bg-slate-300 flex flex-row-reverse items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("create");
          }}
          className="bg-slate-500 rounded p-2 text-white mr-7"
        >
          Add new bill
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto">
        <CustomTable
          data={bills?.map((b) => mapBillToTableRepresenation(b)) || []}
          headers={[
            { column: "billId", headerName: "Id" },
            { column: "date", headerName: "Date" },
            { column: "totalPrice_NoVAT", headerName: "Price" },
            { column: "totalPrice_VAT", headerName: "Price+VAT" },
            { column: "buyerCompany", headerName: "Buyer" },
          ]}
          idColumn="billId"
          onActionClick={(id) => {
            console.log(id);
          }}
          Icon={DeleteIcon}
        />
      </div>
    </div>
  );
};

export default Bills;
