"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [login, setLogin] = useState(false);

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
        <div className="flex items-center justify-between w-56 mr-8">
          <Link href="/admin" className="hover:font-bold text-xl">
            Admin Panel
          </Link>
          <button
            type="button"
            className="hover:font-bold text-xl"
            onClick={() => setLogin(false)}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end w-56  mr-8">
          <button
            type="button"
            className="hover:font-bold text-xl"
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
