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
import CatalogueForm from "./CatalogueForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const catalogColumns: ColumnDef<any>[] = [
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
    accessorKey: "catalogFileImage",
    header: "Catalog",
    cell: ({ row }) => {
      console.log(row.getValue("catalogFileImage"));
      return (
        <Avatar>
          <AvatarImage src={row.getValue("catalogFileImage")} />
          <AvatarFallback>LMS</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <div>{row.getValue("isbn")}</div>,
  },

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "itemType",
    header: "Category",
    cell: ({ row }) => {
      return <div>{row.getValue("itemType")}</div>;
    },
  },
  {
    accessorKey: "yearPublished",
    header: "Year Published",
    cell: ({ row }) => <div>{row.getValue("yearPublished")}</div>,
  },

  {
    accessorKey: "authors",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.authors.map((author) => (
            <>
              <span>{author.label}</span>
              <br />
            </>
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: "genres",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.genres.map((genre) => (
            <>
              <span>{genre.label}</span>
              <br />
            </>
          ))}
        </div>
      );
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
              Copy genres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              View Catalog
            </DropdownMenuItem>
            <Sheet>
              <SheetTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Modify Catalog
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>
                <CatalogueForm catalogues={data} />
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
