import { BillDTO } from "./BillDTO";

export interface IBillTableRepresentation {
  billId?: string;
  date?: string;
  totalPrice_NoVAT?: number;
  TotalPrice_VAT?: number;
  sellerCompany?: string;
  buyerCompany?: string;
}
export const mapBillToTableRepresenation = (
  bill: BillDTO
): IBillTableRepresentation => {
  return {
    billId: bill.billId,
    buyerCompany: bill.buyerCompany?.name,
    sellerCompany: bill.sellerCompany?.name,
    date: new Date(bill.date!).toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
    totalPrice_NoVAT: bill.totalPrice_NoVAT,
    TotalPrice_VAT: bill.TotalPrice_VAT,
  };
};
