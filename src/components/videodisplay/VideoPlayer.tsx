"use client";
import { useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { Video } from "@/utils/YouTubeTypes";

interface VideoProps {
  youtubeId: string;
}

function VideoPlayer({ youtubeId }: VideoProps) {
  const videos: Video[] = useAppSelector(
    (state) => state.homeVideoSliceReducer
  );

  return (
    <div className="w-full h-full flex justify-center items-center max-md:h-[500px]">
      <ReactPlayer
        controls={true}
        width="100%"
        height="100%"
        url={`https://www.youtube.com/shorts/${youtubeId}`}
      />
    </div>
  );
}

export default VideoPlayer;
