"use client";
import React from "react";
import WatchListItem from "./WatchListItem";
import { Video } from "@/utils/YouTubeTypes";
import { useAppSelector } from "@/lib/store";

interface WatchListProps {
  currentYoutubeId: string;
}

function WatchList({ currentYoutubeId }: WatchListProps) {
  const videos: Video[] = useAppSelector(
    (state) => state.homeVideoSliceReducer
  );

  return (
    <div className="w-96 bg-black max-md:w-full h-full overflow-auto">
      <p className="text-xl ml-2 my-4">Watch List</p>
      <div className="flex flex-col w-full gap-y-3 overflow-scroll h-[95%]">
        {videos.map(({ title, thumbnailUrl, youtubeId }) => {
          return (
            <WatchListItem
              title={title}
              thumbnailUrl={thumbnailUrl}
              key={youtubeId}
              youtubeId={youtubeId}
              currentlyWatching={youtubeId === currentYoutubeId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
