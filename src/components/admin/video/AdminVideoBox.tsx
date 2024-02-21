import { Video } from "@/utils/YouTubeTypes";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Duration } from "luxon";

interface AdminVideoBoxProps {
  toggleDeleteId: (deleteId: number) => void;
  video: Video;
}

function AdminVideoBox({ video, toggleDeleteId }: AdminVideoBoxProps) {
  const duration = Duration.fromISO(video.duration);

  return (
    <div className="w-full bg-black h-48 flex justify-between items-center gap-3 border-white border-b-2 border-soiid">
      <div className="flex h-full items-center pl-4">
        <div className="relative">
          <Image
            src={video.thumbnailUrl}
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
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            className="line-clamp-2 hover:underline mb-4"
            target="_blank"
          >
            {video.title}
          </Link>
          <p className="text-[#AAAAAA] text-sm">{video.channelTitle}</p>
        </div>
      </div>
      <input
        type="checkbox"
        className="w-6 h-6 mr-4"
        onClick={() => {
          if (video.id) {
            toggleDeleteId(video.id);
          }
        }}
      />
    </div>
  );
}

export default AdminVideoBox;
