"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { changeWatchList } from "@/lib/features/homeVideoSlice";

interface WatchListTitleProps {
  watchListId: string;
  watchListTitle: string;
}

export default function WatchListTitle({
  watchListTitle,
  watchListId,
}: WatchListTitleProps) {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className="bg-[#272727] rounded-3xl w-4/6 h-10 flex justify-center items-center hover:font-bold cursor-pointer"
      onClick={() => dispatch(changeWatchList(watchListId))}
    >
      {watchListTitle}
    </button>
  );
}
