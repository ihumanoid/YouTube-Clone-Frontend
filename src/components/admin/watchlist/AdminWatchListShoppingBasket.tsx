import { Video } from "@/utils/YouTubeTypes";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Duration } from "luxon";

interface AdminVideoShoppingBasketParams {
  videos: Video[];
  commercial: Video | null;
  removeFromBasket: (video: Video) => void;
  unselectCommercial: () => void;
  showAfterVideo: number;
  setShowAfterVideo: Dispatch<SetStateAction<number>>;
  setBasketVideos: Dispatch<SetStateAction<Video[]>>;
}

function AdminWatchListShoppingBasket({
  videos,
  commercial,
  removeFromBasket,
  unselectCommercial,
  showAfterVideo,
  setShowAfterVideo,
  setBasketVideos,
}: AdminVideoShoppingBasketParams) {
  const draggedVideoIdx = useRef(-1);
  const draggedOverVideoIdx = useRef(-1);
  const [draggedOverVideoIdxState, setDraggedOverVideoIdxState] = useState(-1);
  const [draggedToBottom, setDraggedToBottom] = useState(false);
  const basketRef = useRef<HTMLDivElement>(null);

  const dropSwitchVideos = () => {
    const videosClone = [...videos];
    const temp = videosClone[draggedVideoIdx.current];
    videosClone[draggedVideoIdx.current] =
      videosClone[draggedOverVideoIdx.current];
    videosClone[draggedOverVideoIdx.current] = temp;
    setBasketVideos(videosClone);
    setDraggedOverVideoIdxState(-1);
  };

  const scrollDown = () => {
    const scrollInterval = setInterval(() => {
      if (basketRef.current) {
        basketRef.current.scrollTop++;
      }
    }, 200);

    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 200);
  };

  const scrollUp = () => {
    const scrollInterval = setInterval(() => {
      if (basketRef.current) {
        basketRef.current.scrollTop--;
      }
    }, 200);

    setTimeout(() => {
      clearInterval(scrollInterval);
    }, 200);
  };

  const getVideoElement = () => {
    if (videos.length === 0) {
      return (
        <div className="bg-black h-full w-full flex justify-center items-center font-bold text-2xl">
          Selected Videos
        </div>
      );
    }
    return (
      <div className="relative h-full overflow-scroll bg-black" ref={basketRef}>
        <div
          className="fixed h-12 w-full -translate-y-4"
          onDragOver={scrollUp}
        ></div>
        {videos.map((video, idx) => {
          const minutes = Duration.fromISO(video.duration).minutes;
          const seconds = Duration.fromISO(video.duration).seconds;

          return (
            <div
              draggable
              onDragStart={() => (draggedVideoIdx.current = idx)}
              onDragOver={() => {
                setDraggedOverVideoIdxState(idx);
                draggedOverVideoIdx.current = idx;
              }}
              onDragEnd={() => dropSwitchVideos()}
              key={idx}
              className={`w-full h-24 flex border-b-white border-b-solid border-b-2 py-4 items-center ${
                draggedOverVideoIdxState === idx &&
                "border-dashed border-2 border-blue-500"
              }`}
            >
              <div className="relative flex w-30 justify-center">
                <Image
                  src={video.thumbnailUrl}
                  alt="Video Thumbnail"
                  width={90}
                  height={20}
                />
                <div className="absolute bottom-1 right-1 bg-black text-white p-1 rounded">
                  {`${minutes}:${seconds}`}
                </div>
              </div>

              <div className="flex flex-1 h-full flex-col items-start justify-between ml-2">
                <p className="text-sm h-18 line-clamp-2">{video.title}</p>
                <button
                  onClick={() => {
                    removeFromBasket(video);
                    if (videos.length === showAfterVideo) {
                      setShowAfterVideo(-1);
                    }
                  }}
                  className="hover:underline text-blue-500 text-xs"
                >
                  REMOVE FROM BASKET
                </button>
              </div>
              <div className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-md font-bold">
                {idx + 1}
              </div>
            </div>
          );
        })}
        <div
          className="fixed h-12 w-full bottom-28"
          onDragOver={scrollDown}
        ></div>
      </div>
    );
  };

  const getCommercialElement = () => {
    if (!commercial) {
      return (
        <div className="w-full h-28 bg-red-700  flex justify-center items-center font-bold text-2xl">
          Selected Commercial
        </div>
      );
    }
    const minutes = commercial && Duration.fromISO(commercial.duration).minutes;
    const seconds = commercial && Duration.fromISO(commercial.duration).seconds;
    return (
      <div className="w-full h-32 bg-red-700 flex pt-2">
        <div className="w-full h-20 max-h-20 flex">
          <div className="relative flex w-30 justify-center bg">
            <Image
              src={commercial.thumbnailUrl}
              alt="Video Thumbnail"
              width={100}
              height={30}
            />
            <div className="absolute bottom-1 right-1 bg-black text-white p-1 rounded">
              {`${minutes}:${seconds}`}
            </div>
          </div>

          <div className="flex flex-1 h-full flex-col items-start justify-between ml-2">
            <p className="text-sm h-18 line-clamp-2">{commercial.title}</p>
            <button
              onClick={() => unselectCommercial()}
              className="hover:underline text-white  text-xs"
            >
              UNSELECT AS COMMERCIAL
            </button>
          </div>

          <div className="flex flex-col bg-black items-center">
            <p className="w-20 text-sm font-bold text-center">
              Show After Video
            </p>
            <input
              type="number"
              min="1"
              max={videos.length}
              inputMode="numeric"
              className="w-16 h-10 rounded-xl font-bold bg-gray-700 pl-7"
              value={showAfterVideo === -1 ? "" : showAfterVideo}
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                if (!idx || idx <= 0 || idx > videos.length) {
                  setShowAfterVideo(-1);
                } else {
                  setShowAfterVideo(idx);
                }
              }}
            ></input>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-black w-full flex flex-col flex-1 overflow-scroll gap-2">
        {getVideoElement()}
        {getCommercialElement()}
      </div>
    </div>
  );
}

export default AdminWatchListShoppingBasket;
