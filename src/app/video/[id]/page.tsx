import WatchList from "@/components/videodisplay/WatchList";
import VideoDescription from "@/components/videodisplay/VideoDescription";
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/homepage/Navbar";

const Video = dynamic(() => import("@/components/videodisplay/Video"), {
  ssr: false,
});

function page({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[90vh] max-md:flex-col">
        <div className="flex flex-col h-full w-full">
          <Video />
          <VideoDescription />
        </div>
        <WatchList />
      </div>
    </>
  );
}

export default page;
