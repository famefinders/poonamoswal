import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ConnectBand } from "@/components/site/Page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Poonamm B Oswal — Former Joint Director, Author & Mentor" },
      {
        name: "description",
        content:
          "Discover Poonam Oswal's 40+ years journey across official language administration in Govt. of India, cultural mentorship, literature, and social upliftment.",
      },
      { property: "og:title", content: "About Poonamm B Oswal — Career, Values & Vision" },
      {
        property: "og:description",
        content:
          "Former Joint Director (Ministry of Home Affairs), acclaimed author of ‘प्रकृति की गोद में’, and compassionate life mentor.",
      },
      { property: "og:image", content: "/about-portrait-1.jpg" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/about-portrait-1.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const books = [
    {
      title: "‘प्रकृति की गोद से’",
      desc: "A soulful expression of harmony between human life and nature, encouraging readers to reconnect with the serenity and healing power of the natural world.",
      sub: "‘प्रकृति की गोद से’",
    },
    {
      title: "‘जीवन के बहुरंग’",
      desc: "A reflective collection exploring the many shades of life, emotions, relationships, and personal transformation, guiding readers toward positivity and deeper understanding.",
      sub: "‘जीवन के बहुरंग’",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* 1. TOP ABOUT HEADER & 3-COLUMN OVERVIEW */}
      <section className="bg-[#faf8f5] px-6 pb-20 pt-36 sm:px-10 sm:pb-28 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">
              ABOUT
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Poonam Oswal
            </h1>
            <p className="mt-4 text-base font-medium text-foreground/85 sm:text-lg">
              An Author, Social Worker, Actor, Dancer &amp; Voice Over Artist To Nurture Your Skills.
            </p>
          </div>

          {/* 3-Part Layout: Left Counters | Center Photo Slot | Right Narrative */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[auto_1fr_1.3fr] lg:gap-12">
            {/* Left Counters */}
            <div className="flex flex-row justify-around gap-6 border-b border-border/70 pb-8 sm:flex-col sm:border-b-0 sm:border-r sm:pb-0 sm:pr-10">
              <div>
                <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">
                  40<span className="text-[#c2410c]">+</span>
                </span>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Experience</p>
              </div>

              <div>
                <span className="font-display text-5xl font-bold text-foreground sm:text-6xl">
                  100<span className="text-[#c2410c]">+</span>
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

            {/* Center Image Slot 1: about-portrait-1.jpg */}
            <div className="flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md">
                <img
                  src="/about-portrait-1.jpg"
                  alt="Poonam Oswal Portrait"
                  className="size-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Narrative Paragraphs */}
            <div className="space-y-6 text-[15px] leading-8 text-muted-foreground sm:text-base">
              <p>
                Poonam Oswal is a distinguished educationist, administrator, poet, author, spiritual guide, and social contributor whose life reflects dedication, discipline, and devotion to nation-building. With an illustrious career in the Government of India and a deep commitment to cultural and spiritual values, she continues to inspire individuals across generations.
              </p>
              <p>
                Born on 6 June 1964, Poonam Oswal began her professional journey with the Department of Official Language under the Ministry of Home Affairs, Government of India. She served at the Central Hindi Training Institute, New Delhi, where she devoted over two decades to strengthening the implementation of the Official Language Policy of the Government of India. Her contribution to promoting Hindi in administrative and official communication has been both impactful and transformative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WE CAN HELP CHANGE YOUR LIFE */}
      <section className="border-t border-border/60 bg-background px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              We Can Help Change Your Life
            </h2>
            <p className="text-[15px] leading-8 text-muted-foreground sm:text-base">
              During her 40 years of service, she imparted Hindi software and Hindi word processing training to Central Government employees and officers, helping them adapt to technological advancements in official language usage. Her expertise bridged the gap between language policy and digital implementation, empowering government professionals with practical skills.
            </p>
          </div>

          {/* Middle Image Slot 2: about-banner.jpg */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md">
            <div className="relative aspect-[21/9] min-h-[300px] w-full sm:min-h-[420px]">
              <img
                src="/about-banner.jpg"
                alt="We Can Help Change Your Life"
                className="size-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAREER STARTS WITH */}
      <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Bottom Image Slot 3: about-portrait-2.jpg */}
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md">
              <div className="relative aspect-[4/3] min-h-[340px] w-full sm:min-h-[440px]">
                <img
                  src="/about-portrait-2.jpg"
                  alt="Career Starts With — As Former Joint Director"
                  className="size-full object-cover transition-transform duration-300 hover:scale-105"
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
                  In addition to her academic and training responsibilities, she held key administrative positions. She served for 9 years as Assistant Director and 6 years as Deputy Director from March 2016 to March 2022. From March 2022 to June 2024, she served as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024. In this role, she monitored and supervised official language training programs and policy implementation at various levels, ensuring compliance and quality standards.
                </p>
                <p>
                  Beyond her distinguished government service, Poonam Oswal has embraced a broader mission. She is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker. Through her writings, seminars, and public engagements, she promotes spiritual awareness, cultural values, women empowerment, and social harmony.
                </p>
                <p>
                  She has the ability and experience to organize seminars, workshops, and programs on diverse subjects including language policy, spirituality, leadership, personal growth, and social development. Poonam Oswal’s journey is a blend of administrative excellence, intellectual depth, and spiritual wisdom. Her work continues to inspire, guide, and uplift individuals and communities, making her a respected voice in both institutional and social spheres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POONAM OSWAL BOOKS SECTION */}
      <section className="border-t border-border/60 bg-background px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c2410c]">
                AS AUTHOR
              </p>
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

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {books.map((book) => (
              <div
                key={book.title}
                className="flex flex-col items-center justify-between rounded-3xl border border-border/70 bg-[#faf8f5] p-10 text-center shadow-sm transition-all hover:shadow-md sm:p-14"
              >
                <div className="flex flex-col items-center">
                  <span className="font-serif text-6xl font-bold leading-none text-[#f97316]/40 sm:text-7xl">
                    “
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {book.title}
                  </h3>
                  <p className="mt-6 max-w-md text-[15px] leading-8 text-muted-foreground">
                    {book.desc}
                  </p>
                </div>

                <span className="mt-12 text-sm font-semibold text-foreground/70">
                  {book.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER CONNECT BAND */}
      <ConnectBand />
    </main>
  );
}