import Link from "next/link";
import React from "react";

function AdminSidebar() {
  return (
    <div className="bg-green-500 w-48 flex flex-col items-left pl-4 pt-4 gap-y-6 font-bold">
      <Link href="/admin" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/admin" className="hover:underline">
        Manage Videos
      </Link>
      <Link href="/admin" className="hover:underline">
        Manage Ads
      </Link>
      <Link href="/admin" className="hover:underline">
        Manage Watch Lists
      </Link>
      <Link href="/admin" className="hover:underline">
        Manage Survey
      </Link>
    </div>
  );
}

export default AdminSidebar;
