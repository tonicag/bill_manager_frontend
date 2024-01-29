import React, { useContext, useEffect, useState } from "react";
import CustomTable from "../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProductsService from "../services/ProductsService";

export interface ProductDTO {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  companyId?: string;
}

var product_list: ProductDTO[] = [
  { description: "Descriere", id: "1", name: "Product 1", price: "123.0$" },
];

const Products = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await ProductsService.getAllProducts({
        itemsPerPage: 10,
        page: 1,
      });
      if (response.isSuccess) {
        setProducts(response.result.items);
      }
    };

    getProducts();
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
          Add new product
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto">
        <CustomTable
          data={products || []}
          headers={[
            { column: "name", headerName: "Name" },
            { column: "description", headerName: "Description" },
            { column: "price", headerName: "Price" },
          ]}
          idColumn="id"
          onActionClick={(id) => {
            console.log(id);
          }}
        />
      </div>
    </div>
  );
};

export default Products;
