import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CompanyDTO } from "../interfaces/CompanyDTO";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import spinnerIcon from "../icons/spinnerIcon";
import AuthService from "../services/AuthService";

const Register: React.FC = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    let company: CompanyDTO = {
      address,
      email,
      password,
      bankAccount,
      registrationNumber: regNumber,
    };
    let response = await AuthService.register(company);
    if (response.isSuccess) {
      navigate("/login");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 ">
      <div className=" flex gap-4 flex-col w-[30%]">
        <div className="flex justify-center w-full p-3">
          <h1 className="text-2xl">Register</h1>
        </div>
        <label className="block text-sm font-medium text-gray-900 ">
          Email
        </label>
        <input
          value={email}
          onInput={(e) => {
            setEmail((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Password
        </label>
        <input
          value={password}
          onInput={(e) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          type="password"
        />
        <label className="block text-sm font-medium text-gray-900 ">Name</label>
        <input
          value={name}
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Company name"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Reg. Number
        </label>
        <input
          value={regNumber}
          onInput={(e) => {
            setRegNumber((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Reg. Number"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Address
        </label>
        <input
          value={address}
          onInput={(e) => {
            setAddress((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
        />
        <label className="block text-sm font-medium text-gray-900 ">
          Bank Account
        </label>
        <input
          value={bankAccount}
          onInput={(e) => {
            setBankAccount((e.target as HTMLInputElement).value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bank Account"
        />
        <ButtonComponent
          callback={async () => {
            await register();
          }}
          className="bg-slate-400 rounded p-1"
          text="Register"
          Icon={spinnerIcon}
          isAsync={true}
        />
      </div>
    </div>
  );
};

export default Register;
