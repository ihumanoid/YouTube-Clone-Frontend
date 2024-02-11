"use client";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Video } from "@/utils/YouTubeTypes";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

interface VideoProps {
  video: Video;
}

function VideoPlayer({ video }: VideoProps) {
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
        url={`https://www.youtube.com/shorts/${video.youtubeId}`}
        onProgress={handleProgress}
      />
    </div>
  );
}

export default VideoPlayer;
