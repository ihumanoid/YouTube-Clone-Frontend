import Image from "next/image";
import Navbar from "../components/homepage/Navbar";
import Feed from "../components/homepage/Feed";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 w-full h-[90vh] flex flex-col">
        <Feed />
      </div>
    </>
  );
}
