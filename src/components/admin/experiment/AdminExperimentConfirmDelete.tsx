import React from "react";

interface AdminExperimentDeleteConfirmProps {
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchExperimentData: () => {};
  experimentId: string;
}

function AdminExperimentDeleteConfirm({
  fetchExperimentData,
  setShowDeleteConfirm,
  experimentId,
}: AdminExperimentDeleteConfirmProps) {
  const deleteVideos = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment?experimentId=${experimentId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchExperimentData();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="z-10">
      <div className="bg-gray-800 opacity-50 fixed inset-0"></div>
      <div className="fixed top-1/2 left-1/2 bg-[#323264] h-60 px-4 transform -translate-x-1/2 -translate-y-1/2 shadow-md">
        <p className="text-center text-xl font-bold mt-12 mb-2">
          Delete Experiment {experimentId}
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="absolute top-2 right-2 w-8 h-8 cursor-pointer hover:text-[#d5cfcf]"
          >
            X
          </button>
        </p>

        <div className="flex justify-center gap-8">
          <button
            className="text-xl bg-white text-[#323264] p-2 font-bold mt-10 rounded-2xl hover:bg-[#d5cfcf]"
            onClick={deleteVideos}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminExperimentDeleteConfirm;
