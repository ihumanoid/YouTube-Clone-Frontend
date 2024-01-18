import Navbar from "@/components/homepage/Navbar";
import RecommendedVideos from "@/components/videodisplay/RecommendedVideos";
import Video from "@/components/videodisplay/Video";
import VideoDescription from "@/components/videodisplay/VideoDescription";
import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full h-full max-md:flex-col">
      <div className="flex flex-col h-full w-full min-h-full">
        <Video />
        <VideoDescription />
      </div>
      <RecommendedVideos />
    </div>
  );
}

export default page;
