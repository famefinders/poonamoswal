import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Compass,
  Feather,
  MapPin,
  Monitor,
  Play,
  Quote,
  Sparkles,
  Sprout,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  biography,
  books as staticBooks,
  career,
  gallery as staticGallery,
  hero,
  poetry,
  services as staticServices,
  socialIntro,
  stats,
} from "@/data/site";
import { SectionTitle } from "./Page";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Sprout,
  BookOpen,
  Feather,
  Sparkles,
  Monitor,
  Users,
  Award,
};

/* =========================================================================
   1. FRONT PAGE / HERO SECTION (Original Elementor Style)
   ========================================================================= */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] px-6 pb-20 pt-36 sm:px-10 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_auto_1fr] lg:gap-10">
          <div>
            <h1 className="font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Inspiring Lives <br />
              Through <span className="text-[#c2410c]">Art,</span> <br />
              Words &amp; <br />
              Wisdom.
            </h1>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#7c3aed] px-8 py-6 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#6d28d9]"
              >
                <Link to="/about">
                  Poonam Oswal <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative flex size-72 items-center justify-center overflow-hidden rounded-full bg-[#fed7aa] shadow-xl sm:size-88 lg:size-96">
              <img
                src="/portrait.jpg"
                alt="Poonam Oswal"
                className="size-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex flex-col items-start lg:pl-6">
            <span className="font-serif text-7xl font-bold leading-none text-[#a855f7]/40 sm:text-8xl">
              “
            </span>
            <blockquote className="-mt-4 font-display text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
              “{hero.quote}”
            </blockquote>
            <p className="mt-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#c2410c]">
              — {hero.attribution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   2. CORE PILLARS (Mentoring, Consulting, Successful Careers)
   ========================================================================= */
export function PillarsSection() {
  const pillars = [
    {
      title: "Mentoring",
      icon: Monitor,
      color: "bg-[#8b5cf6]",
      desc: "Poonam Oswal believes true mentoring transforms both mindset and direction. She guides individuals with compassion, clarity, and practical wisdom drawn from her diverse journey. Through personalized support, she empowers people to discover their strengths, overcome self-doubt, and confidently walk their unique path toward personal growth and meaningful success.",
    },
    {
      title: "Consulting",
      icon: Users,
      color: "bg-[#f59e0b]",
      desc: "With deep experience across creative, social, and personal development spaces, Poonam Oswal offers insightful consulting rooted in strategy and intuition. She helps individuals and organizations gain clarity, strengthen their vision, and align actions with purpose. Her guidance blends practical solutions with thoughtful perspective for sustainable impact.",
    },
    {
      title: "Successful Careers",
      icon: Award,
      color: "bg-[#6366f1]",
      desc: "Poonam Oswal inspires individuals to build careers driven by passion and purpose. She emphasizes skill development, confidence building, and conscious decision-making as pillars of success. By nurturing creativity and resilience, she supports aspiring professionals in shaping rewarding careers that reflect their values and create lasting influence.",
    },
  ];

  return (
    <section className="bg-background px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-3xl border border-border/80 bg-card p-8 text-center shadow-sm transition-all hover:shadow-md sm:p-10"
              >
                <div className={`flex size-16 items-center justify-center rounded-full ${item.color} text-white shadow-md`}>
                  <Icon className="size-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. ABOUT SECTION & STATS
   ========================================================================= */
function Counter({
  value,
  suffix,
  label,
  word,
}: {
  value: number;
  suffix?: string;
  label: string;
  word?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(value);
        } else {
          const started = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - started) / 1100, 1);
            setCount(Math.round(value * progress));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-l-2 border-[#c2410c]/40 pl-5">
      <strong className="block font-display text-4xl text-foreground sm:text-5xl">
        {word ?? count}
        {word ? "" : suffix}
      </strong>
      <span className="mt-1.5 block text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function AboutOverviewSection() {
  return (
    <section className="border-t border-border/60 bg-[#fdfbf7] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">ABOUT</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Poonam Oswal
          </h2>
          <p className="mt-4 text-base font-medium text-foreground/80 sm:text-lg">
            An Author, Social Worker, Actor, Dancer &amp; Voice Over Artist To Nurture Your Skills.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="flex flex-row justify-around gap-8 border-b border-border/70 pb-8 sm:flex-col sm:border-b-0 sm:border-r sm:pb-0 sm:pr-14">
            <div>
              <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">40<span className="text-[#c2410c]">+</span></span>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Experience</p>
            </div>
            <div>
              <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">100<span className="text-[#c2410c]">+</span></span>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Personal Mentored</p>
            </div>
            <div>
              <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">10<span className="text-[#c2410c]">+</span></span>
              <p className="mt-1 text-sm font-medium text-muted-foreground">Certified</p>
            </div>
          </div>

          <div className="space-y-6 text-[15px] leading-8 text-muted-foreground">
            {biography.slice(0, 3).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <SectionTitle
            eyebrow="A life of purpose"
            title="Service grounded in wisdom and compassion"
          />
          <div className="space-y-5 text-[1.02rem] leading-8 text-muted-foreground">
            {(full ? biography : biography.slice(0, 2)).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {!full ? (
              <Button asChild variant="link" className="px-0 text-primary font-medium">
                <Link to="/about">
                  Read her full journey <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   4. CAREER SECTION (With Image Banner Support)
   ========================================================================= */
export function CareerHighlightSection() {
  return (
    <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md">
            <div className="relative aspect-[4/3] min-h-[340px] w-full sm:min-h-[440px]">
              <img
                src="/about-banner.jpg"
                alt="Career Starts With — Former Joint Director In Home Ministry, Govt. Of India"
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
            <div className="mt-6 space-y-5 text-[15px] leading-8 text-muted-foreground">
              <p>{career.body}</p>
              <p>
                Beyond her distinguished government service, Poonam Oswal has embraced a broader mission. She is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareerSection() {
  return (
    <section className="bg-accent px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[auto_1fr] lg:gap-16">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Award className="size-7" />
        </div>
        <div>
          <SectionTitle eyebrow="Career highlight" title={career.title} />
          <p className="mt-6 max-w-3xl leading-8 text-muted-foreground">
            {career.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. SERVICES SECTION
   ========================================================================= */
export function ServicesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Guidance & growth"
          title="We Can Help Change Your Life"
          align="center"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {staticServices.map((service, index) => {
            const Icon =
              (typeof service.icon === "string"
                ? iconMap[service.icon]
                : service.icon) || Compass;
            return (
              <article
                key={service.title}
                className="group bg-background p-8 sm:p-10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="size-8 text-primary" />
                  <span className="font-display text-2xl text-muted-foreground/35">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-foreground">
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   6. BOOKS SECTION
   ========================================================================= */
export function BooksHighlightSection() {
  return (
    <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">AS AUTHOR</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-foreground sm:text-5xl">
              Poonam Oswal Books
            </h2>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="text-sm font-semibold text-foreground">
              4.5 Rating On Kindle Edition Books
            </span>
            <div className="mt-1 flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-amber-500" />
              ))}
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              Poonam Oswal Books Available on Amazon
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {staticBooks.slice(0, 2).map((book) => (
            <div
              key={book.title}
              className="flex flex-col items-center rounded-3xl border border-border/80 bg-card p-10 text-center shadow-sm"
            >
              <Quote className="size-12 text-[#f97316]/50" />
              <h3 className="mt-6 font-display text-3xl font-bold text-foreground">
                ‘{book.title}’
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-8 text-muted-foreground">
                {book.description}
              </p>
              <span className="mt-8 text-xs font-semibold text-foreground/60">
                {book.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BooksSection({ full = false }: { full?: boolean }) {
  return (
    <section className="bg-secondary/65 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Published works"
          title="As Author — Poonam Oswal Books"
          intro="Poetry and prose that invite reflection, healing, and a deeper kinship with life."
        />
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {staticBooks.map((book) => (
            <article key={book.title} className="group">
              <div
                className={`book-cover book-cover-${book.tone} relative aspect-[4/5] overflow-hidden rounded-md p-7 shadow-lg`}
              >
                <span className="text-xs uppercase tracking-[0.18em] text-foreground/65">
                  Poonam Oswal
                </span>
                <div className="absolute inset-x-7 bottom-8">
                  <BookOpen className="mb-5 size-6 text-primary" />
                  <h3 className="font-display text-3xl leading-tight text-foreground">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {book.type}
                  </p>
                </div>
                {book.badge ? (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    {book.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {book.description}
              </p>
            </article>
          ))}
        </div>
        {!full ? (
          <Button asChild variant="outline" className="mt-10">
            <Link to="/author">
              Explore her writing <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

/* =========================================================================
   7. GALLERY & POETRY SECTIONS
   ========================================================================= */
export function GallerySection({ full = false }: { full?: boolean }) {
  const items = full ? staticGallery : staticGallery.slice(0, 4);

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="In the community"
          title="A life of meaningful engagement"
          intro={socialIntro}
        />
        <div className="mt-12 grid auto-rows-[180px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`gallery-tile gallery-${index + 1} relative overflow-hidden rounded-md p-6 ${item.size === "tall" ? "row-span-2" : ""} ${item.size === "wide" ? "sm:col-span-2" : ""}`}
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 pt-16 text-background">
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-1 text-xs opacity-75">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        {!full ? (
          <Button asChild variant="outline" className="mt-10">
            <Link to="/social-worker">
              View social journey <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export function PoetSection({ full = false }: { full?: boolean }) {
  return (
    <section className="ink-texture bg-foreground px-5 py-20 text-background sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="The poet within"
          title="Words that listen to life"
          intro="Her poetry finds the sacred in ordinary moments — in nature, memory, relationships, and the inner journey."
        />
        <div
          className={`mt-12 grid gap-8 ${full ? "md:grid-cols-3" : "md:grid-cols-[1.2fr_.8fr]"}`}
        >
          {(full ? poetry : poetry.slice(0, 2)).map((item, index) => (
            <blockquote
              key={index}
              className="border-l border-background/25 pl-7"
            >
              <Quote className="mb-5 size-6 text-rose" />
              <p className="font-display text-2xl leading-relaxed sm:text-3xl">
                “{item.text}”
              </p>
              <footer className="mt-5 text-xs uppercase tracking-[0.18em] text-background/55">
                {item.label}
              </footer>
            </blockquote>
          ))}
        </div>
        {!full ? (
          <Button asChild variant="secondary" className="mt-12">
            <Link to="/poet">
              Enter the poetry room <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}

export function MediaPanel() {
  return (
    <div className="relative overflow-hidden rounded-md border border-primary/20 bg-accent p-4 shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <img
          src="/portrait.jpg"
          alt="Poonam Oswal"
          className="size-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 pt-24 text-background">
          <p className="font-display text-2xl">Poonam Oswal</p>
          <p className="mt-1 text-xs opacity-70">
            Author, Poet &amp; Social Worker
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4 rounded-sm bg-background p-4">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Play className="ml-0.5 size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Watch her story
          </p>
          <p className="text-xs text-muted-foreground">
            YouTube conversation · Coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

export function LocationNote() {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <MapPin className="size-4 text-primary" /> New Delhi, India
    </div>
  );
}

/* =========================================================================
   8. ASTRO BANNER (Achieve Your Dreams With Us)
   ========================================================================= */
export function AstroBannerSection() {
  return (
    <section className="bg-[#604263] px-6 py-24 text-center text-white sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
          Achieve Your Dreams With Us
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
          As an astrologer, offers intuitive guidance rooted in wisdom and spirituality, helping individuals gain clarity, balance energies, and align life decisions with cosmic harmony.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#8b5cf6] px-8 py-6 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#7c3aed]"
          >
            <Link to="/connect">
              Astro Consultation <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/80 bg-white px-8 py-6 text-sm font-semibold uppercase tracking-wider text-[#604263] shadow-md transition-transform hover:scale-105 hover:bg-white/90"
          >
            <Link to="/about">
              More Info <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}