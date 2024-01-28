import React, { useState } from "react";
import AdminVideoBox from "./AdminVideoBox";
import Link from "next/link";
import { SearchResultItem, SearchResultVideo } from "@/utils/YouTubeTypes";
import AdminVideoSearchBasket from "./AdminVideoSearchBasket";

function AdminVideoAddPage() {
  const [keyword, setKeyword] = useState("");
  const [searchResultVideos, setSearchResultVideos] =
    useState<SearchResultVideo[]>();

  const fetchVideos = async function () {
    const response = await fetch(
      `http://localhost:8080/admin/youtube/search?keyword=${keyword}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const items = (await response.json()).data.items;
    const newSearchResultVideos: SearchResultVideo[] = [];
    items.forEach((item: SearchResultItem) => {
      newSearchResultVideos.push({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high,
      });
    });
    setSearchResultVideos(newSearchResultVideos);
  };

  return (
    <div className="bg-blue-500 w-full h-full flex flex-col p-10">
      <p className="text-3xl font-bold mb-5">Add Videos</p>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <input
            className="w-96 h-12 text-black px-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search videos"
          ></input>
          <button
            onClick={fetchVideos}
            className="bg-yellow-600 px-4 h-12 rounded-xl font-bold"
          >
            Search
          </button>
        </div>

        <div className="flex gap-4">
          <button className="bg-yellow-600 px-4 w-20 h-12 rounded-xl font-bold">
            Add
          </button>
          <Link href="/admin/videos">
            <button className="bg-yellow-600 px-4 w-20 h-12 rounded-xl font-bold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full gap-16 justify-between mt-5 overflow-auto">
        {searchResultVideos ? (
          <AdminVideoSearchBasket videos={searchResultVideos} />
        ) : (
          <div className="bg-yellow-600 h-full w-full flex justify-center items-center font-bold text-2xl">
            Search Result
          </div>
        )}
        <div className="bg-yellow-600 h-full w-full flex justify-center items-center font-bold text-2xl">
          Selected Videos
        </div>
      </div>
    </div>
  );
}

export default AdminVideoAddPage;
