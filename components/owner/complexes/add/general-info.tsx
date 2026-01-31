"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicDetailsSchema } from "@/lib/validations/complexes/basic-details.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Info, MapPin } from "lucide-react";
import CardWrapper from "@/components/comon/card-wrapper";
import CardHeader from "@/components/comon/card-header";

export default function GeneralInfo() {
  const form = useForm({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      complexName: "",
      complexEmail: "",
      complexPhone: "",
      complexNumber: "",
      complexDescription: "",
      complexAddress: "",
      complexCity: "",
      complexState: "",
      complexZipCode: "",
      complexLatitude: 0,
      complexLongitude: 0,
      complexWebsite: "",
      complexLogo: "",
    },
  });

  function onSubmit(data: any) {
    console.log("Submitting:", data);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardWrapper>
            <CardHeader
              icon={<Info />}
              title="اطلاعات پایه"
              description="این اطلاعات در صفحه عمومی مجموعه شما نمایش داده خواهد شد."
            />

            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="complexName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام مجموعه</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="مثال: مجموعه ورزشی پاسارگاد"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="complexEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل تماس</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complexPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تماس</FormLabel>
                      <FormControl>
                        <Input placeholder="۰۹۱۲۳۴۵۶۷۸۹" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="complexDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات مجموعه</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="درباره خدمات و ویژگی‌های مجموعه خود بنویسید..."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-between mt-1">
                      <FormMessage />
                      <span className="text-[10px] text-text-secondary font-medium">
                        {field.value?.length || 0} / ۱۰۰۰ حرف
                      </span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardWrapper>

          <CardWrapper>
            <CardHeader
              icon={<MapPin />}
              title="موقعیت مکانی"
              description="مشتریان کجا می‌توانند شما را پیدا کنند؟"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="complexAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>آدرس دقیق</FormLabel>
                      <FormControl>
                        <Input placeholder="خیابان، کوچه، پلاک..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="complexCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شهر</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: تهران" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complexZipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کد پستی</FormLabel>
                        <FormControl>
                          <Input placeholder="۱۰ رقم" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="complexState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>استان</FormLabel>
                      <FormControl>
                        <Input placeholder="نام استان" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative min-h-[300px] w-full rounded-2xl border border-border-muted overflow-hidden bg-bg-elevated/50 group">
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 z-10 bg-bg-main/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 bg-bg-card rounded-full border border-border-muted shadow-lg">
                    <MapPin className="h-6 w-6 text-accent-primary animate-bounce" />
                  </div>
                  <p className="text-xs font-bold text-text-primary bg-bg-card px-3 py-1.5 rounded-lg border border-border-muted shadow-sm">
                    برای انتخاب روی نقشه کلیک کنید
                  </p>
                </div>
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/45,34,5,0/600x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.09d892019-20f')] bg-cover bg-center grayscale contrast-125" />
              </div>
            </div>
          </CardWrapper>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="px-12 h-12 text-lg font-bold rounded-xl shadow-lg shadow-accent-primary/20 transition-all active:scale-95"
            >
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
