import { CompanyDTO } from "../interfaces/CompanyDTO";
import IPaginationRequest from "../interfaces/IGetAllProducts";
import { LogInResponseDTO } from "../interfaces/LogInResponseDTO";
import PaginationDTO from "../interfaces/PaginationDTO";
import { ResponseDTO } from "../interfaces/ResponseDTO";
import { ProductDTO } from "../pages/Products";
import { getTokenHeader } from "../util/getToken";
import { queryBuilder } from "../util/queryBuilder";
export const API_URL = `https://localhost:7010/`;
export default class CompanyService {
  public static async getAllCompanies(
    queryParams: IPaginationRequest
  ): Promise<ResponseDTO<PaginationDTO<CompanyDTO>>> {
    let query = queryBuilder(queryParams);
    console.log(query);
    try {
      let response = await fetch(`${API_URL}api/company/all?${query}`, {
        headers: [["Content-Type", "application/json"], getTokenHeader()],
        method: "GET",
      });
      const result = (await response.json()) as ResponseDTO<
        PaginationDTO<CompanyDTO>
      >;
      return result;
    } catch (e) {
      return { isSuccess: false, message: "Error!" };
    }
  }
}
