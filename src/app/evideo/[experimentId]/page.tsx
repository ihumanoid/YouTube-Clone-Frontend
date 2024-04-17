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

  const handleDoneWatching = async () => {
    if (!experimentData) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/checkSurvey?experimentId=${experimentData.id}`;
    const response = await fetch(url);
    const json = await response.json();
    if (!json.data) {
      router.push(`/esurvey/${experimentData.id}`);
    }
  };

  useEffect(() => {
    const fetchExperimentData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment?experimentId=${params.experimentId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      const data = json.data;
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
      !experimentData.watchListCommercialsVideosVO.videos[
        experimentData.currentVideoIdx
      ].id
    ) {
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/videoData`;
    const videoId =
      experimentData.watchListCommercialsVideosVO.videos[
        experimentData.currentVideoIdx
      ].id;

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

      if (experimentData.currentVideoIdx === experimentData.showAfterVideoIdx) {
        router.push(`/ead/${experimentData.id}`);
      } else if (
        experimentData.currentVideoIdx ===
        experimentData.watchListCommercialsVideosVO.videos.length - 1
      ) {
        router.push(`/esurvey/${experimentData.id}`);
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

  // if done watching all videos, show thank-you page or redirect to survey
  if (
    experimentData.currentVideoIdx ===
    experimentData.watchListCommercialsVideosVO.videos.length
  ) {
    handleDoneWatching();
    return (
      <div className="w-full h-full flex justify-center items-center text-center text-3xl bg-black text-white">
        Session complete. Thank you for your participation! You can close this
        window.
      </div>
    );
  }

  const currentYoutubeId =
    experimentData.watchListCommercialsVideosVO.videos[
      experimentData.currentVideoIdx
    ].youtubeId;
  const currentVideoTitle =
    experimentData.watchListCommercialsVideosVO.videos[
      experimentData.currentVideoIdx
    ].title;

  return (
    <div className="w-full h-full flex justify-center items-center bg-black max-md:pb-28">
      <EVideoPlayer
        youtubeId={currentYoutubeId}
        updateVideoData={updateVideoData}
        videoTitle={currentVideoTitle}
      />
    </div>
  );
}

export default Page;
