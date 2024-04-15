"use client";
import {
  AdvertisementDataDTO,
  ExperimentDataVO,
  VideoDataDTO,
} from "@/utils/YouTubeTypes";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EAdPlayer = dynamic(
  () => import("@/components/evideodisplay/EAdPlayer"),
  {
    ssr: false,
  }
);

function Page({ params }: { params: { experimentId: string } }) {
  const experimentId = params.experimentId;
  const [experimentData, setExperimentData] = useState<ExperimentDataVO | null>(
    null
  );
  const router = useRouter();

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

  const updateAdvertisementData = async (skipped: boolean) => {
    const advertisementData: AdvertisementDataDTO = {
      experimentId: experimentId,
      watchListId: experimentData.watchListId,
      skipEnabled: experimentData.skipEnabled,
      skipped,
    };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/advertisementData`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(advertisementData),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Error code: ${response.status}`);
    }

    router.push(`/evideo/${experimentData.id}`);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-black max-md:pb-28">
      <EAdPlayer
        youtubeId={experimentData.commercialYoutubeId}
        skipEnabled={experimentData.skipEnabled}
        experimentId={experimentId}
        updateAdvertisementData={updateAdvertisementData}
      />
    </div>
  );
}

export default Page;
