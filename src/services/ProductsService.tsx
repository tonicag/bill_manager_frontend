import { CompanyDTO } from "../interfaces/CompanyDTO";
import IGetAllProducts from "../interfaces/IGetAllProducts";
import { LogInResponseDTO } from "../interfaces/LogInResponseDTO";
import PaginationDTO from "../interfaces/PaginationDTO";
import { ResponseDTO } from "../interfaces/ResponseDTO";
import { ProductDTO } from "../pages/Products";
import { getTokenHeader } from "../util/getToken";
import { queryBuilder } from "../util/queryBuilder";
export const API_URL = `https://localhost:7010/`;
export default class ProductsService {
  public static async getAllProducts(
    queryParams: IGetAllProducts
  ): Promise<ResponseDTO<PaginationDTO<ProductDTO>>> {
    let query = queryBuilder(queryParams);
    console.log(query);
    try {
      let response = await fetch(`${API_URL}api/product/all?${query}`, {
        headers: [["Content-Type", "application/json"], getTokenHeader()],
        method: "GET",
      });
      const result = (await response.json()) as ResponseDTO<
        PaginationDTO<ProductDTO>
      >;
      return result;
    } catch (e) {
      return { isSuccess: false, message: "Error!" };
    }
  }
  public static async createProduct(
    product: ProductDTO
  ): Promise<ResponseDTO<ProductDTO>> {
    try {
      let response = await fetch(`${API_URL}api/product/create`, {
        headers: [["Content-Type", "application/json"], getTokenHeader()],
        body: JSON.stringify(product),
        method: "POST",
      });
      const result = (await response.json()) as ResponseDTO<ProductDTO>;
      return result;
    } catch (e) {
      return { isSuccess: false, message: "Error!" };
    }
  }
}
