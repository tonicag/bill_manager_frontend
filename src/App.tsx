import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import "./App.css";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products, { ProductDTO } from "./pages/Products";
import AddNewProduct from "./pages/AddNewProduct";
import Bills from "./pages/Bills";
import AddNewBIll from "./pages/AddNewBIll";
import AuthenticatedRoute from "./security/AuthenticatedRoute";
import { UserContext } from "./context/UserContext";
import { BillDto } from "./interfaces/Bill";
import { CompanyDTO } from "./interfaces/CompanyDTO";
const App: React.FC = () => {
  const [user, setUser] = useState<CompanyDTO>({});
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [bills, setBills] = useState<BillDto[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const initWebsite = async (user: string) => {
      try {
        let userParsed = (await JSON.parse(user)) as CompanyDTO;
        setUser(userParsed);
        console.log(user, "set user in user context");
        // TODO: plus checkin for token expiration

        setLoggedIn(true);
        setLoading(false);
      } catch (e) {
        localStorage.clear();
        setLoggedIn(false);
        setLoading(false);
      }
    };
    let user = localStorage.getItem("company");
    console.log("Current user", user);
    if (user === null) {
      setLoading(false);
    } else {
      initWebsite(user!);
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user,
          setUser,
          isLoggedIn,
          setLoggedIn,
          products,
          setProducts,
          bills,
          setBills,
        }}
      >
        {" "}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<AuthenticatedRoute />}>
              <Route path="" element={<Dashboard />}>
                <Route path="products" element={<Products />}></Route>
                <Route path="bills" element={<Bills />}></Route>
                <Route
                  path="products/create"
                  element={<AddNewProduct />}
                ></Route>
                <Route path="bills/create" element={<AddNewBIll />}></Route>
              </Route>
            </Route>
          </Routes>
        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
