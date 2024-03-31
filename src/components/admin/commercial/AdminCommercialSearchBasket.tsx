import { Commercial, Video } from "@/utils/YouTubeTypes";
import React from "react";
import { Duration } from "luxon";
import Link from "next/link";
interface AdminWatchListSearchBasketParams {
  commercials: Commercial[];
  addToBasket: (commercial: Video) => void;
  loadMore: () => void;
}

function AdminCommercialSearchBasket({
  commercials,
  addToBasket,
  loadMore,
}: AdminWatchListSearchBasketParams) {
  if (commercials.length === 0) {
    return (
      <div className="bg-black h-full w-full flex justify-center items-center font-bold text-2xl">
        Search Result
      </div>
    );
  }

  return (
    <div className="bg-black h-full w-full flex flex-col overflow-auto gap-2">
      {commercials.map((commercial, idx) => {
        const minutes = Duration.fromISO(commercial.duration).minutes;
        const seconds = Duration.fromISO(commercial.duration).seconds;
        return (
          <div
            key={(commercial.youtubeId, idx)}
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
                className="text-sm h-18 line-clamp-1 hover:underline"
                target="_blank"
              >
                {commercial.title}
              </Link>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  addToBasket(commercial);
                }}
              >
                ADD TO BASKET
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={loadMore}
        className="text-center text-xl font-bold hover:bg-slate-800 py-4 cursor-pointer"
      >
        Load More
      </button>
    </div>
  );
}

export default AdminCommercialSearchBasket;
