import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import ItemTypesForm from "./ItemTypeForm";

export default function CategoryActions({ data }: any) {
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
          onClick={() => navigator.clipboard.writeText(data.itemType)}
        >
          Copy Category
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Sheet>
          <SheetTrigger>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Modify Category
            </DropdownMenuItem>
          </SheetTrigger>
          <SheetContent>
            <ItemTypesForm saveChanges={saveChanges} users={data} />
          </SheetContent>
        </Sheet>

        <DropdownMenuItem onClick={() => alert(JSON.stringify(data, null, 4))}>
          View Category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
