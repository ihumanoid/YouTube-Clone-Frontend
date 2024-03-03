"use client";
import React, { useState, useEffect } from "react";
import AdminVideoBox from "../video/AdminVideoBox";
import Link from "next/link";
import { Video, WatchListDTO } from "@/utils/YouTubeTypes";
import AdminWatchListShoppingBasket from "./AdminWatchListShoppingBasket";
import AdminWatchListSearchBasket from "./AdminWatchListSearchBasket";
import { useRouter } from "next/navigation";
import { VideoTopics } from "@/utils/RealData";
import { VideoTopic } from "@/utils/YouTubeTypes";

enum SourceValues {
  YouTube = "YouTube",
  Database = "DataBase",
}

function AdminWatchListAddPage() {
  const [keyword, setKeyword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchedVideos, setSearchedVideos] = useState<Video[]>([]);
  const [basketVideos, setBasketVideos] = useState<Video[]>([]);
  const [basketCommercial, setBasketCommercial] = useState<Video | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const [showAfterVideo, setShowAfterVideo] = useState(1);
  const [watchListTitle, setWatchListTitle] = useState("");
  const router = useRouter();

  // search params
  const [selectedSource, setSelectedSource] = useState("YouTube");
  const [topicFilter, setTopicFilter] = useState<string>();
  const [topicSuggestions, setTopicSuggestions] = useState<VideoTopic[]>([]);

  const handleSelectSource = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(e.target.value);
  };

  const handleTopicFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTopic = e.target.value;
    setTopicFilter(newTopic);
    if (newTopic) {
      const newTopicSuggestions = VideoTopics.filter((videoTopic) =>
        videoTopic.topic.toLowerCase().includes(newTopic.toLowerCase())
      );
      setTopicSuggestions(newTopicSuggestions);
    } else {
      setTopicSuggestions([]);
    }
  };

  const handleSelectTopicSuggestion = (newTopicFilter: string) => {
    setTopicFilter(newTopicFilter);
    setTopicSuggestions([]);
  };

  const searchVideos = async function () {
    const videoTopic = VideoTopics.filter(
      (videoTopic) => videoTopic.topic === topicFilter
    );
    const topicId = videoTopic.length > 0 && videoTopic[0].id;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin${
      selectedSource === SourceValues.YouTube
        ? "/video/search"
        : "/video/searchDatabase"
    }?keyword=${keyword}&topicId=${topicId}`;

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
    const videoTopic = VideoTopics.filter(
      (videoTopic) => videoTopic.topic === topicFilter
    );
    const topicId = videoTopic.length > 0 && videoTopic[0].id;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/video/search?keyword=${keyword}&pageToken=${nextPageToken}&topicId=${topicId}`
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

  const addWatchList = async () => {
    if (!basketCommercial) {
      return;
    }

    const watchList: WatchListDTO = {
      title: watchListTitle,
      length: basketVideos.length,
      commercial: basketCommercial,
      showAfterVideoIdx: showAfterVideo - 1,
      videos: basketVideos,
    };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/watchlist`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchList),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! error code: ${response.status}`);
    }
    setBasketVideos([]);
    setBasketCommercial(null);
    setShowConfirm(false);
    router.push("/nimda/watchlists");
  };

  useEffect(() => {
    setNextPageToken("");
    setSearchedVideos([]);
  }, [selectedSource]);

  const selectCommercial = (video: Video) => {
    setBasketCommercial(video);
  };

  const unselectCommercial = () => {
    setBasketCommercial(null);
  };

  return (
    <div className="bg-[#303030]  w-full h-full flex flex-col p-10">
      {showConfirm && (
        <div className="z-10">
          <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
          <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 w-80 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
            <div className="text-center text-xl font-bold mt-12 mb-2">
              <p>Name the Watch List</p>
              <input
                type="text"
                className="w-40 h-10 mt-2 p-2 rounded-md text-[#323264]"
                onChange={(e) => setWatchListTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-8">
              <button
                className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
                onClick={addWatchList}
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
      <p className="text-3xl font-bold mb-5">Create Watch List</p>
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
          <select
            value={selectedSource}
            onChange={handleSelectSource}
            className="bg-black px-2 text-sm w-22 h-12 rounded-xl font-bold cursor-pointer"
          >
            <option value="YouTube">YouTube</option>
            <option value="Database">Database</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by topic"
              className="bg-black px-2 text-sm h-12"
              value={topicFilter}
              onChange={handleTopicFilter}
            />
            {topicSuggestions.length > 0 && (
              <ul className="absolute h-32 w-full flex flex-col overflow-auto bg-[#101010]">
                {topicSuggestions.map((suggestion, idx) => {
                  return (
                    <li key={idx}>
                      <button
                        className="font-bold text-lg text-start p-2 w-full h-full hover:bg-[#202020] cursor-pointer"
                        onClick={() =>
                          handleSelectTopicSuggestion(suggestion.topic)
                        }
                      >
                        {suggestion.topic}
                      </button>
                    </li>
                  );
                })}
              </ul>
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
              !basketCommercial ||
              showAfterVideo === -1
            }
          >
            Create
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
          showLoadMore={selectedSource === SourceValues.YouTube}
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

export default AdminWatchListAddPage;
