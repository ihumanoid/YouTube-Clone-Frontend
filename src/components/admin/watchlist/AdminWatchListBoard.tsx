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
import { WatchListVO } from "@/utils/YouTubeTypes";

function AdminWatchListBoard() {
  const [keyword, setKeyword] = useState("");
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  const dispatch = useDispatch();
  const [watchLists, setWatchLists] = useState<WatchListVO[]>(
    watchListState.watchLists
  );
  const [filterActive, setFilterActive] = useState(false);
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

    const watchLists = (await response.json()).data;
    dispatch(changeAllWatchLists(watchLists));
    setWatchLists(watchLists);
  };

  const filterWatchLists = () => {
    if (!keyword) {
      setFilterActive(false);
      return;
    }
    setFilterActive(true);
    const newFilteredWatchLists = watchLists.filter((watchList) =>
      watchList.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredWatchLists(newFilteredWatchLists);
  };

  useEffect(() => {
    fetchWatchLists();
  }, []);

  useEffect(() => {
    if (keyword.length === 0) {
      setFilterActive(false);
    }
  }, [keyword]);

  return (
    <div className="bg-[#303030] h-full flex flex-col flex-1 p-10 w-4/6">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            className="w-72 h-12 text-black px-2"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="Search watch lists"
          ></input>
          <button
            className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={filterWatchLists}
          >
            Search
          </button>
        </div>
        <Link href="/admin/watchlists/add">
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
          (filterActive ? filteredWatchLists : watchLists).map(
            (watchList, idx) => (
              <AdminWatchListBoardItem
                fetchWatchLists={fetchWatchLists}
                watchList={watchList}
                key={idx}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

export default AdminWatchListBoard;
