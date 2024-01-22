import { BillEntriesDTO } from "./BillEntryDTO";
import { CompanyDTO } from "./CompanyDTO";

export interface BillDto {
  billId?: string;
  date?: string;
  totalPrice_NoVAT?: number;
  TotalPrice_VAT?: number;
  sellerCompany?: CompanyDTO;
  buyerCompany?: CompanyDTO;
  billEntries?: BillEntriesDTO[];
}
