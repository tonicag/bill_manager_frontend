import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="bg-slate-200 w-full h-[100px] flex flex-row  gap-2 p-3 ">
      <Link
        className="bg-slate-500 text-white h-[60px] rounded-xl p-4"
        to="/dashboard"
      >
        Dashboard
      </Link>
      <Link
        className="bg-slate-500 text-white rounded-xl p-4 h-[60px] "
        to="/logIn"
      >
        Login
      </Link>
      <Link
        className="bg-slate-500 text-white rounded-xl p-4 h-[60px] "
        to="/register"
      >
        Register
      </Link>
    </div>
  );
};

export default Home;
