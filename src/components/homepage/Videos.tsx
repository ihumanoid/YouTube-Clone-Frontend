"use client";
import React from "react";
import VideoBox from "./VideoBox";
import { useAppSelector } from "@/lib/store";
import { Video } from "@/utils/YouTubeTypes";

function Videos() {
  const videos: Video[] = useAppSelector(
    (state) => state.homeVideoSliceReducer
  );

  return (
    <div className="bg-black w-full flex flex-wrap gap-4 overflow-scroll justify-start max-md:justify-center items-center pl-8 py-8">
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
            />
          );
        }
      )}
    </div>
  );
}

export default Videos;
