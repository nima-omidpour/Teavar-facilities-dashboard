"use client";
import Media from "@/components/owner/complexes/add/Media";
import GeneralInfo from "@/components/owner/complexes/add/general-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function AddComplexPage() {
  return (
    <div className="p-8 space-y-8 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-text-primary">
          پروفایل مجموعه ورزشی
        </h1>
        <p className="text-text-secondary">
          اطلاعات و ویژگی‌های مجموعه خود را در این بخش مدیریت کنید.
        </p>
      </div>

      <Tabs dir="rtl" defaultValue="general-info">
        <TabsList className="mb-8 ">
          <TabsTrigger className="cursor-pointer" value="general-info">
            اطلاعات عمومی
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="media">
            تصویر
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="amenities">
            امکانات
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="pricing">
            قیمت
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general-info">
          <GeneralInfo />
        </TabsContent>
        <TabsContent value="media">
          <Media />
        </TabsContent>
      </Tabs>
    </div>
  );
}
