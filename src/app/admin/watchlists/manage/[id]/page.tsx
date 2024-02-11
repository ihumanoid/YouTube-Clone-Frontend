import React from "react";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";
import { WatchListVO } from "@/utils/YouTubeTypes";
import AdminWatchListUpdatePage from "@/components/admin/AdminWatchListUpdatePage";

function page({ params }: { params: { id: string } }) {
  return <AdminWatchListUpdatePage watchListId={parseInt(params.id)} />;
}

export default page;
