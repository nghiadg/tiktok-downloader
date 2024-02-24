import React from "react";
import { NavItem } from "./components";

export const Header = () => {
  return (
    <>
      <div className="h-16 shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-6">
        <span className="text-primary font-bold">shortik.com</span>
        <nav className="flex gap-2">
          <NavItem active>TikTok Video Downloader</NavItem>
          <NavItem>Youtube Video Downloader</NavItem>
          <NavItem>Facebook Video Downloader</NavItem>
        </nav>
        <div></div>
      </div>
      <div className="h-16" />
    </>
  );
};
