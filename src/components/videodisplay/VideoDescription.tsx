"use client";
import { WatchListReducerState } from "@/lib/features/watchListSlice";
import { useAppSelector } from "@/lib/store";
import { Video } from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";

interface VideoDescriptionProps {
  video: Video;
}

function VideoDescription({ video }: VideoDescriptionProps) {
  return (
    <div className="bg-[#3F3F3F] h-48 px-4">
      <p className="text-xl mb-4 mt-1">Created By {video.channelTitle}</p>
      <p className="h-20 w-full overflow-auto">
        {video.description || "This video has no description."}
      </p>
    </div>
  );
}

export default VideoDescription;
