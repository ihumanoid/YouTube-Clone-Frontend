import React from "react";

function AdminVideoBox() {
  return (
    <div className="w-full bg-yellow-600 h-48 flex justify-between items-center gap-3">
      <div className="flex h-full items-center">
        <div className="w-64 h-5/6 bg-black flex justify-center items-center rounded-xl">
          Image
        </div>
        <div className="ml-8">Video Title: This is a very long title</div>
      </div>
      <input type="checkbox" className="w-5 h-5 mr-4" />
    </div>
  );
}

export default AdminVideoBox;
