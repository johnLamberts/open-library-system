import DataTable from "@/components/shared/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { catalogsData } from "@/data";
import { catalogColumns } from "@/features/AdminCore/Catalogue/CatalogueColumns";
import { useForm } from "react-hook-form";

export default function Circulation() {
  const form = useForm();
  return (
    <>
      <div className="h-full">
        <Tabs defaultValue="all-circulation">
          <div className="flex justify-between">
            {/* <h1 className="text-2xl">Student Management</h1> */}
            <h1 className="text-2xl">Circulation</h1>

            <TabsList className="">
              <TabsTrigger value="all-circulation">All Transaction</TabsTrigger>
              <TabsTrigger value="borrowed-material">
                Borrowed Materials
              </TabsTrigger>
              <TabsTrigger value="returned-material">
                Returned Materials
              </TabsTrigger>
            </TabsList>
          </div>{" "}
          <Separator className="m-5 relative" />
          <TabsContent value="all-circulation">
            <div className="p-6 w-full">
              <DataTable data={catalogsData} columns={catalogColumns} />
            </div>
          </TabsContent>
          <TabsContent value="borrowed-material">
            <div className="mx-auto my-5 gap-x-5 grid grid-cols-1 sm:grid-cols-2 max-w-full">
              <div>
                <FormRow label="Student Name">
                  <Input />
                </FormRow>
                <FormRow label="Material Type">
                  <Input />
                </FormRow>
                <FormRow label="Date Borrowed">
                  <Input />
                </FormRow>
              </div>
              <div>
                <FormRow label="Student Number">
                  <Input />
                </FormRow>
                <FormRow label="Title">
                  <Input />
                </FormRow>
                <FormRow label="Due Date">
                  <Input />
                </FormRow>
              </div>

              <div className="flex mt-5 px-2 gap-x-2">
                <Button variant={"default"}>Borrow</Button>
                <Button variant={"default"}>Reset Field</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="returned-material">
            <div className="mx-auto my-5 gap-x-5 grid grid-cols-1 sm:grid-cols-2 max-w-full">
              <div>
                <FormRow label="Student Name">
                  <Input />
                </FormRow>
                <FormRow label="Material Type">
                  <Input />
                </FormRow>
                <FormRow label="Date Borrowed">
                  <Input />
                </FormRow>
                <FormRow label="Material Status">
                  <div className="">
                    {/* <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full appearance-none bg-transparent font-normal"
                      )}
                      {...form.register("gender")}
                    >
                      {itemStatusData.map((status) => (
                        <option value={status.status}>{status.status}</option>
                      ))}
                    </select> */}
                  </div>
                </FormRow>
              </div>
              <div>
                <FormRow label="Student Number">
                  <Input />
                </FormRow>
                <FormRow label="Title">
                  <Input />
                </FormRow>
                <FormRow label="Due Date">
                  <Input />
                </FormRow>
                <FormRow label="Penalty">
                  <Input />
                </FormRow>
              </div>

              <div className="flex mt-5 px-2 gap-x-2">
                <Button variant={"default"}>Return</Button>
                <Button type="reset" variant={"default"} onClick={form.reset}>
                  Reset Field
                </Button>
              </div>
            </div>
          </TabsContent>
          {/* <div className="p-6 w-full">
            <DataTable data={catalogsData} columns={catalogColumns} />
          </div> */}
        </Tabs>
      </div>
    </>
  );
}

export const FormRow = ({ label, error, children, orientation }: any) => {
  return (
    <div
      className="grid items-center grid-cols-1 gap-2 p-2 mb-2"
      aria-orientation={orientation}
    >
      {label && (
        <label htmlFor={children.props.id} className="font-medium text-xs">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
};
