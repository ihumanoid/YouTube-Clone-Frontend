"use client";
import React, { useEffect, useState } from "react";
import { ExperimentData } from "@/utils/YouTubeTypes";
import AdminExperimentAddWindow from "./AdminExperimentAddWindow";
import AdminExperimentEditWindow from "./AdminExperimentEditWindow";
import AdminExperimentDeleteConfirm from "./AdminExperimentConfirmDelete";
import Link from "next/link";

const FilterTypes = ["ID", "Participant ID", "Watch List"];

function AdminExperimentBoard() {
  const [showAddWindow, setShowAddWindow] = useState(false);
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [experimentDataTable, setExperimentDataTable] = useState<
    ExperimentData[]
  >([]);
  const [selectedExperimentData, setSelectedExperimentData] =
    useState<ExperimentData>({
      id: "",
      participantId: "",
      watchListTitle: "",
      watchListId: 0,
      currentVideoIdx: 0,
      skipEnabled: false,
      showAfterVideoIdx: 0,
      commercialYoutubeId: "",
      commercialSimilarityLevel: "",
    });
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("ID");
  const [filteredExperimentDataTable, setFilteredExperimentDataTable] =
    useState<ExperimentData[]>([]);

  const handleEdit = (experimentData: ExperimentData) => {
    setSelectedExperimentData(experimentData);
    setShowEditWindow(true);
  };

  const handleDelete = (experimentData: ExperimentData) => {
    setSelectedExperimentData(experimentData);
    setShowDeleteConfirm(true);
  };

  const handleSearch = () => {
    const newFilteredExperimentDataTable = experimentDataTable.filter(
      (entry) => {
        switch (filter) {
          case "ID":
            return entry.id.toLowerCase().includes(keyword.toLowerCase());
          case "Participant ID":
            return entry.participantId
              .toLowerCase()
              .includes(keyword.toLowerCase());
          default:
            return entry.watchListTitle
              .toLowerCase()
              .includes(keyword.toLowerCase());
        }
      }
    );
    setFilteredExperimentDataTable(newFilteredExperimentDataTable);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    if (!newKeyword) {
      setFilteredExperimentDataTable(experimentDataTable);
    }
    setKeyword(newKeyword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchExperimentData = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/allExperiments`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Error code: ${response.status}`);
    }
    const json = await response.json();
    setExperimentDataTable(json.data);
    setFilteredExperimentDataTable(json.data);
  };

  useEffect(() => {
    fetchExperimentData();
  }, []);

  return (
    <div className="h-full w-full bg-[#303030] flex flex-col p-10">
      {showAddWindow && (
        <AdminExperimentAddWindow
          setShowWindow={setShowAddWindow}
          fetchExperimentData={fetchExperimentData}
        />
      )}
      {showEditWindow && (
        <AdminExperimentEditWindow
          setShowWindow={setShowEditWindow}
          experimentData={selectedExperimentData}
          fetchExperimentData={fetchExperimentData}
        />
      )}
      {showDeleteConfirm && (
        <AdminExperimentDeleteConfirm
          setShowDeleteConfirm={setShowDeleteConfirm}
          fetchExperimentData={fetchExperimentData}
          experimentId={selectedExperimentData.id}
        />
      )}

      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl">Experiments Table</h1>
        <div className="flex">
          <div className="flex">
            <input
              type="text"
              placeholder="Filter by"
              className="bg-black px-2 text-sm h-12 w-40"
              value={keyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-current bg-[#101010] text-white h-12 p-2 hover:bg-[#202020] cursor-pointer"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>
          <select
            className="bg-black px-2 text-xs w-32 h-12 rounded-xl font-bold cursor-pointer ml-1 mr-4"
            onChange={(e) => setFilter(e.target.value)}
          >
            {FilterTypes.map((filter) => (
              <option value={filter} key={filter}>
                {filter}
              </option>
            ))}
          </select>
          <button
            className="bg-black px-4 w-20 h-12 rounded-xl font-bold hover:bg-[#202020]"
            onClick={() => setShowAddWindow(true)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-sm border border-gray-400 px-4 py-2 w-32 max-w-32">
                ID
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 w-32 max-w-32">
                Participant ID
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 w-40 max-w-40">
                Watch List
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32">
                Current Video
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32">
                Can Skip
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32">
                Show Commercial After
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32">
                Commercial Similarity
              </th>
              <th className="text-sm border border-gray-400 px-4 py-2 min-w-20 max-w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExperimentDataTable.map((item) => (
              <tr key={item.id}>
                <td className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32 truncate">
                  {item.id}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2 min-w-32 max-w-32 truncate">
                  {item.participantId}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2 min-w-40 max-w-40 truncate">
                  <div className="w-full h-full line-clamp-1">
                    {item.watchListTitle}
                  </div>
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2">
                  {item.currentVideoIdx}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2">
                  {item.skipEnabled ? "Yes" : "No"}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2">
                  {item.showAfterVideoIdx}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2">
                  {item.commercialSimilarityLevel || "TBD"}
                </td>
                <td className="text-sm border border-gray-400 px-4 py-2 flex justify-center gap-2">
                  <button
                    className="bg-black text-white py-1 px-2 w-16 text-center"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 w-16 text-center"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                  <Link
                    className="bg-green-500 text-white py-1 px-2 w-16 text-center"
                    href={`/evideo/${item.id}`}
                    target="_blank"
                  >
                    Videos
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminExperimentBoard;
