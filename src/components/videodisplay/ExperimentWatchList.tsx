"use client";
import React from "react";
import WatchListItem from "./WatchListItem";
import { Video } from "@/utils/YouTubeTypes";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

interface WatchListProps {
  currentYoutubeId: string;
}

function ExperimentWatchList({ currentYoutubeId }: WatchListProps) {
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  const watchListIdx = watchListState.watchLists.findIndex(
    (watchList) => watchList.id === watchListState.currentWatchListId
  );
  const videos = watchListState.watchLists[watchListIdx].videos;

  return (
    <div className="w-96 bg-black max-md:w-full h-full">
      <p className="text-xl h-[8%]">Watch List</p>
      <div className="flex flex-col flex-1 w-full gap-y-3 overflow-scroll h-[82%]">
        {videos.map(({ title, thumbnailUrl, youtubeId }, idx) => {
          return (
            <WatchListItem
              title={title}
              thumbnailUrl={thumbnailUrl}
              key={youtubeId}
              youtubeId={youtubeId}
              currentlyWatching={youtubeId === currentYoutubeId}
              idx={idx}
            />
          );
        })}
        {videos.map(({ title, thumbnailUrl, youtubeId }, idx) => {
          return (
            <WatchListItem
              title={title}
              thumbnailUrl={thumbnailUrl}
              key={youtubeId}
              youtubeId={youtubeId}
              currentlyWatching={youtubeId === currentYoutubeId}
              idx={idx + videos.length}
            />
          );
        })}
      </div>
      <div className="bg-[#101010] hover:bg-[#151515] cursor-pointer flex justify-center items-center gap-2 h-[10%]">
        <p className="font-bold text-lg">Survey</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="white"
          width={30}
          height={30}
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </div>
    </div>
  );
}

export default ExperimentWatchList;
