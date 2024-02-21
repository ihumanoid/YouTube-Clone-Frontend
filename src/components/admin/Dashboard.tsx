"use client";
import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import { SystemSummaryVO } from "@/utils/YouTubeTypes";

function Dashboard() {
  const [summaryDataArray, setSummaryDataArray] = useState<SystemSummaryVO[]>();
  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/system/summary`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! error code: ${response.status}`);
      }

      const dataArray = (await response.json()).data;
      setSummaryDataArray(dataArray);
    };
    fetchSummary();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#303030]">
      <p className="text-3xl w-full text-center mt-3">System Data Overview</p>
      <div className="flex flex-wrap justify-center items-center gap-x-20 h-full">
        {summaryDataArray?.map(({ item, count }, idx) => {
          return <DashboardItem key={idx} item={item} count={count} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
