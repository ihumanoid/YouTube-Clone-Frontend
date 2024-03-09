"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store";
import {
  changeAllWatchLists,
  changeKeyword,
} from "@/lib/features/watchListSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [login, setLogin] = useState(false);
  const watchListState = useAppSelector((state) => state.watchListSliceReducer);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(changeKeyword(keyword));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("On key down");
    if (e.key === "Enter" && keyword.length > 0) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (keyword.length === 0) {
      handleSearch();
    }
  }, [keyword]);

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
          className="h-12 w-full rounded-l-3xl bg-[#202020] 0 pl-4 max-w-96"
          value={keyword}
          placeholder="Search watch list"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-current bg-[#181818] text-white h-12 p-2 hover:bg-[#252525] cursor-pointer rounded-r-3xl"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </div>
      {login ? (
        <div className="flex items-center justify-between w-48 mx-8">
          <Link href="/nimda" className="hover:font-bold text-lg">
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
