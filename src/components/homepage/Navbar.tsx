"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store";
import { changeAllWatchLists } from "@/lib/features/watchListSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [login, setLogin] = useState(false);
  const watchListState = useAppSelector((state) => state.watchListSliceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchLists = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/watchlist/watchlists`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const watchLists = (await response.json()).data;
      // console.log("fetch via navbar" + watchLists);
      dispatch(changeAllWatchLists(watchLists));
    };
    if (watchListState.watchLists.length === 0) {
      fetchWatchLists();
    } else {
      // console.log(watchListState.watchLists);
    }
  }, []);

  return (
    <div className="bg-black h-[10vh] flex">
      <Link href="/" className="hover:font-bold  flex items-center ml-5">
        <Image alt="website logo" src="/favicon.ico" width={40} height={40} />
        <p className="ml-2 font-bold text-[20px]">YouTube Mockup</p>
      </Link>
      <div className="flex justify-center items-center flex-1 ml-14">
        <input
          type="text"
          className="h-10 w-full rounded-3xl bg-[#121212] 0 pl-4 max-w-96"
          value={keyword}
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
      </div>
      {login ? (
        <div className="flex items-center justify-between w-48 mx-8">
          <Link href="/admin" className="hover:font-bold text-lg">
            Admin Panel
          </Link>
          <button
            type="button"
            className="hover:font-bold text-lg"
            onClick={() => setLogin(false)}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end w-48  mr-8">
          <button
            type="button"
            className="hover:font-bold text-lg"
            onClick={() => setLogin(true)}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
