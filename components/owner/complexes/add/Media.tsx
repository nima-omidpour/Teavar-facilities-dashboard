"use client";

import CardHeader from "@/components/comon/card-header";
import CardWrapper from "@/components/comon/card-wrapper";
import { Camera } from "lucide-react";
import { useState } from "react";
import CoverImageUpload from "@/components/owner/complexes/add/media/cover-image-upload";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import GalleryImagesUpload from "@/components/owner/complexes/add/media/gallery-images-upload";
interface MediaUploadProps {
  complexId: string;
  initialCoverImage?: string;
  onSuccess: () => void;
}

export default function Media({
  complexId,
  initialCoverImage,
  onSuccess,
}: MediaUploadProps) {
  const [coverImage, setCoverImage] = useState<string | undefined>(
    initialCoverImage,
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleCoverUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("complexId", complexId);
      const response = await fetch("/api/complexes/upload-cover-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload cover image");
      }
      const data = await response.json();
      setCoverImage(data.coverImage);
      onSuccess();
    } catch (error) {
      console.error("Error uploading cover image:", error);
      toast.error("Failed to upload cover image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryImagesUpload = (images: File[]) => {
    console.log(images);
  };

  const handleCoverDelete = async () => {
    if (!coverImage) return;

    try {
      await fetch(`/api/upload/cover?url=${coverImage}`, {
        method: "DELETE",
      });

      setCoverImage(undefined);
      toast.success("تصویر کاور حذف شد");
    } catch (error) {
      toast.error("خطا در حذف تصویر");
      console.error(error);
    }
  };
  return (
    <div className="space-y-8">
      <CardWrapper>
        <CardHeader
          icon={<Camera />}
          title="تصویر اصلی"
          description="تصویر اصلی مجموعه را اضافه کنید."
        />
        <CoverImageUpload
          currentImage={coverImage}
          onUpload={handleCoverUpload}
          onDelete={handleCoverDelete}
          maxSize={5242880}
        />
      </CardWrapper>
      <CardWrapper>
        <CardHeader
          icon={<ImageIcon />}
          title="گالری تصاویر"
          description="تصاویر مجموعه را اضافه کنید."
        />
        <GalleryImagesUpload complexId={complexId} maxSize={5242880} />
      </CardWrapper>
    </div>
  );
}
