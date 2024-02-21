"use client";
import WatchList from "@/components/videodisplay/WatchList";
import VideoDescription from "@/components/videodisplay/VideoDescription";
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/homepage/Navbar";
import { useAppSelector } from "@/lib/store";
import { useEffect } from "react";
import { changeAllWatchLists } from "@/lib/features/watchListSlice";
import { useDispatch } from "react-redux";

const VideoPlayer = dynamic(
  () => import("@/components/videodisplay/VideoPlayer"),
  {
    ssr: false,
  }
);

function Page({
  params,
}: {
  params: { watchListId: string; videoId: string };
}) {
  const watchListState = useAppSelector((state) => state.watchListSliceReducer);
  const watchLists = watchListState.watchLists;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchLists = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchlists`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const watchLists = (await response.json()).data;
      console.log("fetch via navbar" + watchLists);
      dispatch(changeAllWatchLists(watchLists));
    };
    if (watchLists.length === 0) {
      fetchWatchLists();
    }
  }, []);

  if (watchLists?.length === 0) {
    return <div>Loading...</div>;
  }
  const watchListIdx = watchLists.findIndex(
    (watchList) => watchList.id === parseInt(params.watchListId)
  );
  const watchList = watchLists[watchListIdx];
  const videoIdx = watchList.videos.findIndex(
    (video) => video.youtubeId === params.videoId
  );
  const video = watchList.videos[videoIdx];

  return (
    <>
      <Navbar />
      <div className="flex w-full h-[90vh] max-md:flex-col">
        <div className="flex flex-col h-full w-full">
          <VideoPlayer video={video} />
          <VideoDescription video={video} />
        </div>
        <WatchList watchList={watchList} videoId={params.videoId} />
      </div>
    </>
  );
}

export default Page;
