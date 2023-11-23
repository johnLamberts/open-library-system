import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IAcademicCourse } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import AcademicCourseForms from "./AcademicCourseForms";

export const academicCourseColumn: ColumnDef<IAcademicCourse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "academicCourse",
    header: "Academic Course",
    cell: ({ row }) => <div>{row.getValue("academicCourse")}</div>,
  },
  {
    accessorKey: "educationalStage",
    header: "Level of Education",
    cell: ({ row }) => <div>{row.getValue("educationalStage")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.academicCourse)}
            >
              Copy Grade Level
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Sheet>
              <SheetTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Modify Grade Level
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>
                <AcademicCourseForms academicCourse={data} />
              </SheetContent>
            </Sheet>

            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              View Grade Level
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
