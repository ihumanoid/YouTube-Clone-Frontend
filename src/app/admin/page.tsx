import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Dashboard from "@/components/admin/Dashboard";

function page() {
  return (
    <div>
      <AdminNavbar />
      <div className="bg-slate-200 w-full h-[90vh] flex">
        <AdminSidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default page;
