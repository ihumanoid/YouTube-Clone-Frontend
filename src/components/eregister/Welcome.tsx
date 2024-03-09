"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ExperimentData, ExperimentDataVO } from "@/utils/YouTubeTypes";
import { WatchListVideosVO } from "@/utils/YouTubeTypes";

interface WelcomeProps {
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setExperimentId: React.Dispatch<React.SetStateAction<string>>;
  setAssignedWatchList: React.Dispatch<
    React.SetStateAction<WatchListVideosVO | null>
  >;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function Welcome({
  setPageNum,
  setExperimentId,
  setAssignedWatchList,
  email,
  setEmail,
}: WelcomeProps) {
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidEmail(e.target.value.length > 0 && e.target.checkValidity());
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleNext = async () => {
    if (!validEmail) {
      setEmailError(true);
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/byParticipantId?participantId=${email}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.code === 404) {
      setPageNum((prev) => prev + 1);
    } else {
      const experimentData: ExperimentDataVO = json.data;
      setAssignedWatchList(experimentData.watchListVideosVO);
      setExperimentId(experimentData.id);
      setPageNum((prev) => prev + 3);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-700 p-10 rounded-lg">
        <div className="text-3xl text-center mb-8">
          Welcome! You are invited to watch some fun YouTube shorts.
        </div>
        <label className="text-lg">Please enter your email:</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          className={`text-black text-lg block w-full px-4 py-2 mt-2 rounded-md border-2  ${
            emailError ? "border-red-600" : "border-gray-900"
          }`}
        ></input>
        <div className={`text-red-600 ${emailError ? "" : "hidden"}`}>
          Please enter a valid email
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-white px-2 py-1 text-gray-700 hover:bg-slate-200 text-2xl border-2 rounded-md border-gray-900"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
