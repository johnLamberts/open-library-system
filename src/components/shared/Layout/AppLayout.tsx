import React from "react";
import Navbar from "../Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteHeader from "../SiteHeader";

const tabs = [
  {
    name: "Catalogue",
    path: "catalogue",
  },
  {
    name: "Genres",
    path: "genres",
  },
  {
    name: "Authors",
    path: "authors",
  },
  {
    name: "Item Location",
    path: "item-location",
  },
];

export default function AppLayout() {
  // const location = useLocation();

  // const filterTab = tabs.filter(
  //   (tab) => location.pathname.replace("/", "") === tab.path
  // );

  // const getCurrentRoute = location.pathname.replace("/", "");

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
