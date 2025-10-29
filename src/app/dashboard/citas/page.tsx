"use client";
import React, { useState } from "react";
import Calendar from "@/components/calendar";
import { SiteHeader } from "@/components/site-header";
import InventoryTable from "@/components/table-me";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"calendar" | "other">("calendar");

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex border-b border-gray-300 px-4">
          <button
            className={`py-2 px-4 ${
              activeTab === "calendar"
                ? "border-b-2 border-blue-500 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            Calendario
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "other"
                ? "border-b-2 border-blue-500 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("other")}
          >
            Table
          </button>
        </div>

        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
          {activeTab === "calendar" && (
            <div className="px-4 lg:px-2">
              <Calendar />
            </div>
          )}
          {activeTab === "other" && (
            <div className="px-4 lg:px-2">
              <InventoryTable />
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
