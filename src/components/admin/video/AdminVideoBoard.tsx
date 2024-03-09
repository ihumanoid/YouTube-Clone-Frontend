import React, { useEffect, useState } from "react";
import AdminVideoBox from "./AdminVideoBox";
import Link from "next/link";
import { Video } from "@/utils/YouTubeTypes";

function AdminVideoBoard() {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  const getVideos = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/videos`
    );
    const data = (await response.json()).data;
    setVideos(data);
    setFilteredVideos(data);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const deleteVideos = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/videos`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: deleteIds.join(","),
    });
    if (response.ok) {
      setShowConfirm(false);
      getVideos();
    }
  };

  const toggleDeleteId = (deleteId: number) => {
    let newDeleteIds = [...deleteIds];
    if (deleteIds.includes(deleteId)) {
      newDeleteIds = newDeleteIds.filter((id) => id != deleteId);
    } else {
      newDeleteIds.push(deleteId);
    }
    setDeleteIds(newDeleteIds);
  };

  const filterVideos = () => {
    const newFilteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredVideos(newFilteredVideos);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    if (!newKeyword) {
      setFilteredVideos(videos);
    }
    setKeyword(newKeyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      filterVideos();
    }
  };

  return (
    <div className="bg-[#303030]  h-full flex flex-col p-10 flex-1">
      {showConfirm && (
        <div className="z-10">
          <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
          <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 w-80 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
            <p className="text-center text-xl font-bold mt-12 mb-2">
              Confirm Delete
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-2 right-2 w-8 h-8 cursor-pointer hover:text-[#d5cfcf]"
              >
                X
              </button>
            </p>

            <div className="flex justify-center gap-8">
              <button
                className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={deleteVideos}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            className="w-72 h-12 text-black px-2"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
            placeholder="Search videos"
          ></input>
          <button
            className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={filterVideos}
          >
            Search
          </button>
        </div>

        <div className="flex gap-4">
          <Link href="/nimda/videos/add">
            <button className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]">
              Add
            </button>
          </Link>
          <button
            className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={() => {
              if (deleteIds.length > 0) {
                setShowConfirm(true);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="bg-black w-full h-full mt-10 overflow-auto">
        {videos.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-xl">
            No Items in Here
          </div>
        ) : (
          <ul className="overflow-auto">
            {filteredVideos.map((video: Video, idx) => {
              return (
                <AdminVideoBox
                  toggleDeleteId={toggleDeleteId}
                  video={video}
                  key={idx}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminVideoBoard;
