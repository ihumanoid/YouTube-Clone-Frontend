"use client";
import { ExperimentDataVO, VideoDataDTO } from "@/utils/YouTubeTypes";
import { current } from "@reduxjs/toolkit";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const EVideoPlayer = dynamic(
  () => import("@/components/evideodisplay/EVideoPlayer"),
  {
    ssr: false,
  }
);

function Page({ params }: { params: { experimentId: string } }) {
  const [experimentData, setExperimentData] = useState<ExperimentDataVO | null>(
    null
  );

  useEffect(() => {
    const fetchWatchLists = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment?experimentId=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = (await response.json()).data;
      setExperimentData(data);
    };
    fetchWatchLists();
  }, []);

  const updateVideoData = async (
    watchTime: number,
    numSkipsAhead: number,
    numSkipsBehind: number,
    liked: boolean,
    disliked: boolean
  ) => {
    if (
      !experimentData ||
      !experimentData.watchListVO.videos[experimentData.currentVideoIdx].id
    ) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/videoData`;
    const videoId =
      experimentData.watchListVO.videos[experimentData.currentVideoIdx].id;

    if (videoId) {
      const body: VideoDataDTO = {
        experimentId: params.experimentId,
        participantId: experimentData.participantId,
        watchListId: experimentData.watchListId,
        videoId,
        watchTime,
        numSkipsAhead,
        numSkipsBehind,
        liked,
        disliked,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Error code: ${response.status}`);
      }

      setExperimentData({
        ...experimentData,
        currentVideoIdx: experimentData.currentVideoIdx + 1,
      });
    }
  };

  if (!experimentData) {
    return (
      <div className="w-full h-full bg-black text-2xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  console.log(experimentData);

  const currentYoutubeId =
    experimentData.watchListVO.videos[experimentData.currentVideoIdx].youtubeId;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <EVideoPlayer
        youtubeId={currentYoutubeId}
        updateVideoData={updateVideoData}
      />
    </div>
  );
}

export default Page;
