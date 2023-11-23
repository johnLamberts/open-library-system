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
import CatalogueForm from "../Catalogue/CatalogueForm";
import UsersForm from "./UsersForm";

export const usersColumns: ColumnDef<any>[] = [
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
    accessorKey: "avatarImage",
    header: "User",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("avatarImage")} />
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
    accessorKey: "displayName",
    header: "Display Name",
    cell: ({ row }) => {
      return <div>{row.getValue("displayName")}</div>;
    },
  },

  {
    accessorKey: "userRole",
    header: "User Role",
    cell: ({ row }) => {
      return <div>{row.getValue("userRole")}</div>;
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
              Copy User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              View User
            </DropdownMenuItem>
            <Sheet>
              <SheetTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Modify User
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>
                <UsersForm users={data} />
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
