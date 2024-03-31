"use client";
import {
  ExperimentData,
  RandomParamsVO,
  WatchListCommercialsVideosVO,
} from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SelectWatchListProps {
  email: string;
  setAssignedWatchList: React.Dispatch<
    React.SetStateAction<WatchListCommercialsVideosVO | null>
  >;
  setExperimentId: React.Dispatch<React.SetStateAction<string>>;
  incrementPageNum: () => void;
}

enum CommercialSimilarityLevels {
  LOW = "LOW",
  HIGH = "HIGH",
}

function SelectWatchList({
  email,
  setAssignedWatchList,
  setExperimentId,
  incrementPageNum,
}: SelectWatchListProps) {
  const [watchLists, setWatchLists] = useState<WatchListCommercialsVideosVO[]>(
    []
  );
  const [selectedWatchListIdx, setSelectedWatchListIdx] = useState(-1);

  useEffect(() => {
    const fetchWatchLists = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchListsWithCommercialsVideos`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Error code: ${response.status}`);
      }

      const json = await response.json();
      setWatchLists(json.data);
    };
    fetchWatchLists();
  }, []);

  const createExperimentAndRedirect = async () => {
    // get random params
    const randomParamsUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/randomParams`;
    const randomParamsResponse = await fetch(randomParamsUrl);
    const randomParams: RandomParamsVO = (await randomParamsResponse.json())
      .data;

    // process random params
    let assignedWatchList = watchLists[selectedWatchListIdx];
    let assignedCommercialYoutubeId = "";
    let assignedSimilarityLevel = "";
    const assignedSimilarityIndex = randomParams.similarityIndex;
    const assignedShowAdAfterVideoIdx = randomParams.showAdAfterIndex;
    if (randomParams.giveDesiredWatchList === 0) {
      if (randomParams.watchListIndex >= selectedWatchListIdx) {
        randomParams.watchListIndex++;
      }
      assignedWatchList = watchLists[randomParams.watchListIndex];
    }
    const canSkip = randomParams.skipEnabled === 1;

    switch (randomParams.similarityLevel) {
      case 0:
        assignedCommercialYoutubeId =
          assignedWatchList.lowSimilarity[assignedSimilarityIndex]
            .commercialYoutubeId;
        assignedSimilarityLevel = CommercialSimilarityLevels.LOW;
        break;
      default:
        assignedCommercialYoutubeId =
          assignedWatchList.highSimilarity[assignedSimilarityIndex]
            .commercialYoutubeId;
        assignedSimilarityLevel = CommercialSimilarityLevels.HIGH;
    }

    // create experiment data object
    const experimentId = email.split("@")[0] + new Date().getTime();
    setExperimentId(experimentId);
    const experimentData: ExperimentData = {
      id: experimentId,
      participantId: email,
      watchListId: assignedWatchList.id,
      watchListTitle: assignedWatchList.title,
      currentVideoIdx: 0,
      skipEnabled: canSkip,
      showAfterVideoIdx: assignedShowAdAfterVideoIdx,
      commercialYoutubeId: assignedCommercialYoutubeId,
      commercialSimilarityLevel: assignedSimilarityLevel,
    };

    // create experiment in backend
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(experimentData),
    });

    // redirect if experiment has been successfully created
    if (!response.ok) {
      throw new Error(`HTTP Error! Error code: ${response.status}`);
    }

    setAssignedWatchList(assignedWatchList);
    incrementPageNum();
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-700 px-10 py-4 rounded-lg">
        <div className="text-2xl text-center mb-4">
          Among the following topics, which one seems the most interesting to
          you
        </div>
        <div className="max-h-[450px] overflow-auto">
          {watchLists.map((watchList, idx) => {
            return (
              <div
                key={idx}
                className={`bg-[#151515] mx-2 py-2 rounded-sm ${
                  selectedWatchListIdx === idx
                    ? "border-2 border-blue-500 rounded-md"
                    : "border-2 border-[#151515]"
                }`}
              >
                <div className="ml-4 flex items-center gap-2 justify-between px-8">
                  <div>
                    <p className="text-2xl">{watchList.title}</p>
                    <p className="text-gray-400 text-sm">
                      {watchList.length} videos
                    </p>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => setSelectedWatchListIdx(idx)}
                  >
                    Select
                  </button>
                </div>
                <div className="flex px-4 gap-4 justify-between items-center">
                  {/* <div className="flex flex-1 overflow-scroll max-lg:max-w-[400px] max-w-[600px] gap-x-4">
                    {watchList.videos.map((video, idx) => {
                      return (
                        <div
                          className="group relative min-w-32 min-h-24 flex justify-center items-center"
                          key={idx}
                        >
                          <img
                            src={video.thumbnailUrl}
                            alt="thumbnail"
                            width={120}
                            height={100}
                          />
                          <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded text-[8px] max-h-12 line-clamp-3">
                            {video.title}
                          </div>
                        </div>
                      );
                    })}
                  </div> */}
                  {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => setSelectedWatchListIdx(idx)}
                  >
                    Select
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-white px-2 py-1 text-gray-700 hover:bg-slate-200 text-2xl border-2 rounded-md border-gray-900"
            onClick={createExperimentAndRedirect}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectWatchList;
