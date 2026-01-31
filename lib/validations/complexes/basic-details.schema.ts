import { z } from "zod";

const basicDetailsSchema = z.object({
  complexName: z
    .string()
    .min(3, "نام مجموعه باید حداقل ۳ حرف باشد")
    .max(100, "نام مجموعه حداکثر ۱۰۰ حرف باشد")
    .trim(),

  complexEmail: z.string().email("ایمیل نامعتبر است").toLowerCase().trim(),

  complexPhone: z
    .string()
    .regex(
      /^(09\d{9}|0\d{2,3}\d{8})$/,
      "فرمت شماره تلفن: ۰۹۱۲۳۴۵۶۷۸۹ (موبایل) یا ۰۲۱۱۲۳۴۵۶۷۸ (ثابت)"
    )
    .trim(),

  complexNumber: z
    .string()
    .min(5, "شماره ثبت/ملی باید حداقل ۵ رقم باشد")
    .regex(/^\d+$/, "شماره ثبت فقط باید شامل اعداد باشد")
    .trim(),

  complexDescription: z
    .string()
    .min(20, "توضیحات باید حداقل ۲۰ حرف باشد")
    .max(1000, "توضیحات حداکثر ۱۰۰۰ حرف باشد")
    .trim(),

  complexAddress: z
    .string()
    .min(10, "آدرس باید حداقل ۱۰ حرف باشد")
    .max(300, "آدرس حداکثر ۳۰۰ حرف باشد")
    .trim(),

  complexCity: z
    .string()
    .min(2, "نام شهر باید حداقل ۲ حرف باشد")
    .max(50, "نام شهر حداکثر ۵۰ حرف باشد")
    .trim(),

  complexState: z
    .string()
    .min(2, "نام شهر باید حداقل ۲ حرف باشد")
    .max(50, "نام شهر حداکثر ۵۰ حرف باشد")
    .trim(),

  complexZipCode: z
    .string()
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .length(10, "کد پستی باید دقیقاً ۱۰ رقم باشد")
    .trim(),

  complexLatitude: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z
      .number({
        required_error: "عرض جغرافیایی الزامی است",
        invalid_type_error: "عرض جغرافیایی باید عدد باشد",
      })
      .min(25, "عرض جغرافیایی خارج از محدوده ایران است")
      .max(40, "عرض جغرافیایی خارج از محدوده ایران است")
  ),

  complexLongitude: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z
      .number({
        required_error: "طول جغرافیایی الزامی است",
        invalid_type_error: "طول جغرافیایی باید عدد باشد",
      })
      .min(44, "طول جغرافیایی خارج از محدوده ایران است")
      .max(64, "طول جغرافیایی خارج از محدوده ایران است")
  ),

  complexWebsite: z
    .string()
    .url("آدرس وبسایت نامعتبر است (مثال: https://example.com)")
    .optional()
    .or(z.literal("")),

  complexLogo: z.string().optional(),
});

export { basicDetailsSchema, IranianProvinces };
export type BasicDetailsFormData = z.infer<typeof basicDetailsSchema>;
