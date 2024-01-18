import Image from "next/image";
import Navbar from "../components/homepage/Navbar";
import Feed from "../components/homepage/Feed";

export default function Home() {
  return (
    <div className="bg-slate-200 w-full h-full flex flex-col">
      <Feed />
    </div>
  );
}
