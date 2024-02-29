import React, { useState } from "react";
import AdminVideoBox from "./AdminVideoBox";
import Link from "next/link";
import { Video } from "@/utils/YouTubeTypes";
import AdminVideoSearchBasket from "./AdminVideoSearchBasket";
import AdminVideoShoppingBasket from "./AdminVideoShoppingBasket";

function AdminVideoAddPage() {
  const [keyword, setKeyword] = useState("");
  const [searchedVideos, setSearchedVideos] = useState<Video[]>([]);
  const [basketVideos, setBasketVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [showConfirm, setShowConfirm] = useState(false);

  const searchVideos = async function () {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/search?keyword=${keyword}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()).data;
    setSearchedVideos(data.videos);
    setNextPageToken(data.nextPageToken);
  };

  const loadMore = async function () {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/search?keyword=${keyword}&pageToken=${nextPageToken}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()).data;

    setNextPageToken(data.nextPageToken);
    setSearchedVideos([...searchedVideos, ...data.videos]);
  };

  const addToBasket = (video: Video) => {
    const foundVideo = basketVideos.some(
      (basketVideo) => video.youtubeId === basketVideo.youtubeId
    );
    if (!foundVideo) {
      setBasketVideos((prev) => [...prev, video]);
    }
  };

  const removeFromBasket = (video: Video) => {
    const newBasketVideos = basketVideos.filter(
      (basketVideo) => video.youtubeId !== basketVideo.youtubeId
    );
    setBasketVideos(newBasketVideos);
  };

  const addVideos = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/videos`;
    const body = {
      videos: basketVideos,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setBasketVideos([]);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-[#303030] w-full h-full flex flex-col p-10">
      {showConfirm && (
        <div className="z-10">
          <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
          <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 w-80 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
            <p className="text-center text-xl font-bold mt-12 mb-2">
              Confirm Add
            </p>
            <div className="flex justify-center gap-8">
              <button
                className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={addVideos}
              >
                Confirm
              </button>
              <button
                className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="text-3xl font-bold mb-5">Add Videos</p>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            className="w-72 h-12 text-black px-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search videos"
          ></input>
          <button
            onClick={searchVideos}
            className="bg-black px-4 h-12 rounded-xl font-bold hover:bg-[#202020]"
          >
            Search
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={() => {
              setShowConfirm(true);
            }}
            disabled={basketVideos.length === 0}
          >
            Add
          </button>
          <Link href="/admin/videos">
            <button className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full gap-16 justify-between mt-5 overflow-auto">
        <AdminVideoSearchBasket
          addToBasket={addToBasket}
          loadMore={loadMore}
          videos={searchedVideos}
        />

        <AdminVideoShoppingBasket
          removeFromBasket={removeFromBasket}
          videos={basketVideos}
        />
      </div>
    </div>
  );
}

export default AdminVideoAddPage;
