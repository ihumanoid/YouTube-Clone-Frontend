"use client";
import Welcome from "@/components/eregister/Welcome";
import SelectWatchList from "@/components/eregister/SelectWatchList";
import Instructions from "@/components/eregister/Instructions";
import React, { useState } from "react";
import { WatchListCommercialVO } from "@/utils/YouTubeTypes";
import CreateSuccess from "@/components/eregister/CreateSuccess";

function Page() {
  const [pageNum, setPageNum] = useState(0);
  const [email, setEmail] = useState("");
  const [experimentId, setExperimentId] = useState("");
  const [assignedWatchList, setAssignedWatchList] =
    useState<WatchListCommercialVO | null>(null);
  const incrementPageNum = () => {
    setPageNum((prev) => prev + 1);
  };

  switch (pageNum) {
    case 1:
      return <Instructions incrementPageNum={incrementPageNum} />;
    case 2:
      return (
        <SelectWatchList
          email={email}
          setAssignedWatchList={setAssignedWatchList}
          setExperimentId={setExperimentId}
          incrementPageNum={incrementPageNum}
        />
      );
    case 3:
      return (
        <CreateSuccess
          experimentId={experimentId}
          watchList={assignedWatchList}
        />
      );
    default:
      return (
        <Welcome
          setPageNum={setPageNum}
          setExperimentId={setExperimentId}
          setAssignedWatchList={setAssignedWatchList}
          email={email}
          setEmail={setEmail}
        />
      );
  }
}

export default Page;
