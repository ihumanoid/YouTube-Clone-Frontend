import { Commercial, CommercialSimilarityVO } from "@/utils/YouTubeTypes";
import Link from "next/link";
import React from "react";

interface AdminSimilarityBoardSubitemProps {
  commercialSimilarityVOs: CommercialSimilarityVO[];
  similarityLevel: string;
  bgColorClass: string;
}
function AdminSimilarityBoardSubitem({
  commercialSimilarityVOs,
  similarityLevel,
  bgColorClass,
}: AdminSimilarityBoardSubitemProps) {
  commercialSimilarityVOs.sort((a, b) => a.similarityScore - b.similarityScore);
  return (
    <div className="flex w-full gap-8 ml-8">
      <div
        className={`w-full h-full flex flex-col flex-1 items-center pb-2 ${bgColorClass}`}
      >
        <div className="text-2xl line-clamp-1">{similarityLevel}</div>
        <div className="flex overflow-auto">
          {commercialSimilarityVOs.map((commercialSimilarityVO, idx) => {
            return (
              <div key={idx}>
                {commercialSimilarityVO ? (
                  <Link
                    href={`https://www.youtube.com/watch?v=${commercialSimilarityVO.commercialYoutubeId}`}
                    target="_blank"
                    className="relative group"
                  >
                    <img
                      src={commercialSimilarityVO.thumbnailUrl}
                      alt="thumbnail"
                      width="150"
                      height="110"
                      className="min-w-[150px] min-h-[110px]"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-600 hidden group-hover:block max-h-20 line-clamp-3">
                      {commercialSimilarityVO.title}
                    </div>
                    {/* <div className="absolute top-0 left-0 border-2 rounded-full border-black w-7 h-7 bg-gray-700 text-center">
                      {idx + 1}
                    </div> */}
                  </Link>
                ) : (
                  <div className="w-[150px] h-[112px] bg-slate-900 flex justify-center items-center text-3xl font-bold">
                    ?
                  </div>
                )}
                <div className="flex justify-center">
                  Score ={" "}
                  {commercialSimilarityVO
                    ? commercialSimilarityVO.similarityScore.toFixed(3)
                    : "?"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminSimilarityBoardSubitem;
