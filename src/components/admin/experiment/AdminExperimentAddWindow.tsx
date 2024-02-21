"use client";
import React, { useEffect, useState } from "react";
import { WatchListVO } from "@/utils/YouTubeTypes";
import Image from "next/image";
import { ExperimentData } from "@/utils/YouTubeTypes";

interface AdminExperimentAddWindowProps {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  fetchExperimentData: () => {};
}

function AdminExperimentAddWindow({
  setShowWindow,
  fetchExperimentData,
}: AdminExperimentAddWindowProps) {
  const [watchLists, setWatchLists] = useState<WatchListVO[]>([]);
  const [formData, setFormData] = useState<ExperimentData>({
    id: "",
    participantId: "",
    watchListTitle: "",
    watchListId: 0,
    currentVideoIdx: 0,
    skipEnabled: false,
    showAfterVideoIdx: 0,
  });
  const [watchListFilter, setWatchListFilter] = useState("");
  const [filteredWatchLists, setFilteredWatchLists] = useState<WatchListVO[]>(
    []
  );

  const fetchWatchLists = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchlists`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    setWatchLists(json.data);
    setFilteredWatchLists(json.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectWatchList = (watchList: WatchListVO) => {
    setFormData((prev) => ({
      ...prev,
      watchListTitle: watchList.title,
      watchListId: watchList.id,
    }));
  };
  const getRandomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < 10; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomId;
  };

  const handleSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setShowWindow(false);
    fetchExperimentData();
  };

  useEffect(() => {
    fetchWatchLists();
  }, []);

  useEffect(() => {
    const newFilteredWatchLists = watchLists.filter((watchList) =>
      watchList.title.toLowerCase().includes(watchListFilter.toLowerCase())
    );
    setFilteredWatchLists(newFilteredWatchLists);
  }, [watchListFilter]);

  if (!watchLists) {
    return (
      <div className="z-10">
        <div className="bg-gray-800 opacity-50 fixed inset-0" />
        <div className="fixed top-1/2 left-1/2 bg-[#323264] h-96 w-5/6 transform -translate-x-1/2 -translate-y-1/2 shadow-md text-xl">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div className="z-10">
      <div className="bg-gray-800 opacity-50 fixed inset-0" />
      <div className="fixed top-1/2 left-1/2 bg-[#323264] w-5/6 transform -translate-x-1/2 -translate-y-1/2 shadow-md flex flex-col">
        <div className="w-full text-center text-2xl my-4">New Entry</div>
        <div className="flex gap-x-8">
          <div className="flex flex-col px-8 text-lg gap-2">
            <div className="mb-4">
              <label className="block mb-1">ID:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="text-black p-1 w-32"
              />
              <button
                className="border border-1 border-black bg-gray-500 p-1 ml-1"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, id: getRandomId() }))
                }
              >
                randomize
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Participant ID:</label>
              <input
                type="text"
                name="participantId"
                value={formData.participantId}
                onChange={handleChange}
                className="text-black p-1 w-32"
              />
              <button
                className="border border-1 border-black bg-gray-500 p-1 ml-1"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    participantId: getRandomId(),
                  }))
                }
              >
                randomize
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Watch List:</label>
              <input
                type="text"
                name="currentVideoIdx"
                value={formData.watchListTitle}
                onChange={handleChange}
                className="text-black p-1 w-56 bg-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Show Ad After Video Index:</label>
              <input
                type="number"
                name="showAfterVideoIdx"
                value={formData.showAfterVideoIdx}
                onChange={handleChange}
                className="text-black p-1 w-32"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Current Video Index:</label>
              <input
                type="number"
                name="currentVideoIdx"
                value={formData.currentVideoIdx}
                onChange={handleChange}
                className="text-black p-1 w-32"
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <label>Skip Enabled</label>
              <input
                type="checkbox"
                name="skipEnabled"
                checked={formData.skipEnabled}
                onChange={handleChange}
                className="h-6 w-6"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 h-full mr-4">
            <div className="flex justify-center mb-4">
              <input
                placeholder="filter watch lists"
                type="text"
                value={watchListFilter}
                onChange={(e) => setWatchListFilter(e.target.value)}
                className="text-black p-1 w-48"
              />
            </div>
            <div className="h-[450px] min-h-[450px] overflow-auto">
              {filteredWatchLists.length == 0 ? (
                <div className="w-full h-full bg-black">
                  No watch lists found
                </div>
              ) : (
                filteredWatchLists.map((watchList, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-black w-full h-32 flex flex-col"
                    >
                      <div className="ml-4 flex justify-between">
                        <div className="flex gap-2 items-center">
                          <p>{watchList.title}</p>
                          <p className="text-gray-400 text-sm">
                            {watchList.length} videos
                          </p>
                        </div>
                        <div className="flex items-center my-1 pr-2">
                          <button
                            className="bg-gray-700 hover:bg-gray-800 border-2 border-gray-900 px-4 rounded-sm"
                            onClick={() => handleSelectWatchList(watchList)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between gap-4 ml-4">
                        <div className="flex overflow-auto w-full gap-1">
                          {watchList.videos.map((video) => (
                            <Image
                              key={video.id}
                              alt="thumbnail"
                              src={video.thumbnailUrl}
                              width={100}
                              height={80}
                            />
                          ))}
                        </div>
                        <Image
                          alt="thumbnail"
                          src={watchList.commercial.thumbnailUrl}
                          width={100}
                          height={80}
                          className="border border-2 border-red-500"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-xl border-2 border-gray-900 px-4 rounded-sm mb-2"
            onClick={handleSubmit}
            disabled={
              !formData.id ||
              !formData.participantId ||
              !formData.watchListId ||
              formData.showAfterVideoIdx === undefined ||
              formData.currentVideoIdx === undefined
            }
          >
            Submit
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-xl border-2 border-gray-900 px-4 rounded-sm mb-2"
            onClick={() => setShowWindow(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminExperimentAddWindow;
