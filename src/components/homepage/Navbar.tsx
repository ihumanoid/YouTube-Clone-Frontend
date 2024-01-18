"use client";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="bg-blue-500 min-h-16 h-16 flex">
      <Link href="/" className="hover:font-bold w-16 flex items-center ml-5">
        YouTube
      </Link>
      <div className="flex justify-center items-center flex-1">
        <input
          type="text"
          className="h-10 rounded-3xl bg-[#121212] 0 pl-4 "
          value={keyword}
          placeholder="Search Bar"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default Navbar;
