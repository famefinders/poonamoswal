import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, X, ZoomIn } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { ConnectBand } from "@/components/site/Page";

export const Route = createFileRoute("/social-worker")({
  head: () => ({
    meta: [
      { title: "Social Welfare & Humanitarian Work — Poonamm B Oswal" },
      {
        name: "description",
        content:
          "Grassroots community initiatives, women empowerment programs, education drives, and humanitarian service led by Poonam Oswal across Delhi and beyond.",
      },
      { property: "og:title", content: "Social Initiatives & Fieldwork — Poonamm B Oswal" },
      {
        property: "og:description",
        content:
          "“Helping one person might not change the world, but it could change the world for one person.” Discover 12+ community impact milestones.",
      },
      { property: "og:image", content: "/portrait.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/portrait.jpg" },
    ],
  }),
  component: SocialWorkerPage,
});

function SocialWorkerPage() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const galleryItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    imageSrc: `/social-${i + 1}.jpg`,
    title: `Community Initiative ${i + 1}`,
    description: `Grassroots welfare drive and social upliftment program led by Poonam Oswal.`,
  }));

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
  }, [galleryItems.length]);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
    );
  }, [galleryItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  const activeItem = activeImageIndex !== null ? galleryItems[activeImageIndex] : null;

  return (
    <main className="min-h-screen bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#faf6f0] px-6 pb-20 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_auto_1fr] lg:gap-10">
            <div>
              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                “Be The <br />
                Reason <br />
                <span className="text-[#c2410c]">Someone</span> <br />
                Believes In <br />
                Goodness.”
              </h1>
            </div>

            {/* Center Circular Photo */}
            <div className="flex justify-center">
              <div className="relative flex size-72 items-center justify-center overflow-hidden rounded-full bg-[#fed7aa] shadow-xl sm:size-88 lg:size-96">
                <img
                  src="/portrait.jpg"
                  alt="Poonam Oswal — Social Worker"
                  className="size-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Right Quote */}
            <div className="flex flex-col items-start lg:pl-6">
              <span className="font-serif text-7xl font-bold leading-none text-[#a855f7]/40 sm:text-8xl">
                “
              </span>
              <blockquote className="-mt-4 font-display text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
                “Helping one person might not change the world, but it could change the world for one person.”
              </blockquote>
              <p className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#c2410c]">
                — Poonam Oswal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="border-t border-border/60 bg-[#fdfbf7] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">ABOUT</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Poonam Oswal
          </h2>
          <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
            An Author, Social Worker, Actor And Dancer To Nurture Your Skills.
          </p>

          <p className="mt-10 text-left text-[15px] leading-8 text-muted-foreground sm:text-center sm:text-base">
            Poonam Oswal is a dedicated social worker committed to uplifting communities and creating meaningful change. With a compassionate heart and a strong sense of responsibility, she actively works towards supporting the underprivileged, promoting education, and empowering women. Her efforts focus on bringing awareness, providing resources, and encouraging self-reliance among those in need. Poonam believes that small acts of kindness can lead to big transformations in society. Through her consistent work and inspiring approach, she motivates others to contribute towards social welfare. Her journey reflects true humanity, leadership, and a vision for building a more inclusive and caring society for future generations.
          </p>
        </div>
      </section>

      {/* 3. 12 IMAGE GALLERY GRID */}
      <section className="border-t border-border/60 bg-background px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#c2410c]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#c2410c]">
              <Heart className="size-3.5 fill-[#c2410c]" /> Social Initiatives &amp; Fieldwork
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Moments of Service &amp; Impact
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click any picture to expand in high-definition preview
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveImageIndex(index)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-[#faf6f0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <ZoomIn className="size-6 text-[#9333ea]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL DIALOG */}
      {activeItem && activeImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-5 top-5 z-50 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 active:scale-95"
            aria-label="Close preview"
          >
            <X className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 active:scale-95 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 active:scale-95 sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="size-7" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] max-w-4xl flex-col items-center overflow-hidden rounded-3xl bg-[#1e0728] p-4 text-white shadow-2xl border border-purple-400/20 sm:p-6"
          >
            <div className="relative flex max-h-[65vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black/40">
              <img
                src={activeItem.imageSrc}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="mt-4 flex w-full items-center justify-between px-2">
              <div className="text-left">
                <h4 className="font-display text-lg font-bold text-white">
                  {activeItem.title}
                </h4>
                <p className="text-xs text-purple-200/75">
                  {activeItem.description}
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#fbbf24]">
                {activeImageIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. FOOTER CONNECT BAND */}
      <ConnectBand />
    </main>
  );
}