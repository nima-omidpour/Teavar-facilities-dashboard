import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GalleryImagesUploadProps {
  className?: string;
  maxSize?: number;
  complexId: string;
  onUploadComplete?: () => void;
}

interface ImageFile {
  id: string;
  file: File;
  isUploading: boolean;
  isUploaded: boolean;
  error?: string;
  url: string;
  uploadedUrl?: string;
}

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export default function GalleryImagesUpload({
  className,
  maxSize = 5 * 1024 * 1024,
  complexId,
  onUploadComplete,
}: GalleryImagesUploadProps) {
  const [newImages, setNewImages] = useState<ImageFile[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);

  // Fetch uploaded images from server
  const fetchUploadedImages = async () => {
    setIsLoadingGallery(true);
    try {
      const response = await fetch(`/api/complexes/${complexId}/images`);
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setUploadedImages(data.images || []);
    } catch (e) {
      console.error("Failed to fetch uploaded images:", e);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const uploadToServer = async (file: File) => {
    // Simulate delay (remove this in production)
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
    return data;
  };

  const handleUploadImages = async (newImagesFiles: ImageFile[]) => {
    const uploadPromises = newImagesFiles.map(async (newImage) => {
      try {
        const result = await uploadToServer(newImage.file);

        setNewImages((prev) =>
          prev.map((image) =>
            image.id === newImage.id
              ? {
                  ...image,
                  isUploading: false,
                  isUploaded: true,
                  uploadedUrl: result.url,
                }
              : image,
          ),
        );

        setTimeout(() => {
          setNewImages((prev) => prev.filter((img) => img.id !== newImage.id));
          setUploadedImages((prev) => [
            ...prev,
            {
              id: result.id,
              url: result.url,
              name: newImage.file.name,
            },
          ]);
        }, 1500);
      } catch (e) {
        console.error(`Failed to upload ${newImage.file.name}:`, e);

        setNewImages((prev) =>
          prev.map((image) =>
            image.id === newImage.id
              ? {
                  ...image,
                  isUploading: false,
                  error: "خطا در آپلود",
                }
              : image,
          ),
        );
      }
    });

    await Promise.all(uploadPromises);
    onUploadComplete?.();
  };

  const retryUpload = async (image: ImageFile) => {
    setNewImages((prev) =>
      prev.map((img) =>
        img.id === image.id
          ? { ...img, isUploading: true, error: undefined }
          : img,
      ),
    );

    try {
      const result = await uploadToServer(image.file);

      setNewImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                isUploading: false,
                isUploaded: true,
                uploadedUrl: result.url,
              }
            : img,
        ),
      );

      setTimeout(() => {
        setNewImages((prev) => prev.filter((img) => img.id !== image.id));
        fetchUploadedImages();
      }, 1500);
    } catch (e) {
      console.error(e);
      setNewImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? { ...img, isUploading: false, error: "خطا در آپلود" }
            : img,
        ),
      );
    }
  };

  const removeFromQueue = (imageId: string) => {
    setNewImages((prev) => {
      const image = prev.find((img) => img.id === imageId);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter((img) => img.id !== imageId);
    });
  };

  const deleteUploadedImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/complexes/images/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete image");

      setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (e) {
      console.error("Failed to delete image:", e);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const newImagesFiles = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        isUploading: true,
        isUploaded: false,
        url: URL.createObjectURL(file),
      }));

      setNewImages((prev) => [...prev, ...newImagesFiles]);
      handleUploadImages(newImagesFiles);
    },
    [complexId],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".avif", ".gif"],
    },
    maxFiles: 10,
    maxSize: maxSize,
    multiple: true,
  });

  useEffect(() => {
    return () => {
      newImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [newImages]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            گالری تصاویر
          </h3>
          <p className="text-sm text-text-secondary">
            تصاویر مجموعه را اضافه کنید
          </p>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 border-border-muted bg-bg-elevated transition-all",
            isDragActive && "border-accent-primary bg-accent-primary/5",
            "cursor-pointer hover:border-accent-primary/50",
            className,
          )}
        >
          <input {...getInputProps()} />
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

          {newImages.length > 0 && (
            <div className="flex flex-wrap gap-4 p-4 border-t border-border-muted">
              {newImages.map((image) => (
                <div key={image.id} className="relative group">
                  <Image
                    src={image.url}
                    alt={image.file.name}
                    width={200}
                    height={200}
                    className={cn(
                      "rounded-lg object-cover transition-all duration-300",
                      image.isUploading && "blur-sm scale-95",
                    )}
                  />

                  {image.isUploading && !image.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                    </div>
                  )}

                  {image.isUploaded && !image.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/40 rounded-lg animate-in fade-in duration-300">
                      <div className="bg-green-500 rounded-full p-2">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}

                  {image.error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/40 rounded-lg p-2">
                      <X className="h-8 w-8 text-white mb-1" />
                      <span className="text-xs text-white text-center mb-2">
                        {image.error}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            retryUpload(image);
                          }}
                        >
                          تلاش مجدد
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-white hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(image.id);
                          }}
                        >
                          حذف
                        </Button>
                      </div>
                    </div>
                  )}

                  {!image.isUploading && !image.isUploaded && (
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromQueue(image.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            تصاویر آپلود شده
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchUploadedImages}
            disabled={isLoadingGallery}
          >
            {isLoadingGallery ? "در حال بارگذاری..." : "به‌روزرسانی"}
          </Button>
        </div>

        {isLoadingGallery ? (
          <div className="flex items-center justify-center p-12 border-2 border-dashed border-border-muted rounded-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-primary/30 border-t-accent-primary" />
          </div>
        ) : uploadedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border-muted rounded-lg text-center">
            <Upload className="h-12 w-12 text-text-secondary mb-3" />
            <p className="text-text-secondary">هنوز تصویری آپلود نشده است</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="relative group aspect-square">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="rounded-lg object-cover"
                />

                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteUploadedImage(image.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                  <p className="text-xs text-white truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
