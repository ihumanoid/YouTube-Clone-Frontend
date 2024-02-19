import { Video } from "@/utils/YouTubeTypes";
import Image from "next/image";
import React from "react";
import { Duration } from "luxon";
import Link from "next/link";

interface AdminVideoShoppingBasketParams {
  videos: Video[];
  removeFromBasket: (video: Video) => void;
}

function AdminVideoShoppingBasket({
  videos,
  removeFromBasket,
}: AdminVideoShoppingBasketParams) {
  if (videos.length === 0) {
    return (
      <div className="bg-black h-full w-full flex justify-center items-center font-bold text-2xl">
        Selected Videos
      </div>
    );
  }
  return (
    <div className="bg-black h-full w-full flex flex-col overflow-scroll gap-2">
      {videos.map((video, idx) => {
        const minutes = Duration.fromISO(video.duration).minutes;
        const seconds = Duration.fromISO(video.duration).seconds;

        return (
          <div
            key={idx}
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
              <button
                onClick={() => removeFromBasket(video)}
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

export default AdminVideoShoppingBasket;
