import {
  Commercial,
  Video,
  VideoTopic,
  WatchListCommercialsVODep,
} from "@/utils/YouTubeTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VideoTopics } from "@/utils/RealData";
import Link from "next/link";
import AdminCommercialSearchBasket from "./AdminCommercialSearchBasket";
import AdminCommercialShoppingBasket from "./AdminCommercialShoppingBasket";
import { useRouter } from "next/navigation";

enum SourceValues {
  YouTube = "YouTube",
  Database = "Database",
}

function AdminCommercialUpdatePage() {
  // read query param
  const searchParams = useSearchParams();
  const watchListString = searchParams.get("watchList");
  if (!watchListString) {
    throw new Error("Url is missing the parameter 'watchList'");
  }
  const watchList: WatchListCommercialsVODep = JSON.parse(watchListString);

  // search parameter states
  const [keyword, setKeyword] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState<VideoTopic[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>(
    SourceValues.YouTube
  );

  // other varaibles
  const [selectedLowCommercial, setSelectedLowCommercial] = useState<
    Commercial | undefined
  >(watchList.lowCommercial);
  const [selectedMediumCommercial, setSelectedMediumCommercial] = useState<
    Commercial | undefined
  >(watchList.mediumCommercial);
  const [selectedHighCommercial, setSelectedHighCommercial] = useState<
    Commercial | undefined
  >(watchList.highCommercial);
  const [searchedVideos, setSearchedVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const router = useRouter();

  const searchVideos = async function () {
    const videoTopic = VideoTopics.filter(
      (videoTopic) => videoTopic.topic === topicFilter
    );
    const topicId = videoTopic.length > 0 && videoTopic[0].id;
    let url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`;
    if (selectedSource === SourceValues.YouTube) {
      url += `/admin/video/search?keyword=${keyword}&topicId=${topicId}`;
    } else {
      url += `/admin/commercial/searchDatabase?keyword=${keyword}`;
    }

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

  const handleSelectTopicSuggestion = (topic: string) => {
    setTopicFilter(topic);
  };

  const handleSubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/commercial`;
    const updatedWatchList: WatchListCommercialsVODep = {
      ...watchList,
      lowCommercial: selectedLowCommercial,
      mediumCommercial: selectedMediumCommercial,
      highCommercial: selectedHighCommercial,
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWatchList),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status code ${response.status}`);
    }

    router.push("/nimda/commercials");
  };

  return (
    <div className="bg-[#303030]  w-full h-full flex flex-col p-10">
      <p className="text-3xl font-bold mb-5">Update Commercials</p>
      <div className="flex justify-between gap-4 z-10">
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
            <option value={SourceValues.YouTube}>YouTube</option>
            <option value={SourceValues.Database}>Database</option>
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
            onClick={handleSubmit}
          >
            Update
          </button>
          <Link href="/nimda/commercials">
            <button className="bg-black px-4 w-22 h-12 rounded-xl font-bold hover:bg-[#202020]">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full gap-16 justify-between mt-5 overflow-auto">
        <AdminCommercialSearchBasket
          videos={searchedVideos}
          setSelectedLowCommercial={setSelectedLowCommercial}
          setSelectedMediumCommercial={setSelectedMediumCommercial}
          setSelectedHighCommercial={setSelectedHighCommercial}
          loadMore={loadMore}
          showLoadMore={selectedSource === SourceValues.YouTube}
        />
        <AdminCommercialShoppingBasket
          selectedLowCommercial={selectedLowCommercial}
          selectedMediumCommercial={selectedMediumCommercial}
          selectedHighCommercial={selectedHighCommercial}
          setSelectedLowCommercial={setSelectedLowCommercial}
          setSelectedMediumCommercial={setSelectedMediumCommercial}
          setSelectedHighCommercial={setSelectedHighCommercial}
        />
      </div>
    </div>
  );
}

export default AdminCommercialUpdatePage;
