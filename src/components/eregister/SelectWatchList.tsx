"use client";
import { ExperimentData, WatchListVO } from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IncrementalCache } from "next/dist/server/lib/incremental-cache";

interface SelectWatchListProps {
  email: string;
  setAssignedWatchList: React.Dispatch<
    React.SetStateAction<WatchListVO | null>
  >;
  setExperimentId: React.Dispatch<React.SetStateAction<string>>;
  incrementPageNum: () => void;
}

function SelectWatchList({
  email,
  setAssignedWatchList,
  setExperimentId,
  incrementPageNum,
}: SelectWatchListProps) {
  const [watchLists, setWatchLists] = useState<WatchListVO[]>([]);
  const [selectedWatchListIdx, setSelectedWatchListIdx] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const fetchWatchLists = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchlists`;
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
    // randomize watch list
    let randomNum = Math.floor(Math.random() * 10);
    let selectedWatchList = watchLists[selectedWatchListIdx];

    if (randomNum >= 5) {
      const filteredWatchLists = watchLists
        .slice(0, selectedWatchListIdx)
        .concat(watchLists.slice(selectedWatchListIdx + 1));
      const newSelectedWatchListIdx = Math.floor(
        Math.random() * filteredWatchLists.length
      );
      selectedWatchList = filteredWatchLists[newSelectedWatchListIdx];
    }

    // randomize skip permission
    randomNum = Math.floor(Math.random() * 10);
    const canSkip = randomNum >= 5;

    // create experiment data object
    const experimentId = email.split("@")[0] + new Date().getTime();
    setExperimentId(experimentId);
    const experimentData: ExperimentData = {
      id: experimentId,
      participantId: email,
      watchListId: selectedWatchList.id,
      watchListTitle: selectedWatchList.title,
      currentVideoIdx: 0,
      skipEnabled: canSkip,
      showAfterVideoIdx: 5,
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

    setAssignedWatchList(selectedWatchList);
    incrementPageNum();
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-700 px-10 py-4 rounded-lg">
        <div className="text-2xl text-center mb-4">
          Among the following watch lists, which one seems the most interesting
          to you
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
                <div className="ml-4 flex items-center gap-2">
                  <p className="text-xl">{watchList.title}</p>
                  <p className="text-gray-400 text-sm">
                    {watchList.length} videos
                  </p>
                </div>
                <div className="flex px-4 gap-4 justify-between items-center">
                  <div className="flex flex-1 overflow-scroll max-lg:max-w-[400px] max-w-[600px] gap-x-4">
                    {watchList.videos.map((video, idx) => {
                      return (
                        <div
                          className="group relative min-w-32 min-h-24 flex justify-center items-center"
                          key={idx}
                        >
                          <Image
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
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => setSelectedWatchListIdx(idx)}
                  >
                    Select
                  </button>
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
