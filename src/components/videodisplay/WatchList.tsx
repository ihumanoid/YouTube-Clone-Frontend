import React from "react";
import WatchListItem from "./WatchListItem";

function WatchList() {
  return (
    <div className="w-96 bg-yellow-600 max-md:w-full h-full">
      <p className="h-[5%]">Watch List</p>
      <div className="flex flex-col w-full gap-y-3 overflow-scroll h-[95%]">
        {Array(10).fill(<WatchListItem />)}
      </div>
    </div>
  );
}

export default WatchList;
