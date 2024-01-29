import { BillEntryDTO } from "./BillEntryDTO";
import { CompanyDTO } from "./CompanyDTO";

export interface BillDTO {
  billId?: string;
  date?: string;
  totalPrice_NoVAT?: number;
  TotalPrice_VAT?: number;
  sellerCompany?: CompanyDTO;
  buyerCompany?: CompanyDTO;
  billEntries?: BillEntryDTO[];
}
