import { CompanyDTO } from "./CompanyDTO";

export interface LogInResponseDTO {
  token: string;
  company: CompanyDTO;
}
