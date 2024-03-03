import { WatchListVO } from "@/utils/YouTubeTypes";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CreateSuccessProps {
  experimentId: string;
  watchList: WatchListVO | null;
}

function CreateSuccess({ experimentId, watchList }: CreateSuccessProps) {
  const router = useRouter();
  const redirectToWatchList = () => {
    router.push(`evideo/${experimentId}`);
  };

  if (!watchList) {
    return (
      <div className="w-full h-full bg-black flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-700 px-10 py-4 rounded-lg">
        <div className="text-2xl text-center mb-8">
          You are assigned the following watch list
        </div>
        <div className="bg-[#151515] mx-2 py-2 rounded-sm border-2 border-[#151515]">
          <div className="ml-4 flex items-center gap-2">
            <p className="text-xl">{watchList.title}</p>
            <p className="text-gray-400 text-sm">{watchList.length} videos</p>
          </div>
          <div className="flex px-4 gap-4 justify-between items-center">
            <div className="flex flex-1 overflow-scroll max-lg:max-w-[400px] max-w-[800px] gap-x-4">
              {watchList.videos.map((video, idx) => {
                return (
                  <div
                    className="group relative min-w-32 min-h-24 flex justify-center items-center"
                    key={idx}
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt="thumbnail"
                      width={120}
                      height={100}
                    />
                    <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded text-[8px] max-h-12 line-clamp-3">
                      {video.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-white px-2 py-1 text-gray-700 hover:bg-slate-200 text-2xl border-2 rounded-md border-gray-900"
            onClick={redirectToWatchList}
          >
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSuccess;
