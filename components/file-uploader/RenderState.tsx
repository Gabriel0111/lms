import { CloudUploadIcon, ImageIcon, Loader, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          click to upload
        </span>
      </p>
      <Button type="button" className="mt-4">
        Select File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-destructive text-center">
      <ImageIcon className="size-10 mx-auto mb-3" />
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs text-muted-foreground">Something went wrong</p>

      <Button type="button" className="mt-4">
        Retry File Selection
      </Button>
    </div>
  );
};

interface RenderUploadedStateProps {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: RenderUploadedStateProps) => {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="Upload Image"
        fill
        className="object-contain p-2"
      />
      <Button
        type="button"
        className={cn("absolute top-4 right-4")}
        variant="destructive"
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting && <Loader className="size-4" />}
        <XIcon className="size-4" />
      </Button>
    </div>
  );
};

interface RenderUploadingStateType {
  progress: number;
  file: File;
}

export const RenderUploadingState = ({
  progress,
  file,
}: RenderUploadingStateType) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {progress} %<p className="mt-2 text-sm font-medium">Uploading...</p>
      <p className="mt-1 text-sx text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
};
