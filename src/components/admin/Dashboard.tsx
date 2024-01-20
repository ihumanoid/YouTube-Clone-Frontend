import React from "react";
import DashboardItem from "./DashboardItem";

function Dashboard() {
  return (
    <div className="flex-1 flex flex-col bg-blue-500">
      <p className="text-3xl w-full text-center mt-3">System Data Overview</p>
      <div className="flex flex-wrap justify-center items-center gap-x-20 h-full">
        <DashboardItem count={32} item={"Videos"} />
        <DashboardItem count={8} item={"Ad Videos"} />
        <DashboardItem count={5} item={"Watch Lists"} />
        <DashboardItem count={23} item={"Survey Results"} />
      </div>
    </div>
  );
}

export default Dashboard;
