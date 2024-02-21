import React from "react";
import Sidebar from "./Sidebar";
import AllWatchLists from "./AllWatchLists";

function AllFeed() {
  return (
    <div className="h-full flex">
      <Sidebar />
      <AllWatchLists />
    </div>
  );
}

export default AllFeed;
