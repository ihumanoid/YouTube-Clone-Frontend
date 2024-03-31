import Link from "next/link";
import React from "react";

function AdminSidebar() {
  return (
    <div className="bg-black w-48 min-w-48 flex flex-col items-left px-4 pt-8 gap-y-6 font-bold text-lg">
      <Link href="/nimda" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/nimda/videos" className="hover:underline">
        Videos
      </Link>
      <Link href="/nimda/commercials" className="hover:underline">
        Commercials
      </Link>
      <Link href="/nimda/watchlists" className="hover:underline">
        Watch Lists
      </Link>
      <Link href="/nimda/similarity" className="hover:underline">
        Similarity Scores
      </Link>
      <Link href="/nimda/experiments" className="hover:underline">
        Experiments
      </Link>
    </div>
  );
}

export default AdminSidebar;
