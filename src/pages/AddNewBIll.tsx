import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import CustomTable from "../components/CustomTable";
import { ProductDTO } from "./Products";
import { BillEntryDTO } from "../interfaces/BillEntryDTO";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SearchableDropdown from "../components/SearchableDropdown";
import ProductsService from "../services/ProductsService";
import IPaginationRequest from "../interfaces/IGetAllProducts";
import { useDebounce } from "usehooks-ts";
import { CompanyDTO } from "../interfaces/CompanyDTO";
import CompanyService from "../services/CompanyService";
import BillService from "../services/BillService";
import DeleteIcon from "../icons/DeleteIcon";
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
  const [billEntries, setBillEntries] = useState<BillEntryDTO[]>([]);

  const [productsSearchItems, setProductsSearchItems] = useState<ProductDTO[]>(
    []
  );
  const [companiesSearchItems, setCompaniesSearchItems] = useState<
    CompanyDTO[]
  >([]);

  const [selectedProduct, setSelectedProduct] = useState<ProductDTO>();
  const [selectedCompany, setSelectedCompany] = useState<CompanyDTO>();

  const [quantity, setQuantity] = useState<string>("");

  const [productNameInput, setProductInput] = useState<string>("");
  const [companyNameInput, setCompanyNameInput] = useState<string>("");

  const debounceProducts = useDebounce<string>(productNameInput, 1000);
  const debounceCompanies = useDebounce<string>(companyNameInput, 1000);

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const getProducts = async (query: IPaginationRequest) => {
    let response = await ProductsService.getAllProducts(query);
    if (response.isSuccess) {
      setProductsSearchItems(response.result.items);
    }
  };

  const getCompanies = async (query: IPaginationRequest) => {
    let response = await CompanyService.getAllCompanies(query);
    if (response.isSuccess) {
      setCompaniesSearchItems(response.result.items);
    }
  };

  const saveBill = async () => {
    if (!selectedCompany || !billEntries.length) {
      // TODO: Add validation to let the user know
      return;
    }
    const response = await BillService.createBill({
      userId: "",
      billEntries: billEntries,
      buyerCompanyId: context.user?.id,
      sellerCompanyId: selectedCompany?.id,
    });
  };

  // Debouncers
  useEffect(() => {
    getProducts({ searchKey: productNameInput });
  }, [debounceProducts]);

  useEffect(() => {
    getCompanies({ searchKey: companyNameInput });
  }, [debounceCompanies]);

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
            setCompanyNameInput(val);
          }}
          onSelected={(o) => {
            setSelectedCompany(
              companiesSearchItems.find((c) => c.id === o.value)
            );
          }}
          placeholder={"Product name"}
          options={companiesSearchItems.map((q) => {
            return { name: q.name || "Test", value: q.id! };
          })}
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
            setSelectedProduct(
              productsSearchItems.find((p) => p.id === o.value)
            );
          }}
          placeholder={"Product name"}
          options={productsSearchItems.map((q) => {
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
                  productId: selectedProduct?.id,
                  quantity: quantity,
                  billId: "",
                },
              ]);
              setQuantity("");
            } else {
              setBillEntries([
                {
                  id: billEntries.length.toString(),
                  productId: selectedProduct?.id,
                  quantity: quantity,
                  billId: "",
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
            saveBill();
          }}
          className="bg-green-500 border-1 rounded p-3 mt-10 justify-end"
        >
          Save and create bill!
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto bg-slate-700">
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
          Icon={DeleteIcon}
        />
      </div>
    </div>
  );
};

export default AddNewBIll;
