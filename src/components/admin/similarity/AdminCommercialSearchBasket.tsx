import { Commercial, Video } from "@/utils/YouTubeTypes";
import React from "react";
import { Duration } from "luxon";
import Link from "next/link";
interface AdminWatchListSearchBasketParams {
  videos: Video[];
  setSelectedLowCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  setSelectedMediumCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  setSelectedHighCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  loadMore: () => void;
  showLoadMore: boolean;
}

function AdminCommercialSearchBasket({
  videos,
  setSelectedLowCommercial,
  setSelectedMediumCommercial,
  setSelectedHighCommercial,
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
              <img
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
                className="text-sm h-18 line-clamp-1 hover:underline"
                target="_blank"
              >
                {video.title}
              </Link>
              <div className="flex flex-col">
                <div className="text-sm">Select As</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedLowCommercial(video)}
                    className="hover:underline text-red-500 text-xs"
                  >
                    Low Similarity
                  </button>
                  <button
                    onClick={() => setSelectedMediumCommercial(video)}
                    className="hover:underline text-green-500 text-xs"
                  >
                    Medium Similarity
                  </button>
                  <button
                    onClick={() => setSelectedHighCommercial(video)}
                    className="hover:underline text-blue-500 text-xs"
                  >
                    High Similarity
                  </button>
                </div>
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

export default AdminCommercialSearchBasket;
