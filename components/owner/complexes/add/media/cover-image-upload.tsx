"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CoverImageUploadProps {
  currentImage?: string;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
  maxSize?: number;
  className?: string;
}
export default function CoverImageUpload({
  currentImage,
  onUpload,
  onDelete,
  maxSize = 5 * 1024 * 1024,
  className,
}: CoverImageUploadProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<{
    name: string;
    size: number;
    dimensions?: { width: number; height: number };
  } | null>(null);

  const getImageDimensions = (
    file: File,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      const preview = URL.createObjectURL(file);
      const dimensions = await getImageDimensions(file);

      setImageFile(file);
      setImagePreview(preview);
      setImageInfo({
        name: file.name,
        size: file.size,
        dimensions,
      });

      onUpload?.(file);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
    maxSize,
    multiple: false,
    noClick: !!imagePreview,
    noKeyboard: !!imagePreview,
  });

  const handleDelete = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageInfo(null);
    onDelete?.();
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-border-muted bg-bg-elevated transition-all",
        isDragActive && "border-accent-primary bg-accent-primary/5",
        !imagePreview && "cursor-pointer hover:border-accent-primary/50",
        className,
      )}
    >
      <input {...getInputProps()} />

      <div className="relative aspect-[21/9] w-full">
        {imagePreview ? (
          <>
            <Image
              src={imagePreview}
              alt="Cover preview"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity hover:opacity-100" />

            <div className="absolute left-4 top-4 z-10"></div>

            <div className="absolute bottom-4 left-4 z-10 text-white">
              <p className="text-sm font-bold drop-shadow-lg">
                {imageInfo?.name || "cover_image.jpg"}
              </p>
              <p className="text-xs opacity-90 drop-shadow-lg">
                {imageInfo && formatFileSize(imageInfo.size)}
                {imageInfo?.dimensions &&
                  ` • ${imageInfo.dimensions.width}x${imageInfo.dimensions.height}px`}
              </p>
            </div>

            <div className="absolute bottom-4 right-16 z-10 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
              >
                <Upload className="mr-2 h-4 w-4" />
                Replace Image
              </Button>
            </div>

            <div className="absolute bottom-4 right-4 z-10 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="bg-red-500/90 backdrop-blur-sm hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
            <div className="rounded-full bg-bg-card p-4">
              <Upload className="h-8 w-8 text-accent-primary" />
            </div>
            {isDragActive ? (
              <p className="text-lg font-medium text-accent-primary">
                رها کنید تا آپلود شود...
              </p>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-lg font-medium text-text-primary">
                    تصویر کاور را آپلود کنید
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    تصویر را بکشید یا کلیک کنید
                  </p>
                </div>
                <p className="text-xs text-text-secondary">
                  فرمت: JPG، PNG، WEBP • حداکثر {maxSize / 1024 / 1024}MB • سایز
                  پیشنهادی: 1920x1080px
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
