import React, { useState } from "react";
import { WatchListVideosVO } from "@/utils/YouTubeTypes";
import Image from "next/image";
import { Duration } from "luxon";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminWatchListBoardItemProps {
  watchList: WatchListVideosVO;
  fetchWatchLists: () => void;
}

function AdminWatchListBoardItem({
  watchList,
  fetchWatchLists,
}: AdminWatchListBoardItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  const deleteWatchList = async (watchListId: number, withVideos: boolean) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/watchlist?id=${watchListId}&withVideos=${withVideos}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.code === 409) {
      setShowError(true);
      return;
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchWatchLists();
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && (
        <div className="z-10">
          <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
          <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 w-100 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
            <p className="text-center text-xl font-bold mt-12 mb-2 z-10">
              Confirm Delete
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowError(false);
                }}
                className="absolute top-2 right-2 w-8 h-8 cursor-pointer hover:text-[#d5cfcf]"
              >
                X
              </button>
            </p>
            <div className="flex justify-center gap-8 px-4">
              <button
                className="text-md bg-white w-36 text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={() => deleteWatchList(watchList.id, false)}
              >
                Delete
              </button>
              <button
                className="text-md w-36 bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={() => deleteWatchList(watchList.id, true)}
              >
                Delete with Unused Videos
              </button>
            </div>
            {showError && (
              <div className="flex justify-center px-4 py-2">
                <div className="text-red-600 text-center">
                  Delete Failed: Some experiment entries use this watch list
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-[#151515] mx-2 py-2 rounded-sm">
        <div className="ml-4 flex items-center gap-2">
          <p className="text-xl">{watchList.title}</p>
          <p className="text-gray-400 text-sm">{watchList.length} videos</p>
        </div>
        <div className="flex px-4 gap-4 justify-between">
          <div className="flex flex-1 overflow-scroll max-lg:max-w-[500px] max-w-[900px] gap-x-4">
            {watchList.videos.map((video, idx) => {
              return (
                <Link
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  className="group relative min-w-32 min-h-24 flex justify-center items-center"
                  key={idx}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt="thumbnail"
                    width={120}
                    height={100}
                  />
                  <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded text-[8px] max-h-12 line-clamp-3 cursor-pointer">
                    {video.title}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="w-40 flex justify-center items-center gap-4">
            <Link
              className="hover:underline"
              href={`/nimda/watchlists/update?watchList=${encodeURIComponent(
                JSON.stringify(watchList)
              )}`}
            >
              Manage
            </Link>
            <button
              className="hover:underline"
              onClick={() => setShowConfirm(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminWatchListBoardItem;
