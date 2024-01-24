import React, { useState } from "react";
import AdminVideoBox from "./AdminVideoBox";
import Link from "next/link";

function AdminVideoBoard() {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="bg-blue-500 w-full h-full flex flex-col p-10">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <input
            className="w-96 h-12 text-black px-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search videos"
          ></input>
          <button className="bg-yellow-600 px-4 h-12 rounded-xl font-bold">
            Some Filters
          </button>
        </div>

        <div className="flex gap-4">
          <Link href="/admin/videos/add">
            <button className="bg-yellow-600 px-4 w-20 h-12 rounded-xl font-bold">
              Add
            </button>
          </Link>
          <button className="bg-yellow-600 px-4 w-20 h-12 rounded-xl font-bold">
            Delete
          </button>
        </div>
      </div>
      <ul className="overflow-auto mt-4">
        {Array(20).fill(
          <li>
            <AdminVideoBox />
          </li>
        )}
      </ul>
    </div>
  );
}

export default AdminVideoBoard;
