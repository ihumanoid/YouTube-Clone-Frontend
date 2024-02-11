"use client";
import { ExperimentDataVO, VideoDataDTO } from "@/utils/YouTubeTypes";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const EAdPlayer = dynamic(
  () => import("@/components/evideodisplay/EAdPlayer"),
  {
    ssr: false,
  }
);

function Page({
  params,
}: {
  params: { experimentId: string; skipEnabled: string };
}) {
  const experimentId = params.experimentId;
  const [experimentData, setExperimentData] = useState<ExperimentDataVO | null>(
    null
  );

  useEffect(() => {
    const fetchExperimentData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment?experimentId=${experimentId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = (await response.json()).data;
      setExperimentData(data);
    };
    fetchExperimentData();
  }, []);

  if (!experimentData) {
    return (
      <div className="w-full h-full bg-black text-2xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const skipEnabled = params.skipEnabled === "1";

  return (
    <EAdPlayer
      youtubeId="cYATyMUM0RI"
      skipEnabled={skipEnabled}
      experimentId={experimentId}
    />
  );
}

export default Page;
