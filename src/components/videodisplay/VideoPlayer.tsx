"use client";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Video } from "@/utils/YouTubeTypes";

interface VideoProps {
  youtubeId: string;
}

function VideoPlayer({ youtubeId }: VideoProps) {
  const videos: Video[] = useAppSelector(
    (state) => state.homeVideoSliceReducer
  );

  const [prevPlayedSeconds, setPrevPlayedSeconds] = useState(0);

  const handleProgress = (progress: any) => {
    if (progress.playedSeconds - prevPlayedSeconds > 5) {
      console.log(
        "User has skipped " +
          Math.floor(progress.playedSeconds - prevPlayedSeconds)
      );
    }
    setPrevPlayedSeconds(progress.playedSeconds);
  };

  return (
    <div className="w-full h-full flex justify-center items-center max-md:h-[500px]">
      <ReactPlayer
        controls={true}
        width="100%"
        height="100%"
        url={`https://www.youtube.com/shorts/${youtubeId}`}
        onProgress={handleProgress}
      />
    </div>
  );
}

export default VideoPlayer;
