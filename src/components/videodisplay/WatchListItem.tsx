"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface WatchListItemProps {
  title: string;
  thumbnailUrl: string;
  currentlyWatching: boolean;
  youtubeId: string;
}

function WatchListItem({
  title,
  thumbnailUrl,
  currentlyWatching,
  youtubeId,
}: WatchListItemProps) {
  return (
    <Link
      href={`/video/${youtubeId}`}
      className={`flex w-full h-full gap-4 ${
        currentlyWatching && "bg-slate-800"
      }`}
    >
      <Image src={thumbnailUrl} alt="thumbnail" width={120} height={70} />
      <p className="h-20 line-clamp-3">{title}</p>
    </Link>
  );
}

export default WatchListItem;
