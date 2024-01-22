import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import CustomTable from "../components/Table";
import { ProductDTO } from "./Products";
import { BillEntriesDTO } from "../interfaces/BillEntryDTO";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SearchableDropdown from "../components/SearchableDropdown";
import ProductsService from "../services/ProductsService";
import IGetAllProducts from "../interfaces/IGetAllProducts";
import { useDebounce } from "usehooks-ts";
var options = [
  {
    label: "Company 1",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
  {
    label: "Company 2",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
  {
    label: "Company 3",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
  {
    label: "Company 4",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
  {
    label: "Company 5",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
  {
    label: "Company 6",
    value: "Company",
    className: "p-1 hover:bg-slate-400 cursor-pointer",
  },
];
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function formatDate(date = new Date()) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

const AddNewBIll = () => {
  const [billEntries, setBillEntries] = useState<BillEntriesDTO[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(
    ""
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO>();
  const [quantity, setQuantity] = useState<string>("");

  const [productInput, setProductInput] = useState<string>("");
  const [queryProducts, setQueryProducts] = useState<ProductDTO[]>([]);

  const debounceProducts = useDebounce<string>(productInput, 1000);

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const getProducts = async (query: IGetAllProducts) => {
    let response = await ProductsService.getAllProducts(query);
    if (response.isSuccess) {
      setQueryProducts(response.result.items);
    }
  };

  useEffect(() => {
    console.log("testr");
    getProducts({ searchKey: productInput });
  }, [debounceProducts]);

  return (
    <div className="w-full h-full flex bg-slate-100 overflow-y-auto ">
      <div className=" flex gap-4 flex-col w-full p-5">
        <div className="flex justify-center w-full p-3">
          <h1 className="text-2xl">Add new bill</h1>
        </div>
        <label className="block text-sm font-medium text-gray-900 ">
          Select company
        </label>
        <SearchableDropdown
          onInput={(val) => {
            console.log(val);
          }}
          onSelected={(o) => {
            console.log(o);
          }}
          placeholder={"Product name"}
          options={[
            { name: "Test", value: "1" },
            { name: "Test", value: "2" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
            { name: "Test", value: "3" },
          ]}
        />
        <label className="block text-center text-xl font-medium text-gray-900 ">
          Products
        </label>
        <SearchableDropdown
          onInput={(val) => {
            console.log(val);
            setProductInput(val);
            return;
          }}
          onSelected={(o) => {
            console.log(o);
          }}
          placeholder={"Product name"}
          options={queryProducts.map((q) => {
            return { name: q.name!, value: q.id! };
          })}
        />

        <label className="block text-sm font-medium text-gray-900 ">
          Quantity
        </label>
        <input
          value={quantity}
          onChange={(e) => {
            let val = e.target as HTMLInputElement;
            setQuantity(val.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quantity"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("!@#");
            if (billEntries.length) {
              setBillEntries([
                ...billEntries,
                {
                  id: billEntries.length.toString(),
                  productId: selectedProduct?.name,
                  quantity: quantity,
                },
              ]);
              setQuantity("");
            } else {
              setBillEntries([
                {
                  id: billEntries.length.toString(),
                  productId: selectedProduct?.name,
                  quantity: quantity,
                },
              ]);
            }
            console.log(billEntries);
          }}
          className="bg-green-500 border-1 rounded p-1"
        >
          Add product to bill
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (context.bills?.length) {
              context.setBills!([
                ...context.bills,
                {
                  billId: context.bills.length.toString(),
                  billEntries: billEntries,
                  buyerCompany: { name: context.user?.name },
                  date: formatDate(),
                  totalPrice_NoVAT: getRandomInt(500),
                },
              ]);
            } else {
              context.setBills!([
                {
                  billId: "1",
                  billEntries: billEntries,
                  buyerCompany: { name: context.user?.name },
                  date: formatDate(),

                  totalPrice_NoVAT: getRandomInt(500),
                },
              ]);
            }
            navigate("/dashboard/bills");
          }}
          className="bg-green-500 border-1 rounded p-3 mt-10 justify-end"
        >
          Save and create bill!
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto">
        <CustomTable
          data={billEntries || []}
          headers={[
            { column: "id", headerName: "Id" },
            { column: "productId", headerName: "Product Name" },
            { column: "quantity", headerName: "Quantity" },
          ]}
          idColumn="id"
          onActionClick={(id) => {
            console.log(id);
            console.log(billEntries);
            setBillEntries(billEntries.filter((be) => be.id !== id));
          }}
        />
      </div>
    </div>
  );
};

export default AddNewBIll;
