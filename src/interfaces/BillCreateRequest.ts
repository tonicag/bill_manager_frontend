import { BillEntryDTO } from "./BillEntryDTO";

export interface BillCreateRequest {
  userId?: string;
  sellerCompanyId?: string;
  buyerCompanyId?: string;
  billEntries?: BillEntryDTO[];
}
