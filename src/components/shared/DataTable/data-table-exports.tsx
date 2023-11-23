import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cell } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";

interface DataTableExportsProps<TData> {
  data: TData[];
}

export default function DataTableExports<TData>({
  data,
}: DataTableExportsProps<TData>) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Option
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel className="text-center">
            Format Options
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Button
              className="w-full border-b"
              variant="ghost"
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              Excel
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Button
              className="w-full border-b"
              variant="ghost"
              onClick={() => alert(JSON.stringify(data, null, 4))}
            >
              CSV
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
