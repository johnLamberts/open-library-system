import ConfirmationModal from "@/components/shared/CustomModal/ConfirmationModal";
import Modal from "@/components/shared/CustomModal/Modal";
import DataTable from "@/components/shared/DataTable/data-table";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authorsColumn } from "@/features/Settings/Authors/AuthorsColumn";
import AuthorsForm from "@/features/Settings/Authors/AuthorsForm";
import { useAuthors } from "@/lib/react-query/queries";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Authors() {
  const { isLoading, authors } = useAuthors();

  const [isClosingPanel, setIsClosingPanel] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  if (isLoading) return <>Loading Author...</>;

  return (
    <>
      <div className="h-full p-[30px]">
        <div className="flex justify-between">
          <h1 className="text-2xl">Author </h1>

          <Sheet
            open={visible}
            onOpenChange={(open) => {
              if (!open) {
                if (isEdited === visible) {
                  setIsClosingPanel(true);
                  return;
                }
                setVisible(false);
              } else {
                setVisible(true);
              }
            }}
          >
            <SheetTrigger asChild>
              <Button>Create Author</Button>
            </SheetTrigger>
            <SheetContent className="">
              <header
                className={` space-y-1 py-4 px-4 bg-overlay-bg sm:px-6
              border-b border-overlay-border`}
              >
                <div>
                  <h3 className="text-lg font-medium">Author</h3>
                  <p className="text-sm text-muted-foreground">
                    Set your authors in the library system
                  </p>
                </div>
              </header>
              <div className="relative overflow-y-auto ">
                <Separator />
                <AuthorsForm
                  updateEditorDirty={() => {
                    setIsEdited(true);
                  }}
                />
              </div>
            </SheetContent>

            <ConfirmationModal
              visible={isClosingPanel}
              header={"Discard Changes"}
              buttonLabel="Discard"
              onSelectCancel={() => setIsClosingPanel(false)}
              onSelectConfirm={() => {
                setIsClosingPanel(false);
                setIsEdited(false);
                setVisible(false);
              }}
            >
              <Modal.Content>
                <p className="py-4 text-sm text-foreground-light">
                  There are unsaved changes. Are you sure you want to close the
                  panel? Your changes will be lost.
                </p>
              </Modal.Content>
            </ConfirmationModal>
          </Sheet>
        </div>

        <div className="p-6 w-full">
          <DataTable data={authors} columns={authorsColumn} />
        </div>
      </div>
    </>
  );
}
