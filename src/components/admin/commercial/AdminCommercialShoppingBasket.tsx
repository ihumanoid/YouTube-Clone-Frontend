import { Commercial } from "@/utils/YouTubeTypes";
// import Image from "next/image";
import React from "react";
import { Duration } from "luxon";
import Link from "next/link";

interface AdminCommercialShoppingBasketParams {
  commercials: Commercial[];
  removeFromBasket: (commercial: Commercial) => void;
}

function AdminCommercialShoppingBasket({
  commercials,
  removeFromBasket,
}: AdminCommercialShoppingBasketParams) {
  if (commercials.length === 0) {
    return (
      <div className="bg-black h-full w-full flex justify-center items-center font-bold text-2xl">
        Selected Videos
      </div>
    );
  }
  return (
    <div className="bg-black h-full w-full flex flex-col overflow-scroll gap-2">
      {commercials.map((commercial, idx) => {
        const minutes = Duration.fromISO(commercial.duration).minutes;
        const seconds = Duration.fromISO(commercial.duration).seconds;

        return (
          <div
            key={idx}
            className="w-full h-20 max-h-20 flex border-b-white border-b-solid border-b-2"
          >
            <div className="relative flex w-30 justify-center bg">
              <img
                src={commercial.thumbnailUrl}
                alt="Video Thumbnail"
                width={100}
                height={30}
              />
              <div className="absolute bottom-1 right-1 bg-black text-white p-1 rounded">
                {`${minutes}:${seconds}`}
              </div>
            </div>

            <div className="flex flex-1 h-full flex-col items-start justify-between ml-2">
              <Link
                href={`https://www.youtube.com/watch?v=${commercial.youtubeId}`}
                className="text-sm h-18 line-clamp-2 hover:underline"
                target="_blank"
              >
                {commercial.title}
              </Link>
              <button
                onClick={() => removeFromBasket(commercial)}
                className="hover:underline text-blue-500 text-sm"
              >
                REMOVE FROM BASKET
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminCommercialShoppingBasket;
