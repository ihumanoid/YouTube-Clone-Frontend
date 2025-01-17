"use client";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Video } from "@/utils/YouTubeTypes";
import { WatchListReducerState } from "@/lib/features/watchListSlice";

interface EVideoPlayerProps {
  youtubeId: string;
  videoTitle: string;
  updateVideoData: (
    watchTime: number,
    numSkipsAhead: number,
    numSkipsBehind: number,
    liked: boolean,
    disliked: boolean
  ) => {};
}

function EVideoPlayer({
  youtubeId,
  videoTitle,
  updateVideoData,
}: EVideoPlayerProps) {
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const [prevPlayedSeconds, setPrevPlayedSeconds] = useState(0);
  const [hideWatchOnYouTube, setHideWatchOnYouTube] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Video Data
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [numSkipsAhead, setNumSkipsAhead] = useState(0);
  const [numSkipsBehind, setNumSkipsBehind] = useState(0);

  const handleProgress = (progress: any) => {
    if (progress.playedSeconds > 0.01) {
      setHideWatchOnYouTube(false);
    }
    if (progress.playedSeconds - prevPlayedSeconds >= 2) {
      // console.log(
      //   "User has skipped ahead " +
      //     Math.floor(progress.playedSeconds - prevPlayedSeconds)
      // );
      setNumSkipsAhead((prev) => prev + 1);
      setWatchTime(
        (prev) => prev - Math.floor(progress.playedSeconds - prevPlayedSeconds)
      );
    }
    if (progress.playedSeconds - prevPlayedSeconds <= -2) {
      // console.log(
      //   "User has skipped behind " +
      //     Math.floor(progress.playedSeconds - prevPlayedSeconds)
      // );
      setNumSkipsBehind((prev) => prev + 1);
      setWatchTime(
        (prev) => prev - Math.floor(progress.playedSeconds - prevPlayedSeconds)
      );
    }
    setPrevPlayedSeconds(progress.playedSeconds);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };
  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setLiked(false);
      setDisliked(true);
    }
  };

  const handleEnd = () => {
    // console.log(
    //   `liked=${liked} disliked=${disliked} numSkipsAhead=${numSkipsAhead} numSkipsBehind=${numSkipsBehind} watchTime=${watchTime}`
    // );
    setLiked(false);
    setDisliked(false);
    setNumSkipsAhead(0);
    setNumSkipsBehind(0);
    setWatchTime(0);
    setPrevPlayedSeconds(0);
    setPlaying(true);
    updateVideoData(watchTime, numSkipsAhead, numSkipsBehind, liked, disliked);
  };

  const getHideElements = () => {
    return (
      <div>
        {/* Block Top Section with Likes & DisLikes */}
        <div className="absolute w-screen h-[88px] top-0 right-0 transparent bg-black flex justify-between items-center px-4 max-md:px-2">
          <div className="text-2xl w-1/2 line-clamp-1 text-white">
            {videoTitle}
          </div>
          <div>
            <button className="cursor-pointer px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={40}
                height={40}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
                onClick={handleLike}
              >
                {liked ? (
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                ) : (
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                )}
              </svg>
            </button>
            <button className="px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={40}
                height={40}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
                onClick={handleDislike}
              >
                {disliked ? (
                  <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                ) : (
                  <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Block Watch On Youtube */}
        {hideWatchOnYouTube && (
          <div className="absolute w-48 h-20 bottom-0 left-0 transparent group flex justify-center items-end pb-2">
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
        {/* Block More Shorts */}
        {/* {showPauseWindow && (
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 flex flex-col items-center justify-center bg-black gap-4 transition duration-1000
          
        `}
          />
        )}

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 flex flex-col items-center justify-center bg-black gap-4 transition duration-1000 ${
            showPauseWindow || "-translate-x-[3500px] "
          }`}
        >
          <div className="text-[40px] font-semibold text-[#F9F9F9] text-center">
            How are you finding the video so far?
          </div>
          <div className="flex justify-center gap-8">
            <button className="cursor-pointer px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={120}
                height={120}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
                onClick={handleLike}
              >
                {liked ? (
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                ) : (
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                )}
              </svg>
              Like
            </button>
            <button className="px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={120}
                height={120}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
                onClick={handleDislike}
              >
                {disliked ? (
                  <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" />
                ) : (
                  <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" />
                )}
              </svg>
              Dislike
            </button>
            <button
              className="px-4 py-2 text-white rounded focus:outline-none hover:text-[#B9B9B9]"
              onClick={handlePlay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={120}
                height={120}
                className="text-[#F9F9F9] fill-current hover:text-[#B9B9B9]"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
              </svg>
              Resume
            </button>
          </div>
        </div> */}
        {/* Block Bottm Right Tool Buttons */}
        <div className="group absolute w-24 h-10 right-0 bottom-0 z-10 flex justify-center items-center gap-10 max-sm:w-0">
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
        {/* <div className="group absolute w-24 h-10 right-0 bottom-12 max-md:bottom-0 z-10 flex justify-center items-center gap-10"></div> */}
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-full justify-center items-center max-w-full">
      {getHideElements()}
      <ReactPlayer
        ref={reactPlayerRef}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              fs: 0, // Disable full screen
            },
          },
        }}
        controls={true}
        width="100%"
        height="100%"
        url={`https://www.youtube.com/shorts/${youtubeId}`}
        onProgress={handleProgress}
        onEnded={handleEnd}
        playing={playing}
        onDuration={(d) => setWatchTime(d)}
      />
    </div>
  );
}

export default EVideoPlayer;
