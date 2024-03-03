"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Video, WatchListDTO, WatchListVO } from "@/utils/YouTubeTypes";
import AdminWatchListShoppingBasket from "./AdminWatchListShoppingBasket";
import AdminWatchListSearchBasket from "./AdminWatchListSearchBasket";
import { useAppSelector } from "@/lib/store";
import { WatchListReducerState } from "@/lib/features/watchListSlice";
import { useRouter } from "next/navigation";

enum DropdownValues {
  YouTube,
  Database,
}

interface AdminWatchListUpdatePageProps {
  watchListId: number;
}

function AdminWatchListUpdatePage({
  watchListId,
}: AdminWatchListUpdatePageProps) {
  // initial states
  const watchListState: WatchListReducerState = useAppSelector(
    (state) => state.watchListSliceReducer
  );
  let initialBasketVideos: Video[] = [];
  let initialBasketCommercial = null;
  let initialWatchListTitle = "";
  if (watchListId !== -1) {
    const watchListIdx = watchListState.watchLists.findIndex(
      (watchList) => watchList.id === watchListId
    );
    const watchList = watchListState.watchLists[watchListIdx];
    initialBasketVideos = watchList.videos;
    initialBasketCommercial = watchList.commercial;
    initialWatchListTitle = watchList.title;
  }

  // define variables
  const [keyword, setKeyword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchedVideos, setSearchedVideos] = useState<Video[]>([]);
  const [basketVideos, setBasketVideos] =
    useState<Video[]>(initialBasketVideos);
  const [basketCommercial, setBasketCommercial] = useState<Video | null>(
    initialBasketCommercial
  );
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(DropdownValues.YouTube);
  const [showAfterVideo, setShowAfterVideo] = useState(1);
  const [watchListTitle, setWatchListTitle] = useState(initialWatchListTitle);
  const router = useRouter();

  // helper functions
  const searchVideos = async function () {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin${
      dropdownValue === DropdownValues.YouTube
        ? "/video/search"
        : "/video/searchDatabase"
    }?keyword=${keyword}`;

    const response = await fetch(url);
    if (!response.ok) {
      setNextPageToken("");
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

  const updateWatchList = async () => {
    if (!basketCommercial) {
      return;
    }

    const watchList: WatchListVO = {
      id: watchListId,
      title: watchListTitle,
      length: basketVideos.length,
      commercial: basketCommercial,
      showAfterVideoIdx: showAfterVideo - 1,
      videos: basketVideos,
    };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/watchlist`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchList),
    });

    if (response.ok) {
      router.push("/nimda/watchlists");
    }
  };

  const selectCommercial = (video: Video) => {
    setBasketCommercial(video);
  };

  const unselectCommercial = () => {
    setBasketCommercial(null);
  };

  // use effect
  useEffect(() => {
    setNextPageToken("");
    setSearchedVideos([]);
  }, [dropdownValue]);

  return (
    <div className="bg-[#303030]  w-full h-full flex flex-col p-10">
      {showConfirm && (
        <div className="z-10">
          <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
          <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 w-80 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
            <div className="text-center text-xl font-bold mt-12 mb-2">
              <p>Rename and Confirm</p>
              <input
                type="text"
                className="w-40 h-10 mt-2 p-2 rounded-md text-[#323264]"
                value={watchListTitle}
                onChange={(e) => setWatchListTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-8">
              <button
                className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={updateWatchList}
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
      <p className="text-3xl font-bold mb-5">Update Watch List</p>
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
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="bg-black  flex justify-center items-center gap-2 h-8 px-2 rounded-xl hover:bg-[#202020]"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {dropdownValue === DropdownValues.YouTube
                ? "YouTube"
                : "Database"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={15}
                height={15}
                fill="white"
              >
                <path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-black text-white ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    className="block px-4 py-2 w-full text-sm hover:bg-[#202020]"
                    onClick={() => {
                      setDropdownValue(DropdownValues.YouTube);
                      setDropdownOpen(false);
                    }}
                  >
                    Youtube
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-sm hover:bg-[#202020]"
                    onClick={() => {
                      setDropdownValue(DropdownValues.Database);
                      setDropdownOpen(false);
                    }}
                  >
                    Database
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={() => {
              setShowConfirm(true);
            }}
            disabled={
              basketVideos.length === 0 ||
              !selectCommercial ||
              showAfterVideo === -1
            }
          >
            Update
          </button>
          <Link href="/nimda/watchlists">
            <button className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full gap-16 justify-between mt-5 overflow-auto">
        <AdminWatchListSearchBasket
          videos={searchedVideos}
          addToBasket={addToBasket}
          loadMore={loadMore}
          showLoadMore={dropdownValue === DropdownValues.YouTube}
          selectCommercial={selectCommercial}
        />

        <AdminWatchListShoppingBasket
          setBasketVideos={setBasketVideos}
          videos={basketVideos}
          commercial={basketCommercial}
          removeFromBasket={removeFromBasket}
          unselectCommercial={unselectCommercial}
          showAfterVideo={showAfterVideo}
          setShowAfterVideo={setShowAfterVideo}
        />
      </div>
    </div>
  );
}

export default AdminWatchListUpdatePage;
