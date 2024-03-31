import React, { useState } from "react";
import AdminCommercialBox from "./AdminCommercialBox";
import Link from "next/link";
import { Commercial } from "@/utils/YouTubeTypes";
import AdminCommercialSearchBasket from "./AdminCommercialSearchBasket";
import AdminCommercialShoppingBasket from "./AdminCommercialShoppingBasket";

function AdminCommercialAddPage() {
  const [keyword, setKeyword] = useState("");
  const [searchedCommercials, setSearchedCommercials] = useState<Commercial[]>(
    []
  );
  const [basketCommercials, setBasketCommercials] = useState<Commercial[]>([]);
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
    setSearchedCommercials(data.videos);
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
    setSearchedCommercials([...searchedCommercials, ...data.videos]);
  };

  const addToBasket = (commercial: Commercial) => {
    const foundCommercials = basketCommercials.some(
      (basketCommercial) => commercial.youtubeId === basketCommercial.youtubeId
    );
    if (!foundCommercials) {
      setBasketCommercials((prev) => [...prev, commercial]);
    }
  };

  const removeFromBasket = (commercial: Commercial) => {
    const newBasketCommercials = basketCommercials.filter(
      (basketCommercial) => commercial.youtubeId !== basketCommercial.youtubeId
    );
    setBasketCommercials(newBasketCommercials);
  };

  const addCommercials = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/commercial/commercials`;
    const body = {
      commercials: basketCommercials,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setBasketCommercials([]);
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
                onClick={addCommercials}
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
      <p className="text-3xl font-bold mb-5">Add Commercials</p>
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
            disabled={basketCommercials.length === 0}
          >
            Add
          </button>
          <Link href="/nimda/commercials">
            <button className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full gap-16 justify-between mt-5 overflow-auto">
        <AdminCommercialSearchBasket
          addToBasket={addToBasket}
          loadMore={loadMore}
          commercials={searchedCommercials}
        />

        <AdminCommercialShoppingBasket
          removeFromBasket={removeFromBasket}
          commercials={basketCommercials}
        />
      </div>
    </div>
  );
}

export default AdminCommercialAddPage;
