import HeaderDashboard from "@/components/HeaderDashboard";
import React from "react";



export default function LayoutHeaderDashboard({ children }: {children: React.ReactNode}) {
  
  return (
    <React.Fragment>
      <HeaderDashboard />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </React.Fragment>
  )
}