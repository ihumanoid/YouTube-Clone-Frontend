"use client";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <div className="bg-black h-[10vh] flex">
      <Link href="/" className="hover:font-bold w-44 flex items-center ml-5">
        YouTube
      </Link>
      <div className="flex justify-center items-center flex-1">
        <input
          type="text"
          className="h-10 w-96 rounded-3xl bg-[#121212] 0 pl-4 "
          value={keyword}
          placeholder="Search Bar"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
      </div>
      {login ? (
        <div className="flex items-center justify-between w-44 mr-8">
          <Link href="/admin" className="hover:font-bold">
            Admin Panel
          </Link>
          <button
            type="button"
            className="hover:font-bold"
            onClick={() => setLogin(false)}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end w-44  mr-8">
          <button
            type="button"
            className="hover:font-bold"
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
