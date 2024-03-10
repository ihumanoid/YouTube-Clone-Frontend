import { Commercial } from "@/utils/YouTubeTypes";
import React from "react";

interface AdminCommercialSearchBasketItemProps {
  commercial?: Commercial;
  setSelectedCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  bgColorClass: string;
  similarityLevel: string;
}

function AdminCommercialSearchBasketItem({
  commercial,
  setSelectedCommercial,
  bgColorClass,
  similarityLevel,
}: AdminCommercialSearchBasketItemProps) {
  return (
    <div className={`flex flex-col flex-1 ${bgColorClass}`}>
      <div className="text-lg mb-2">{similarityLevel}</div>
      {commercial ? (
        <div className="flex gap-2">
          <img src={commercial.thumbnailUrl} width="130" height="100" />
          <div className="flex flex-col justify-between">
            <div className="h-6 line-clamp-1">{commercial.title}</div>
            <button
              className="hover:underline text-left"
              onClick={() => setSelectedCommercial(undefined)}
            >
              UNSELECT
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="bg-gray-900 w-[130px] h-[100px] text-3xl font-bold flex justify-center items-center">
            ?
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCommercialSearchBasketItem;
