"use client";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function Video() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactPlayer
        controls={true}
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=P8ERBy91Y90"
      />
    </div>
  );
}

export default Video;
