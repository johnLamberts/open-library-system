import { Separator } from "@/components/ui/separator";
import React from "react";
import { Outlet } from "react-router-dom";

export const buildSidebarItems = [
  {
    id: "kkYow",
    to: "/builds/catalogue",
    title: "Catalogue",
  },
  {
    id: "mNvi",
    to: "/builds/student-management",
    title: "Student Management",
  },
  {
    id: "Jkxm",
    to: "/builds/user-management",
    title: "User Management",
  },
  {
    id: "U9kX",
    to: "/builds/circulation",
    title: "Circulation",
  },
];

export const settingsSidebarItems = [
  {
    id: 1,
    to: "/settings/genres",
    title: "Genres",
  },
  {
    id: 2,
    to: "/settings/authors",
    title: "Authors",
  },
  {
    id: 5,
    to: "/settings/item-types",
    title: "Category",
  },
  {
    id: 6,
    to: "/settings/user-roles",
    title: "User Role",
  },
  {
    id: 7,
    to: "/settings/educational-stage",
    title: "Level of Education",
  },
  {
    id: 8,
    to: "/settings/grade-level",
    title: "Grade Level",
  },
  {
    id: 9,
    to: "/settings/academic-course",
    title: "Academic Course",
  },
  {
    id: 4,
    to: "/settings/item-types",
    title: "Stock",
  },
];

export default function BuildLayout({
  title,
  description,
  miniSideNav,
}: {
  title: string;
  description: string;
  miniSideNav: React.ReactNode;
}) {
  return (
    <div className="hidden space-y-6 p-10 pb-4 md:block">
      <div className="space-y-0 5">
        <h2 className="text-2xl font-bold tracking-tight">
          {/* Build your Library */}
          {title}
        </h2>
        <p className="text-muted-foreground">
          {/* Manage your library cntent and set your data into the system.. */}
          {description}
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-4">
        <aside className="-mx-4 lg:w-1/6">
          {/* <BuildSideNav items={buildSidebarItems} /> */}
          {miniSideNav}
        </aside>

        <div className="flex-1 lg:min-w-4xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
