import React from "react";
import RecommendedVideoBox from "./RecommendedVideoBox";

function RecommendedVideos() {
  return (
    <div className="w-96 bg-yellow-600 max-md:w-full h-full min-h-96">
      Recommended Videos
      <div className="flex flex-col w-full gap-y-3 overflow-auto h-full">
        {Array(10).fill(<RecommendedVideoBox />)}
      </div>
    </div>
  );
}

export default RecommendedVideos;
