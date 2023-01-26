import Header from "@/components/Header";
import React from "react";



export default function LayoutHeader({ children }: {children: React.ReactNode}) {
  
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}