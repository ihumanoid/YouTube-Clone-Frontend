"use client";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface EAdPlayerProps {
  youtubeId: string;
  skipEnabled: boolean;
  experimentId: string;
  updateAdvertisementData: (skipped: boolean) => {};
}

function EAdPlayer({
  youtubeId,
  skipEnabled,
  experimentId,
  updateAdvertisementData,
}: EAdPlayerProps) {
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const pauseTimeoutRef = useRef(-1);
  const [hideWatchOnYouTube, setHideWatchOnYouTube] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [uninitialized, setUninitialized] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleProgress = (progress: any) => {
    if (progress.playedSeconds > 0) {
      setHideWatchOnYouTube(false);
    }
    setPlayedSeconds(Math.floor(progress.playedSeconds));
  };

  const handlePlay = () => {
    clearTimeout(pauseTimeoutRef.current);
    setUninitialized(false);
    setPlaying(true);
  };

  const handlePause = () => {
    window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => {
      setPlaying(false);
    }, 600);
  };

  const handleEnd = (skipped: boolean) => {
    updateAdvertisementData(skipped);
  };

  const formatTime = (inputSeconds: number) => {
    const minutes = Math.floor(inputSeconds / 60);
    const seconds = Math.floor(inputSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getHideElements = () => {
    return (
      <div>
        {/* Progress Bar */}
        <div className="absolute max-w-screen w-full h-[88px] top-0 right-0 transparent bg-black flex flex-col justify-center items-start gap-2">
          <div className="text-xl text-[#C7C7C8] ml-4">
            Ad Duration: {formatTime(playedSeconds)} /{" "}
            {formatTime(totalSeconds)}
          </div>
          <div
            className="bg-red-500 h-2 ml-4"
            style={{ width: `${(playedSeconds / totalSeconds) * 100}%` }}
          ></div>
        </div>
        {hideWatchOnYouTube && (
          <div className="absolute w-48 h-20 bottom-0 left-0 transparent"></div>
        )}
        {/* Block More Shorts Popup */}
        {!playing && !uninitialized && (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center bg-black gap-4 transition duration-1000
          
        `}
          ></div>
        )}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center bg-black gap-4 transition duration-1000 ${
            (playing || uninitialized) && "-translate-x-[2500px]"
          }`}
        >
          <div className="flex justify-center gap-8">
            <button
              className="px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9] cursor-pointer"
              onClick={handlePlay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={200}
                height={200}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
              </svg>
            </button>
          </div>
        </div>
        {/* Block Bottom Right Buttons */}
        {(!skipEnabled || playedSeconds < 5) && (
          <div className="group absolute w-32 h-12 right-0 bottom-0 z-10 flex justify-center items-center gap-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={40}
              height={40}
              fill="gray"
              className="opacity-0 group-hover:opacity-100"
            >
              <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
          </div>
        )}
        <div className="group absolute w-52 h-12 right-0 bottom-12 z-10 flex justify-center items-center gap-10"></div>
        {/* Skip Button */}
        {skipEnabled && playedSeconds >= 5 && (
          <button
            onClick={() => handleEnd(true)}
            className="group absolute w-40 h-12 right-0 bottom-2 bg-black border border-white flex items-center justify-center gap-2 text-3xl text-gray-200 hover:text-gray-400 hover:bg-[#101010] rounded-md cursor-pointer"
          >
            Skip Ad
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={30}
              height={30}
              className="text-gray-200 fill-current group-hover:text-gray-400"
            >
              <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-full flex justify-center items-center max-w-full">
      {getHideElements()}
      <ReactPlayer
        ref={reactPlayerRef}
        config={{
          youtube: {
            playerVars: {
              disablekb: 1, // Disable keyboard controls
              fs: 0, // Disable full screen
              autoplay: 1, // Auto start
            },
          },
        }}
        controls={false}
        width="100%"
        height="100%"
        url={`https://www.youtube.com/shorts/${youtubeId}`}
        onProgress={handleProgress}
        onPause={handlePause}
        onPlay={handlePlay}
        onEnded={() => handleEnd(false)}
        onDuration={(duration) => setTotalSeconds(duration)}
        playing={playing}
      />
    </div>
  );
}

export default EAdPlayer;
