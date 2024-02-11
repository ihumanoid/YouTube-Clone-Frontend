"use client";
import { useRouter } from "next/navigation";

export interface WatchListTitleProps {
  watchListId: number;
  watchListTitle: string;
}

export default function WatchListTitle({
  watchListTitle,
  watchListId,
}: WatchListTitleProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-[#272727] rounded-md w-5/6 h-12 flex justify-center items-center hover:font-bold cursor-pointer"
      onClick={() => router.push(`/${watchListId}`)}
    >
      <p className="line-clamp-1">{watchListTitle}</p>
    </button>
  );
}
