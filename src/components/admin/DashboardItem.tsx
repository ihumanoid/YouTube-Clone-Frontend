import React from "react";

interface DashboardItemProps {
  count: number;
  item: string;
}
function DashboardItem({ count, item }: DashboardItemProps) {
  return (
    <div className="bg-yellow-500  h-[35%] w-[35%] flex justify-center items-center rounded-md">
      <p className="text-2xl">{`${count} ${item} Collected`} </p>
    </div>
  );
}

export default DashboardItem;
