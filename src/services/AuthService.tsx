import { CompanyDTO } from "../interfaces/CompanyDTO";
import { LogInResponseDTO } from "../interfaces/LogInResponseDTO";
import { ResponseDTO } from "../interfaces/ResponseDTO";
export const API_URL = `https://localhost:7010/`;
export default class AuthService {
  public static async login(body: {
    username: string;
    password: string;
  }): Promise<ResponseDTO<LogInResponseDTO>> {
    try {
      const response = await fetch(`${API_URL}api/auth/login`, {
        headers: [["Content-Type", "application/json"]],
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as ResponseDTO<LogInResponseDTO>;
      return data;
    } catch (e) {
      return { isSuccess: false, message: "An error has occured!" };
    }
  }
  public static async register(body: CompanyDTO): Promise<ResponseDTO<string>> {
    try {
      const response = await fetch(`${API_URL}api/auth/register`, {
        headers: [["Content-Type", "application/json"]],
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as ResponseDTO<string>;
      return data;
    } catch (e) {
      return { isSuccess: false, message: "An error has occured!" };
    }
  }
}
