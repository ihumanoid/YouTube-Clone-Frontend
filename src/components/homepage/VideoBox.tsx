import React from "react";
import Link from "next/link";

function VideoBox() {
  return (
    <Link href="/video/1">
      <div className="bg-yellow-500 h-44 w-80 flex-wrap rounded-xl">Video</div>
    </Link>
  );
}

export default VideoBox;
