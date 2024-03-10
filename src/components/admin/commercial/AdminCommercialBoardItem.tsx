import { WatchListCommercialsVO } from "@/utils/YouTubeTypes";
import React from "react";
import AdminCommercialBoardSubitem from "./AdminCommercialBoardSubitem";
import Link from "next/link";

interface AdminCommercialBoardItemProps {
  watchList: WatchListCommercialsVO;
}

function AdminCommercialBoardItem({
  watchList,
}: AdminCommercialBoardItemProps) {
  return (
    <div className="bg-[#151515] mx-2 py-2 rounded-sm flex items-center">
      <div className="flex flex-col">
        <div className="ml-4 flex flex-col flex-center justify-center items-center gap-4">
          <p className="text-xl w-48 line-clamp-1 text-center">
            {watchList.title}
          </p>
          <Link
            href={`/nimda/commercials/update?watchList=${encodeURIComponent(
              JSON.stringify(watchList)
            )}`}
            className="bg-blue-500 hover:bg-blue-600 w-20 h-8 text-center"
          >
            Manage
          </Link>
        </div>
      </div>
      <div className="flex w-full gap-8 ml-8">
        <AdminCommercialBoardSubitem
          commercial={watchList.lowCommercial}
          similarityLevel="Low Similarity"
          bgColorClass="bg-red-500"
        />
        <AdminCommercialBoardSubitem
          commercial={watchList.mediumCommercial}
          similarityLevel="Medium Similarity"
          bgColorClass="bg-green-500"
        />
        <AdminCommercialBoardSubitem
          commercial={watchList.highCommercial}
          similarityLevel="High Similarity"
          bgColorClass="bg-blue-500"
        />
      </div>
    </div>
  );
}

export default AdminCommercialBoardItem;
