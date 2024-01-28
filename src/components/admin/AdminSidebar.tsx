import Link from "next/link";
import React from "react";

function AdminSidebar() {
  return (
    <div className="bg-green-500 w-64 flex flex-col items-left pl-4 pt-8 gap-y-6 font-bold text-lg">
      <Link href="/admin" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/admin/videos" className="hover:underline">
        Manage Videos
      </Link>
      <Link href="/admin" className="hover:underline">
        Manage Commercials
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
