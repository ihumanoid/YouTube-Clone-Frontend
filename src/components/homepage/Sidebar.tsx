import React from "react";
import WatchListTitle from "./WatchListTitle";

function Sidebar() {
  return (
    <div className="bg-black w-44">
      <p className="w-full text-center mb-4 text-xl">Watch Lists</p>
      <div className="flex flex-col gap-5 items-center">
        <WatchListTitle watchListTitle="AI" watchListId="ai" />
        <WatchListTitle watchListTitle="Sports" watchListId="sports" />
        <WatchListTitle watchListTitle="Fashion" watchListId="fashion" />
        <WatchListTitle watchListTitle="Gaming" watchListId="gaming" />
        <WatchListTitle watchListTitle="Food" watchListId="food" />
      </div>
    </div>
  );
}

export default Sidebar;
