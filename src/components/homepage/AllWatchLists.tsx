"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

function AllWatchLists() {
  const router = useRouter();
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  const watchLists = watchListState.watchLists;
  const keyword = watchListState.keyword;
  const filteredWatchLists = watchLists.filter((watchList) =>
    watchList.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="bg-[#303030] w-full flex flex-wrap gap-4 overflow-scroll justify-start max-lg:justify-center pl-8 py-8">
      {filteredWatchLists.map((watchList) => {
        return (
          <button
            onClick={() => router.push("" + watchList.id)}
            key={watchList.id}
            className="flex items-center justify-center h-48 w-98 bg-[#151515] hover:scale-105 transition-all ml-4"
          >
            <div className="flex-shrink-0 w-1/2">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-1">
                  {watchList.title}
                </h2>
                <Image
                  alt="thumbnail"
                  src={watchList.videos[0].thumbnailUrl}
                  width={300}
                  height={250}
                />
              </div>
            </div>

            <div className="flex-shrink-0 w-1/2 bg-gray-800 text-white">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">{watchList.length}</p>
                  <p className="text-gray-300">Videos</p>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default AllWatchLists;
