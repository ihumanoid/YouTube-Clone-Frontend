import React from "react";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

function Feed() {
  return (
    <div className="h-full flex">
      <Sidebar />
      <Videos />
    </div>
  );
}

export default Feed;
