"use client";
import WatchList from "@/components/videodisplay/WatchList";
import { WatchListCommercialsVO } from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";
import AdminCommercialBoardItem from "./AdminCommercialBoardItem";

function AdminCommercialBoard() {
  const [watchLists, setWatchLists] = useState<WatchListCommercialsVO[]>([]);
  const [filteredWatchLists, setFilteredWatchLists] = useState<
    WatchListCommercialsVO[]
  >([]);
  const [keyword, setKeyword] = useState("");

  const filterWatchLists = () => {
    if (!watchLists) {
      return;
    }
    const newFilteredWatchLists = watchLists.filter((watchList) =>
      watchList.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredWatchLists(newFilteredWatchLists);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setFilteredWatchLists(watchLists);
    }
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      filterWatchLists();
    }
  };

  useEffect(() => {
    const fetchWatchLists = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/watchlist/watchListsWithCommercials`;
      const response = await fetch(url);
      const json = await response.json();
      setWatchLists(json.data);
      setFilteredWatchLists(json.data);
    };
    fetchWatchLists();
  }, []);

  return (
    <div className="bg-[#303030] h-full flex flex-col flex-1 p-10 w-4/6">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            className="w-72 h-12 text-black px-2"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
            placeholder="Search watch lists"
          ></input>
          <button
            className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={filterWatchLists}
          >
            Search
          </button>
        </div>
      </div>
      <div className="bg-black h-full mt-10 overflow-auto flex flex-col gap-y-4 py-4">
        {watchLists.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xl">
            No Items in Here
          </div>
        ) : (
          filteredWatchLists.map((watchList, idx) => (
            <AdminCommercialBoardItem watchList={watchList} key={idx} />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminCommercialBoard;
