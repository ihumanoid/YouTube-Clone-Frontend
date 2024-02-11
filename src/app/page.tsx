import Image from "next/image";
import Navbar from "../components/homepage/Navbar";
import Feed from "../components/homepage/Feed";
import AllFeed from "@/components/homepage/AllFeed";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeAllWatchLists } from "@/lib/features/watchListSlice";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 w-full h-[90vh] flex flex-col">
        <AllFeed />
      </div>
    </>
  );
}
