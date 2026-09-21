import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AstroBannerSection,
  BooksHighlightSection,
  PillarsSection,
} from "@/components/site/Sections";
import { ConnectBand } from "@/components/site/Page";

export const Route = createFileRoute("/art")({
  head: () => ({
    meta: [
      { title: "Art, Dance & Astrological Wisdom — Poonamm B Oswal" },
      {
        name: "description",
        content:
          "Immerse in the artistic dimension of Poonam Oswal — blending classical dance rhythm, dramatic expression, and cosmic astrological insights to awaken inner harmony.",
      },
      { property: "og:title", content: "Art, Acting & Classical Dance — Poonamm B Oswal" },
      {
        property: "og:description",
        content:
          "Expressing life through dance, acting, and cosmic arts. Consultations and artistic mentorship by Poonam Oswal.",
      },
      { property: "og:image", content: "/portrait.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/portrait.jpg" },
    ],
  }),
  component: ArtPage,
});

function ArtPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. DEDICATED ART HERO */}
      <section className="relative overflow-hidden bg-[#faf6f0] px-6 pb-20 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_auto_1fr] lg:gap-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c2410c]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#c2410c]">
                <Sparkles className="size-3.5" /> Art, Dance &amp; Performance
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Expressing Life <br />
                Through <span className="text-[#c2410c]">Dance,</span> <br />
                Acting &amp; <br />
                Cosmic Arts.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Blending the grace of classical rhythm, theatrical expression, and deep astrological intuition to awaken inner harmony and creative excellence.
              </p>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#7c3aed] px-8 py-6 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#6d28d9]"
                >
                  <Link to="/connect">
                    Consultation <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative flex size-72 items-center justify-center overflow-hidden rounded-full bg-[#fed7aa] shadow-xl sm:size-88 lg:size-96">
                <img
                  src="/portrait.jpg"
                  alt="Poonam Oswal — Artist & Dancer"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>

            <div className="flex flex-col items-start lg:pl-6">
              <span className="font-serif text-7xl font-bold leading-none text-[#a855f7]/40 sm:text-8xl">
                “
              </span>
              <blockquote className="-mt-4 font-display text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
                “Dance is the rhythm of consciousness, acting is the mirror of human emotion, and art is where the soul expresses its deepest truths.”
              </blockquote>
              <p className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#c2410c]">
                — Poonam Oswal (Astrologer, Actor &amp; Dancer)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <PillarsSection />

      {/* 3. About Section with 34+, 50+, 10+ */}
      <section className="border-t border-border/60 bg-[#fdfbf7] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">ABOUT</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Poonam Oswal
            </h2>
            <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
              An Author, Social Worker, Astrologer, Actor And Dancer To Nurture Your Skills.
            </p>
          </div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
            <div className="flex flex-row justify-around gap-8 border-b border-border/70 pb-8 sm:flex-col sm:border-b-0 sm:border-r sm:pb-0 sm:pr-14">
              <div>
                <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">
                  34<span className="text-[#c2410c]">+</span>
                </span>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Experience</p>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">
                  50<span className="text-[#c2410c]">+</span>
                </span>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Personal Mentored</p>
              </div>
              <div>
                <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">
                  10<span className="text-[#c2410c]">+</span>
                </span>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Certified</p>
              </div>
            </div>

            <div className="space-y-6 text-[15px] leading-8 text-muted-foreground">
              <p>
                Poonam Oswal is a distinguished educationist, administrator, poet, author, spiritual guide, and social contributor whose life reflects dedication, discipline, and devotion to nation-building. With an illustrious career in the Government of India and a deep commitment to cultural and spiritual values, she continues to inspire individuals across generations.
              </p>
              <p>
                Born on 6 June 1964, Poonam Oswal began her professional journey with the Department of Official Language under the Ministry of Home Affairs, Government of India. She served at the Central Hindi Training Institute, New Delhi, where she devoted over two decades to strengthening the implementation of the Official Language Policy of the Government of India.
              </p>
              <p>
                During her 34 years of service, she imparted Hindi software and Hindi word processing training to Central Government employees and officers, helping them adapt to technological advancements in official language usage. Her expertise bridged the gap between language policy and digital implementation, empowering government professionals with practical skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Highlight with about-portrait-1.jpg */}
      <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md">
              <div className="relative aspect-[4/3] min-h-[340px] w-full sm:min-h-[440px]">
                <img
                  src="/about-portrait-1.jpg"
                  alt="Career Starts With — Former Joint Director"
                  className="size-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">
                CAREER STARTS WITH
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                As Former Joint Director In Home Ministry, Govt. Of India
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-8 text-muted-foreground">
                <p>
                  In addition to her academic and training responsibilities, she held key administrative positions across a 24-year career, culminating as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024. She monitored and supervised official language training programs and policy implementation, ensuring compliance and quality standards.
                </p>
                <p>
                  Beyond her distinguished government service, Poonam Oswal has embraced a broader mission. She is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Achieve Your Dreams With Us */}
      <AstroBannerSection />

      {/* 6. Books Highlight */}
      <BooksHighlightSection />

      {/* 7. Connect Band */}
      <ConnectBand />
    </main>
  );
}