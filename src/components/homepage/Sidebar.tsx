"use client";
import React from "react";
import WatchListTitle from "./WatchListTitle";
import Link from "next/link";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

function Sidebar() {
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  const watchLists = watchListState.watchLists;
  return (
    <div className="bg-black w-44 overflow-auto pb-4">
      <Link
        href="/"
        className="w-full mt-4 mb-8 text-center flex justify-center text-xl hover:font-bold"
      >
        All Watch Lists
      </Link>
      <div className="flex flex-col gap-6 items-center">
        {watchLists.map((watchList, idx) => {
          return (
            <WatchListTitle
              key={idx}
              watchListTitle={watchList.title}
              watchListId={watchList.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
