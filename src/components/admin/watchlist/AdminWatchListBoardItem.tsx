import React, { useState } from "react";
import { WatchListVO } from "@/utils/YouTubeTypes";
import Image from "next/image";
import { Duration } from "luxon";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminWatchListBoardItemProps {
  watchList: WatchListVO;
  fetchWatchLists: () => void;
}

function AdminWatchListBoardItem({
  watchList,
  fetchWatchLists,
}: AdminWatchListBoardItemProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteWatchList = async (watchListId: number, withVideos: boolean) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/watchlist?id=${watchListId}&withVideos=${withVideos}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchWatchLists();
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
                onClick={() => setShowConfirm(false)}
                className="absolute top-2 right-2 w-8 h-8 cursor-pointer hover:text-[#d5cfcf]"
              >
                X
              </button>
            </p>
            <div className="flex justify-center gap-8 px-4">
              <button
                className="text-lg bg-white w-36 text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={() => deleteWatchList(watchList.id, false)}
              >
                Delete
              </button>
              <button
                className="text-lg w-36 bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={() => deleteWatchList(watchList.id, true)}
              >
                Delete with Unused Videos
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#151515] mx-2 py-2 rounded-sm">
        <div className="ml-4 flex items-center gap-2">
          <p className="text-xl">{watchList.title}</p>
          <p className="text-gray-400 text-sm">{watchList.length} videos</p>
        </div>
        <div className="flex px-4 gap-4 justify-between">
          <div className="flex flex-1 overflow-scroll max-lg:max-w-[400px] max-w-[800px] gap-x-4">
            {watchList.videos.map((video, idx) => {
              return (
                <Link
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  className="group relative min-w-32 min-h-24 flex justify-center items-center"
                  key={idx}
                >
                  <Image
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
          <div className="w-72 flex justify-center items-center gap-4">
            <Link
              href={`https://www.youtube.com/watch?v=${watchList.commercial.youtubeId}`}
              target="_blank"
              className="group relative min-w-32 min-h-24 flex justify-center items-center"
            >
              <Image
                src={watchList.commercial.thumbnailUrl}
                alt="thumbnail"
                width={120}
                height={100}
                className="border-red-600 border-4"
              />
              <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded text-[8px] max-h-12 line-clamp-3 cursor-pointer">
                SELECTED COMMERCIAL - {watchList.commercial.title}
              </div>
            </Link>
            <button
              className="hover:underline"
              onClick={() =>
                router.push(`/admin/watchlists/manage/${watchList.id}`)
              }
            >
              Manage
            </button>
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
