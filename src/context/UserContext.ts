import { createContext } from "react";
import { BillDTO } from "../interfaces/BillDTO";
import { CompanyDTO } from "../interfaces/CompanyDTO";
import { ProductDTO } from "../pages/Products";

export interface IUserContext {
  user?: CompanyDTO;
  setUser?: (user: CompanyDTO) => void;
  isLoggedIn: boolean;
  setLoggedIn?: (v: boolean) => void;
  products?: ProductDTO[];
  setProducts?: (products: ProductDTO[]) => void;
  bills?: BillDTO[];
  setBills?: (bills: BillDTO[]) => void;
}
export const UserContext = createContext<IUserContext>({ isLoggedIn: false });
