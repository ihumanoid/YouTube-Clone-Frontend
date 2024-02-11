"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

function AdminNavbar() {
  const router = useRouter();

  return (
    <div className="bg-black h-[10vh] flex justify-between">
      <Link href="/" className="hover:font-bold  flex items-center ml-5">
        <Image alt="website logo" src="/favicon.ico" width={40} height={40} />
        <p className="ml-2 font-bold text-[20px]">YouTube Mockup</p>
      </Link>

      <div className="flex items-center justify-end w-48  mr-8">
        <button
          type="button"
          className="hover:font-bold text-lg"
          onClick={() => router.push("/")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
