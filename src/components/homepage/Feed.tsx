import React from "react";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

interface FeedProps {
  watchListId: number;
}

function Feed({ watchListId }: FeedProps) {
  return (
    <div className="h-full flex">
      <Sidebar />
      <Videos watchListId={watchListId} />
    </div>
  );
}

export default Feed;
