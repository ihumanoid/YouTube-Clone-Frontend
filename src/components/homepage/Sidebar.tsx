import React from "react";
import VideoCategory from "./VideoCategory";

function Sidebar() {
  return (
    <div className="bg-green-500 w-28">
      Video Categories{" "}
      <div className="flex flex-col gap-3">
        {Array(9).fill(<VideoCategory />)}
      </div>
    </div>
  );
}

export default Sidebar;
