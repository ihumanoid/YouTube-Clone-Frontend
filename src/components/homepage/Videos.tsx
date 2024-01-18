import React from "react";
import VideoBox from "./VideoBox";

function Videos() {
  return (
    <div className="bg-red-500 w-full flex flex-wrap gap-8 overflow-scroll justify-center items-center">
      {Array(9).fill(<VideoBox />)}
    </div>
  );
}

export default Videos;
