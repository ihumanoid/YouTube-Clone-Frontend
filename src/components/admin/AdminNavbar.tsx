"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AdminNavbar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [login, setLogin] = useState(true);

  return (
    <div className="bg-black h-[10vh] flex justify-between">
      <Link href="/" className="hover:font-bold w-44 flex items-center ml-5">
        YouTube
      </Link>
      {login ? (
        <div className="flex items-center justify-end w-44 mr-8">
          <button
            type="button"
            className="hover:font-bold"
            onClick={() => {
              setLogin(false);
              router.push("/");
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end w-44 mr-8">
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

export default AdminNavbar;
