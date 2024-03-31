import { WatchListCommercialSimilarityVO } from "@/utils/YouTubeTypes";
import React from "react";
import AdminSimilarityBoardSubitem from "./AdminSimilarityBoardSubitem";
import Link from "next/link";

interface AdminSimilarityBoardItemProps {
  watchList: WatchListCommercialSimilarityVO;
}

function AdminSimilarityBoardItem({
  watchList,
}: AdminSimilarityBoardItemProps) {
  const lowSimilarity = Array.from(
    { length: 3 },
    (_, idx) => watchList.lowSimilarity[idx] ?? null
  );
  const highSimilarity = Array.from(
    { length: 3 },
    (_, idx) => watchList.highSimilarity[idx] ?? null
  );

  return (
    <div className="bg-[#151515] mx-2 py-2 rounded-sm flex items-center">
      <div className="flex flex-col">
        <div className="ml-4 flex flex-col flex-center justify-center items-center gap-4">
          <Link
            className="text-xl w-48 line-clamp-1 text-center hover:underline"
            href={`/${watchList.id}`}
          >
            {watchList.title}
          </Link>
          <div className="text-sm text-gray-300">{watchList.length} videos</div>
        </div>
      </div>
      <AdminSimilarityBoardSubitem
        commercialSimilarityVOs={lowSimilarity}
        similarityLevel="Low Similarity"
        bgColorClass="bg-red-500"
      />
      <AdminSimilarityBoardSubitem
        commercialSimilarityVOs={highSimilarity}
        similarityLevel="High Similarity"
        bgColorClass="bg-blue-500"
      />
    </div>
  );
}

export default AdminSimilarityBoardItem;
