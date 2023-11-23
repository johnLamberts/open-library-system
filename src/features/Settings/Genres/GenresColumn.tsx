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
import { IGenres } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import GenresForm from "./GenresForm";

export const genresColumn: ColumnDef<IGenres>[] = [
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
    accessorKey: "genre",
    cell: ({ row }) => <div>{row.getValue("genre")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const saveChanges = (payload: any, isNewRecord?: boolean) => {
        if (isNewRecord) {
          console.log(payload);
        }
      };

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
              onClick={() => navigator.clipboard.writeText(data.genre.at(0))}
            >
              Copy genres
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Sheet>
              <SheetTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Modify Genre
                </DropdownMenuItem>
              </SheetTrigger>
              <SheetContent>
                <GenresForm saveChanges={saveChanges} users={data} />
              </SheetContent>
            </Sheet>

            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              View Genre
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
