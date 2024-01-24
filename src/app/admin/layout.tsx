import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import React from "react";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <AdminNavbar />
      <div className="bg-slate-200 w-full h-[90vh] flex">
        <AdminSidebar />
        {children}
      </div>
    </section>
  );
}
