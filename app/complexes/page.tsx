"use client";

import Container from "@/components/comon/container";
import Filters from "@/components/owner/complexes/filters";
import ComplexCard from "@/components/owner/complexes/complex-card";
import EmptyComplexCard from "@/components/owner/complexes/empty-complex-card";

const SAMPLE_COMPLEXES = [
  {
    id: 1,
    title: "مجموعه ورزشی استقلال",
    location: "تهران، سعادت آباد",
    bookingsToday: 12,
    resourcesCount: 8,
    status: "active" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1544105355-8b7111a5b9b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "آکادمی تنیس ناصر",
    location: "تهران، ولنجک",
    bookingsToday: 5,
    resourcesCount: 4,
    status: "active" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "باشگاه فوتبال پارسه",
    location: "تهران، پاسداران",
    bookingsToday: 0,
    resourcesCount: 2,
    status: "inactive" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ComplexPage() {
  const hasComplexes = SAMPLE_COMPLEXES.length > 0;

  return (
    <Container className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-text-primary">
          مدیریت مجموعه‌ها
        </h1>
        <p className="text-text-secondary">
          مجموعه‌های ورزشی خود را در این بخش مدیریت و ویرایش کنید.
        </p>
      </div>

      <Filters totalCount={SAMPLE_COMPLEXES.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {!hasComplexes ? (
          SAMPLE_COMPLEXES.map((complex) => (
            <ComplexCard
              key={complex.id}
              title={complex.title}
              location={complex.location}
              bookingsToday={complex.bookingsToday}
              resourcesCount={complex.resourcesCount}
              status={complex.status}
              imageUrl={complex.imageUrl}
            />
          ))
        ) : (
          <EmptyComplexCard className="lg:col-start-2" />
        )}
      </div>
    </Container>
  );
}
