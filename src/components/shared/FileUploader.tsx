import { convertFileToUrl } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileIcon, ImageIcon } from "lucide-react";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  isImage?: boolean;
  fileUrlName?: string;
};

export default function FileUploader({
  fieldChange,
  mediaUrl,
  fileUrlName,
  isImage,
}: FileUploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const acceptFile = isImage
    ? {
        "image/*": [".png", ".jpeg", ".jpg"],
      }
    : { "application/pdf": [".pdf"] };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: acceptFile,
  });

  const fileName = acceptedFiles.map((file) => (
    <>
      <li key={file.type}>
        {file.name} - {file.size}
      </li>
    </>
  ));
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <Input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        isImage ? (
          <>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img src={fileUrl} alt="image" className="file_uploader-img" />
            </div>
            <p className="file_uploader-label">
              Click or drag photo to replace
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-y-4 justify-center w-full p-5 lg:p-10">
              {/* <img src={fileUrl} alt="image" className="file_uploader-img" /> */}
              <div>{fileName && fileName}</div>
              <a
                href={fileUrl}
                target="_blank"
                className="text-underline bg-rose-700 p-2"
              >
                {fileUrlName}
              </a>
            </div>
            <p className="file_uploader-label">Click or drag file to replace</p>
          </>
        )
      ) : isImage ? (
        <div className="flex items-center flex-col mt-5 justify-center h-full my-autorounded-md">
          <ImageIcon className="h-5 w-5 text-slate-500" />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" variant={"outline"} size={"sm"}>
            Select from computer
          </Button>
        </div>
      ) : (
        <div className="flex items-center flex-col mt-5 justify-center h-full my-autorounded-md">
          <FileIcon className="h-5 w-5 text-slate-500" />

          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag File here</h3>
          <p className="text-light-4 small-regular mb-6">
            <strong>PDF</strong>
          </p>

          <Button type="button" variant={"outline"} size={"sm"}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
