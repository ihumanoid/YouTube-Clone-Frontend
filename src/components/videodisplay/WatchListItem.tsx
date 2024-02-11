"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface WatchListItemProps {
  title: string;
  thumbnailUrl: string;
  currentlyWatching: boolean;
  youtubeId: string;
  idx: number;
  watchListId: number;
}

function WatchListItem({
  title,
  thumbnailUrl,
  currentlyWatching,
  youtubeId,
  idx,
  watchListId,
}: WatchListItemProps) {
  return (
    <Link
      href={`/video/${watchListId}/${youtubeId}`}
      className={`flex w-full gap-4 hover:bg-slate-800 ${
        currentlyWatching && "bg-slate-800"
      }`}
    >
      <Image src={thumbnailUrl} alt="thumbnail" width={100} height={70} />
      <p className="h-[76px] line-clamp-3 overflow-hidden flex-1">{title}</p>
      <div className="bg-gray-700 rounded-md my-auto text-white w-6 h-6 flex justify-center items-center">
        {idx}
      </div>
    </Link>
  );
}

export default WatchListItem;
