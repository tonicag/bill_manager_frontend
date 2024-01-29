import { BillCreateRequest } from "../interfaces/BillCreateRequest";
import { BillDTO } from "../interfaces/BillDTO";
import IPaginationRequest from "../interfaces/IGetAllProducts";
import PaginationDTO from "../interfaces/PaginationDTO";
import { ResponseDTO } from "../interfaces/ResponseDTO";
import { getTokenHeader } from "../util/getToken";
import { queryBuilder } from "../util/queryBuilder";

export const API_URL = `https://localhost:7010/`;
export default class BillService {
  public static async createBill(
    request: BillCreateRequest
  ): Promise<ResponseDTO<BillDTO>> {
    try {
      let response = await fetch(`${API_URL}api/bills/create`, {
        headers: [["Content-Type", "application/json"], getTokenHeader()],
        body: JSON.stringify(request),
        method: "POST",
      });
      let data = (await response.json()) as ResponseDTO<BillDTO>;
      return data;
    } catch (e) {
      return { isSuccess: false, message: "Request failed!" };
    }
  }
  public static async getAllBills(
    request: IPaginationRequest
  ): Promise<ResponseDTO<PaginationDTO<BillDTO>>> {
    try {
      let query = queryBuilder(request);
      let response = await fetch(`${API_URL}api/bills/all?${query}`, {
        headers: [["Content-Type", "application/json"], getTokenHeader()],
        method: "GET",
      });

      let data = (await response.json()) as ResponseDTO<PaginationDTO<BillDTO>>;
      return data;
    } catch (e) {
      console.log(e);
      return { isSuccess: false, message: "Request failed!" };
    }
  }
}
