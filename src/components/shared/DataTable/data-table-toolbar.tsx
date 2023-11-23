import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Cell, Table } from "@tanstack/react-table";
import DataTableViewOptions from "./data-table-view-options";
import { DebouncedInput } from "../Input/DebounceInput";
import DataTableExports from "./data-table-exports";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: TData[];
  globalFilter: string;
}

const DataTableToolbar = <TData,>({
  table,
  globalFilter,
  data,
}: DataTableToolbarProps<TData>) => {
  const filters = table.getRowModel().flatRows.map((row) => row.original);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          placeholder={`Search...`}
          onChange={(event) => table.setGlobalFilter(String(event))}
          value={globalFilter ?? ""}
        />

        <Button
          disabled={globalFilter === "" || !filters.length ? true : false}
          onClick={() => alert(JSON.stringify(filters, null, 7))}
        >
          Export Catalog
        </Button>
      </div>
      <div className="flex gap-x-2">
        <DataTableViewOptions table={table} />
        <DataTableExports data={data} />
      </div>
    </div>
  );
};

export default DataTableToolbar;
