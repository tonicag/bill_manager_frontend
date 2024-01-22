import React, { useState } from "react";
import { BACKEND_URI } from "../settings/constants";
import { ResponseDTO } from "../interfaces/ResponseDTO";
import { LogInResponseDTO } from "../interfaces/LogInResponseDTO";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { isValidEmail, isValidPassword } from "../validators/validators";
import ButtonComponent from "../components/ButtonComponent";
import spinnerIcon from "../icons/spinnerIcon";
import AuthService from "../services/AuthService";

const LogIn: React.FC = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validityMap, setValidityMap] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );
  const navigate = useNavigate();

  if (context.isLoggedIn) return <Navigate to="/dashboard"></Navigate>;

  const logIn = async () => {
    /// TODO: refactor validations
    if (isValidEmail(email) || isValidPassword(password)) return;

    let result = await AuthService.login({ username: email, password });

    if (result.isSuccess) {
      localStorage.setItem("token", result.result.token);
      localStorage.setItem("company", JSON.stringify(result.result.company));

      if (context.setUser) {
        console.log("set User!");
        context.setUser(result.result.company);
      }
      if (context.setLoggedIn) context.setLoggedIn(true);

      navigate("/dashboard");
    }

    console.log(context);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 ">
      <div className=" flex gap-4 flex-col w-[30%] items-center">
        <div className="flex justify-center w-full p-3">
          <h1 className="text-2xl">Log In</h1>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Email
          </label>
          <TextInput
            className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            errorClassNameInput="bg-gray-700 border-[4px] border-red-500 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            errorClassNameMessage="text-red-500"
            setValue={(val) => {
              setEmail(val);
            }}
            validators={[isValidEmail]}
            value={email}
            placeholder="Email"
            validityMap={validityMap}
          ></TextInput>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Password
          </label>
          <TextInput
            className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            errorClassNameInput="bg-gray-700 border-[4px] border-red-500 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            errorClassNameMessage="text-red-500"
            setValue={(val) => {
              setPassword(val);
            }}
            validators={[isValidPassword]}
            value={password}
            placeholder="Password"
            type="password"
            validityMap={validityMap}
          ></TextInput>
        </div>

        <div className="flex flex-col gap-2 w-1/3 ">
          <ButtonComponent
            text="Log in"
            callback={async () => {
              await logIn();
            }}
            className=" bg-slate-400 rounded p-1"
            Icon={spinnerIcon}
            isAsync={true}
          ></ButtonComponent>
        </div>

        <Link className="bg-green-400 rounded p-3 text-center" to="/register">
          Or register here
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
