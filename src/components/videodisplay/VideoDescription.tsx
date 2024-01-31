"use client";
import { useAppSelector } from "@/lib/store";
import { Video } from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";

interface VideoDescriptionProps {
  currentYoutubeId: string;
}

function VideoDescription({ currentYoutubeId }: VideoDescriptionProps) {
  const videos: Video[] = useAppSelector(
    (state) => state.homeVideoSliceReducer
  );
  // const [description, setDescription] = useState(
  //   "This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description. This video has no description."
  // );
  const [description, setDescription] = useState(
    "This video has no description"
  );
  const [channelTitle, setChannelTitle] = useState("");

  useEffect(() => {
    videos.forEach((video) => {
      if (video.youtubeId === currentYoutubeId) {
        setDescription(video.description ? video.description : description);
        setChannelTitle(video.channelTitle);
      }
    });
  }, []);
  return (
    <div className="bg-[#3F3F3F] h-48 px-4">
      <p className="text-xl mb-4 mt-1">Created By {channelTitle}</p>
      <p className="h-20 w-full overflow-auto">{description}</p>
    </div>
  );
}

export default VideoDescription;
