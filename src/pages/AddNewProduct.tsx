import React, { useContext, useState } from "react";
import { ProductDTO } from "./Products";
import CustomTable from "../components/CustomTable";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ProductsService from "../services/ProductsService";
import ButtonComponent from "../components/ButtonComponent";

var product_list: ProductDTO[] = [
  { description: "Descriere", id: "1", name: "Product 1", price: "123.0$" },
  { description: "Descriere", id: "2", name: "Product 2", price: "123.0$" },
];

const AddNewProduct = () => {
  const [product, setProduct] = useState<ProductDTO>({});
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const addNewProduct = async () => {
    const response = await ProductsService.createProduct({
      ...product,
      companyId: context.user?.id,
    });
    if (response.isSuccess) {
      navigate("/dashboard/products");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 ">
      <div className=" flex gap-4 flex-col w-[30%]">
        <div className="flex justify-center w-full p-3">
          <h1 className="text-2xl">Add new product</h1>
        </div>
        <label className="block text-sm font-medium text-gray-900 ">Name</label>
        <input
          value={product.name || ""}
          onChange={(e) => {
            const val = e.target as HTMLInputElement;
            setProduct({ ...product, name: val.value });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Description
        </label>
        <input
          value={product.description || ""}
          onChange={(e) => {
            const val = e.target as HTMLInputElement;
            setProduct({ ...product, description: val.value });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Price
        </label>
        <input
          value={product.price || ""}
          onChange={(e) => {
            const val = e.target as HTMLInputElement;
            setProduct({ ...product, price: val.value });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Price"
        />
        <ButtonComponent
          callback={addNewProduct}
          className="bg-slate-400 rounded p-1"
          text="Add new product"
          isAsync={true}
        ></ButtonComponent>
      </div>
    </div>
  );
};

export default AddNewProduct;
