import { Video } from "@/utils/YouTubeTypes";
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
  removeFromBasket: (video: Video) => void;
  setBasketVideos: Dispatch<SetStateAction<Video[]>>;
}

function AdminWatchListShoppingBasket({
  videos,
  removeFromBasket,
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
              className={`w-full h-20 flex border-b-white border-b-solid border-b-2 py-4 items-center ${
                draggedOverVideoIdxState === idx &&
                "border-dashed border-2 border-blue-500"
              }`}
            >
              <div className="relative flex w-30 justify-center">
                <img
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
                <p className="text-sm line-clamp-1">{video.title}</p>
                <button
                  onClick={() => {
                    removeFromBasket(video);
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

  return (
    <div className="flex flex-col w-full">
      <div className="bg-black w-full flex flex-col flex-1 overflow-scroll gap-2">
        {getVideoElement()}
      </div>
    </div>
  );
}

export default AdminWatchListShoppingBasket;
