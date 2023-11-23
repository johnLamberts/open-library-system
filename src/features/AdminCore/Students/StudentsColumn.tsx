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
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const studentsColumn: ColumnDef<any>[] = [
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
    accessorKey: "studentImg",
    header: "Student",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("studentImg")} />
          <AvatarFallback>LMS</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div>
        {/* {row.getValue("firstName")} {row.getValue("middleName")} {""} */}
        {row.getValue("firstName")}
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div>
        {/* {row.getValue("firstName")} {row.getValue("middleName")} {""} */}
        {row.getValue("lastName")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Sex",
    cell: ({ row }) => {
      return <div>{row.getValue("")}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Academic Course",
    cell: ({ row }) => {
      return <div>{row.getValue("")}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Grade Level",
    cell: ({ row }) => {
      return <div>{row.getValue("")}</div>;
    },
  },

  {
    accessorKey: "",
    header: "Level of Education",
    cell: ({ row }) => {
      return <div>{row.getValue("")}</div>;
    },
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
              onClick={() => navigator.clipboard.writeText(data.genres.at(0))}
            >
              Copy Student
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              View Student
            </DropdownMenuItem>
            <Sheet>
              <SheetTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Modify Student
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>{/* <UsersForm users={data} /> */}</SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
