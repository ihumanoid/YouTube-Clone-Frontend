import React from "react";

interface InstructionsProps {
  incrementPageNum: () => void;
}
function Instructions({ incrementPageNum }: InstructionsProps) {
  return (
    <div className="bg-black w-full h-full flex justify-center items-center text-white">
      <div className="bg-gray-700 px-10 py-4 rounded-lg">
        <div className="text-3xl text-center mb-4">Instructions</div>
        <ul className="text-xl flex flex-col gap-2">
          <li>
            <span className="text-sm mr-4">&#9679;</span>You will be assigned 10
            shorts to watch
          </li>
          <li>
            <span className="text-sm mr-4">&#9679;</span>
            Feel free to use the progress bar, and like or dislike any videos
          </li>
          <li>
            <span className="text-sm mr-4">&#9679;</span>
            The video player might contain links that redirect to YouTube. Avoid
            clicking those links and stay on this website
          </li>
          <li>
            <span className="text-sm mr-4">&#9679;</span>
            After finishing the video, you will be asked to complete a brief
            questionaire
          </li>
        </ul>
        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-white px-2 py-1 text-gray-700 hover:bg-slate-200 text-2xl border-2 rounded-md border-gray-900"
            onClick={incrementPageNum}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
