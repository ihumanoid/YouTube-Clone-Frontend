"use client";
import { ExperimentDataVO, VideoDataDTO } from "@/utils/YouTubeTypes";
import { current } from "@reduxjs/toolkit";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const fetchExperimentData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment?experimentId=${params.experimentId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = (await response.json()).data;
      setExperimentData(data);
    };

    fetchExperimentData();
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

      if (experimentData.currentVideoIdx == experimentData.showAfterVideoIdx) {
        router.push(
          `/ead/${experimentData.id}/${experimentData.skipEnabled ? "1" : "0"}`
        );
      } else if (
        experimentData.currentVideoIdx ===
        experimentData.watchListVO.videos.length - 1
      ) {
        router.push(`esurvey/${experimentData.id}`);
      } else {
        setExperimentData({
          ...experimentData,
          currentVideoIdx: experimentData.currentVideoIdx + 1,
        });
      }
    }
  };

  if (!experimentData) {
    return (
      <div className="w-full h-full bg-black text-2xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

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
