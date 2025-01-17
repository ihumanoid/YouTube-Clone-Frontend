"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store";
import {
  WatchListReducerState,
  changeAllWatchLists,
} from "@/lib/features/watchListSlice";
import AdminWatchListBoardItem from "./AdminWatchListBoardItem";
import { useDispatch } from "react-redux";
import { WatchListVideosVO } from "@/utils/YouTubeTypes";

function AdminWatchListBoard() {
  const [keyword, setKeyword] = useState("");
  const [watchLists, setWatchLists] = useState<WatchListVideosVO[]>([]);
  const [filteredWatchLists, setFilteredWatchLists] = useState<
    WatchListVideosVO[]
  >([]);
  const fetchWatchLists = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchlists`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const watchLists = (await response.json()).data;
    setWatchLists(watchLists);
    setFilteredWatchLists(watchLists);
  };

  const filterWatchLists = () => {
    const newFilteredWatchLists = watchLists.filter((watchList) =>
      watchList.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredWatchLists(newFilteredWatchLists);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    if (!newKeyword) {
      setFilteredWatchLists(watchLists);
    }
    setKeyword(newKeyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      filterWatchLists();
    }
  };

  useEffect(() => {
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
        <Link href="/nimda/watchlists/add">
          <button className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]">
            Create
          </button>
        </Link>
      </div>
      <div className="bg-black h-full mt-10 overflow-auto flex flex-col gap-y-4 py-4">
        {watchLists.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xl">
            No Items in Here
          </div>
        ) : (
          filteredWatchLists.map((watchList, idx) => (
            <AdminWatchListBoardItem
              fetchWatchLists={fetchWatchLists}
              watchList={watchList}
              key={idx}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminWatchListBoard;
