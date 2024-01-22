import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-1/5 h-full bg-slate-800 flex flex-col justify-center gap-1">
        <Link
          className="w-full h-[50px] bg-slate-100 flex justify-center items-center hover:bg-slate-400 text-lg font-semibold"
          to="products"
        >
          Products
        </Link>

        <Link
          className="w-full h-[50px] bg-slate-100 flex justify-center items-center hover:bg-slate-400 text-lg font-semibold"
          to="bills"
        >
          Bills
        </Link>
      </div>
      <div className="w-4/5 bg-slate-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
