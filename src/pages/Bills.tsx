import React, { useContext } from "react";
import CustomTable from "../components/Table";
import { BillDto } from "../interfaces/Bill";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

let bills_list: BillDto[] = [
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
          data={context.bills || []}
          headers={[
            { column: "billId", headerName: "Name" },
            { column: "date", headerName: "Date" },
            { column: "totalPrice_NoVAT", headerName: "Price" },
          ]}
          idColumn="billId"
          onActionClick={(id) => {
            console.log(id);
          }}
        />
      </div>
    </div>
  );
};

export default Bills;
