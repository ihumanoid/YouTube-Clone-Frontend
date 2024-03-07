import React from "react";
import Link from "next/link";
import Image from "next/image";

interface VideoBoxProps {
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  youtubeId: string;
  duration: string;
  watchListId: number;
}

function VideoBox({
  title,
  thumbnailUrl,
  channelTitle,
  youtubeId,
  duration,
  watchListId,
}: VideoBoxProps) {
  return (
    <Link href={`/video/${watchListId}/${youtubeId}`}>
      <div className="bg-[#151515] h-72 w-80 flex flex-wrap rounded-xl justify-center transition-all hover:scale-105">
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          width={300}
          height={200}
          className="rounded-t-xl"
        />
        <div className="bg-black w-full flex justify-start items-center gap-3 rounded-b-xl">
          <div>
            <Image
              src="/play.png"
              alt="channel thumbnail"
              width={60}
              height={60}
              className="rounded-b-xl"
            />
          </div>
          <p className="w-4/6 h-12 line-clamp-2">{title}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoBox;
