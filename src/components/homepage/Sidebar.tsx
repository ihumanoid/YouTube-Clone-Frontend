import React from "react";
import WatchList from "./WatchListTitle";

function Sidebar() {
  return (
    <div className="bg-green-500 w-28">
      Watch Lists{" "}
      <div className="flex flex-col gap-3">{Array(9).fill(<WatchList />)}</div>
    </div>
  );
}

export default Sidebar;
