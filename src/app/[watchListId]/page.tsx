import Image from "next/image";
import Navbar from "../../components/homepage/Navbar";
import Feed from "../../components/homepage/Feed";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function WatchListPage({
  params,
}: {
  params: { watchListId: string };
}) {
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 w-full h-[90vh] flex flex-col">
        <Feed watchListId={parseInt(params.watchListId)} />
      </div>
    </>
  );
}
