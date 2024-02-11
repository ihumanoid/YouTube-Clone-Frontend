"use client";
import React from "react";
import WatchListItem from "./WatchListItem";
import { Video, WatchListVO } from "@/utils/YouTubeTypes";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

interface WatchListProps {
  watchList: WatchListVO;
  videoId: string;
}

function WatchList({ watchList, videoId }: WatchListProps) {
  const videos = watchList.videos;

  return (
    <div className="w-96 bg-black max-md:w-full h-full">
      <p className="text-xl h-[8%]">Watch List</p>
      <div className="flex flex-col flex-1 w-full gap-y-3 overflow-scroll h-[92%]">
        {videos.map(({ title, thumbnailUrl, youtubeId }, idx) => {
          return (
            <WatchListItem
              title={title}
              thumbnailUrl={thumbnailUrl}
              key={youtubeId}
              youtubeId={youtubeId}
              currentlyWatching={youtubeId === videoId}
              idx={idx}
              watchListId={watchList.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
