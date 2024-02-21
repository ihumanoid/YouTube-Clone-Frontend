import { Video } from "@/utils/YouTubeTypes";
import Image from "next/image";
import React from "react";
import { Duration } from "luxon";
import Link from "next/link";
interface AdminWatchListSearchBasketParams {
  videos: Video[];
  addToBasket: (video: Video) => void;
  loadMore: () => void;
  showLoadMore: boolean;
  selectCommercial: (video: Video) => void;
}

function AdminWatchListSearchBasket({
  videos,
  addToBasket,
  selectCommercial,
  loadMore,
  showLoadMore,
}: AdminWatchListSearchBasketParams) {
  if (videos.length === 0) {
    return (
      <div className="bg-black h-full w-full flex justify-center items-center font-bold text-2xl">
        Search Result
      </div>
    );
  }

  return (
    <div className="bg-black h-full w-full flex flex-col overflow-auto gap-2">
      {videos.map((video, idx) => {
        const minutes = Duration.fromISO(video.duration).minutes;
        const seconds = Duration.fromISO(video.duration).seconds;
        return (
          <div
            key={(video.youtubeId, idx)}
            className="w-full h-20 max-h-20 flex border-b-white border-b-solid border-b-2"
          >
            <div className="relative flex w-30 justify-center bg">
              <Image
                src={video.thumbnailUrl}
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
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                className="text-sm h-18 line-clamp-2 hover:underline"
                target="_blank"
              >
                {video.title}
              </Link>
              <div className="flex gap-4">
                <button
                  onClick={() => addToBasket(video)}
                  className="hover:underline text-blue-500 text-xs"
                >
                  ADD TO VIDEOS
                </button>
                <button
                  onClick={() => selectCommercial(video)}
                  className="hover:underline text-blue-500 text-xs"
                >
                  SELECT AS COMMERCIAL
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {showLoadMore && (
        <button
          onClick={loadMore}
          className="text-center text-xl font-bold hover:bg-slate-800 py-4 cursor-pointer"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default AdminWatchListSearchBasket;
