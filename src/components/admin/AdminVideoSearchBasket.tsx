import { SearchResultVideo } from "@/utils/YouTubeTypes";
import Image from "next/image";
import React from "react";

interface AdminVideoSearchBasketParams {
  videos: SearchResultVideo[];
}

function AdminVideoSearchBasket({ videos }: AdminVideoSearchBasketParams) {
  function getVideoElements() {
    const videoElements: React.JSX.Element[] = [];
    videos.forEach((video) => {
      videoElements.push(
        <div className="w-full h-32 flex">
          <Image
            alt="thumbnail"
            src={video.thumbnail.url}
            width={150}
            height={100}
          />
          <p>{video.title}</p>
        </div>
      );
    });
    return videoElements;
  }
  return (
    <div className="bg-black h-full w-full flex flex-col overflow-auto">
      {getVideoElements()}
    </div>
  );
}

export default AdminVideoSearchBasket;
