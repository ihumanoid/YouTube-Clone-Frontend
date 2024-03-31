import { Commercial, Video } from "@/utils/YouTubeTypes";
import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Duration } from "luxon";

interface AdminCommercialBoxProps {
  toggleDeleteId: (deleteId: string) => void;
  commercial: Commercial;
}

function AdminCommercialBox({
  commercial,
  toggleDeleteId,
}: AdminCommercialBoxProps) {
  const duration = Duration.fromISO(commercial.duration);

  return (
    <div className="w-full bg-black h-48 flex justify-between items-center gap-3 border-white border-b-2 border-soiid">
      <div className="flex h-full items-center pl-4">
        <div className="relative">
          <img
            src={commercial.thumbnailUrl}
            alt="thumbnail"
            width={200}
            height={150}
          />
          <div className="absolute bottom-5 right-1 bg-black text-white p-1 rounded">
            {`${duration.minutes}:${duration.seconds}`}
          </div>
        </div>
        <div className="flex flex-col flex-1 ml-8">
          <Link
            href={`https://www.youtube.com/watch?v=${commercial.youtubeId}`}
            className="line-clamp-2 hover:underline mb-4"
            target="_blank"
          >
            {commercial.title}
          </Link>
          <p className="text-[#AAAAAA] text-sm">{commercial.channelTitle}</p>
        </div>
      </div>
      <input
        type="checkbox"
        className="w-6 h-6 mr-4"
        onClick={() => {
          if (commercial.youtubeId) {
            toggleDeleteId(commercial.youtubeId);
          }
        }}
      />
    </div>
  );
}

export default AdminCommercialBox;
