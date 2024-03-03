"use client";
import React, { useEffect } from "react";
import VideoBox from "./VideoBox";
import { useAppSelector } from "@/lib/store";
import { Video } from "@/utils/YouTubeTypes";
import { WatchListReducerState } from "@/lib/features/watchListSlice";
import { useDispatch } from "react-redux";
import { changeAllWatchLists } from "@/lib/features/watchListSlice";

interface VideoProps {
  watchListId: number;
}

function Videos({ watchListId }: VideoProps) {
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  if (watchListState.watchLists.length === 0) {
    return (
      <div className="bg-[#303030] w-full flex flex-wrap gap-x-12 gap-y-4 overflow-scroll justify-start max-lg:justify-center pl-8 py-8 text-2xl">
        Loading...
      </div>
    );
  }

  const watchListIdx = watchListState.watchLists.findIndex(
    (watchList) => watchList.id === watchListId
  );
  const videos = watchListState.watchLists[watchListIdx]?.videos;

  return (
    <div className="bg-[#303030] w-full flex flex-wrap gap-x-12 gap-y-4 overflow-scroll justify-start max-lg:justify-center pl-8 py-8">
      {videos.map(
        ({ title, thumbnailUrl, channelTitle, duration, youtubeId }) => {
          return (
            <VideoBox
              title={title}
              thumbnailUrl={thumbnailUrl}
              channelTitle={channelTitle}
              duration={duration}
              youtubeId={youtubeId}
              key={youtubeId}
              watchListId={watchListId}
            />
          );
        }
      )}
    </div>
  );
}

export default Videos;
