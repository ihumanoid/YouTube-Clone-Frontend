import { Commercial } from "@/utils/YouTubeTypes";
import Link from "next/link";
import React from "react";

interface AdminCommercialBoardSubitem {
  commercial?: Commercial;
  similarityLevel: string;
  bgColorClass: string;
}
function AdminCommercialBoardSubitem({
  commercial,
  similarityLevel,
  bgColorClass,
}: AdminCommercialBoardSubitem) {
  return (
    <div
      className={`w-full h-full flex flex-col flex-1 items-center pb-2 ${bgColorClass}`}
    >
      <div className="text-2xl line-clamp-1">{similarityLevel}</div>
      {commercial ? (
        <Link
          href={`https://www.youtube.com/watch?v=${commercial.youtubeId}`}
          target="_blank"
          className="relative group"
        >
          <img
            src={commercial.thumbnailUrl}
            alt="thumbnail"
            width="150"
            height="110"
            className="min-w-[150px] min-h-[110px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hidden group-hover:block max-h-20 line-clamp-3">
            {commercial.title}
          </div>
        </Link>
      ) : (
        <div className="w-[150px] h-[110px] bg-slate-900 flex justify-center items-center text-3xl font-bold">
          ?
        </div>
      )}
    </div>
  );
}

export default AdminCommercialBoardSubitem;
