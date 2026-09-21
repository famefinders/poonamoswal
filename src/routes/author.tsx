import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { ConnectBand } from "@/components/site/Page";

export const Route = createFileRoute("/author")({
  head: () => ({
    meta: [
      { title: "Books & Literary Publications — Poonamm B Oswal" },
      {
        name: "description",
        content:
          "Explore published books by Poonam Oswal, including ‘प्रकृति की गोद में’ and ‘जीवन के बहुरंग’. Uplifting Hindi literature available on Amazon and Kindle.",
      },
      { property: "og:title", content: "Poonamm B Oswal — Published Books & Works" },
      {
        property: "og:description",
        content:
          "Thought-provoking storytelling exploring nature, relationships, spiritual awakening, and inner peace. 4.5+ star rating on Amazon Kindle.",
      },
      { property: "og:image", content: "/author.jpg" },
      { property: "og:type", content: "books.author" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/author.jpg" },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const books = [
    {
      title: "‘प्रकृति की गोद में’",
      desc: "A soulful expression of harmony between human life and nature, encouraging readers to reconnect with the serenity and healing power of the natural world.",
      sub: "‘प्रकृति की गोद में’",
    },
    {
      title: "‘जीवन के बहुरंग’",
      desc: "A reflective collection exploring the many shades of life, emotions, relationships, and personal transformation, guiding readers toward positivity and deeper understanding.",
      sub: "‘जीवन के बहुरंग’",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* 1. Clean Title Hero Banner */}
      <section className="bg-background pb-8 pt-36 text-center sm:pt-40">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Author
          </h1>
        </div>
      </section>

      {/* 2. Author Banner Image Slot */}
      <section className="px-6 pb-12 sm:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-[#faf6f0] shadow-sm">
          <div className="relative aspect-[21/9] w-full min-h-[260px] sm:min-h-[380px] flex items-center justify-center">
            <img
              src="/author.jpg"
              alt="Poonam Oswal Author Banner"
              className="size-full object-cover object-center transition-transform duration-300 hover:scale-[1.01]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Main Books & Author Bio Section */}
      <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Header Row: Left Title & Right Rating */}
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

          {/* Full Detailed Author Description Paragraph */}
          <div className="mt-10 max-w-5xl text-[15px] leading-8 text-muted-foreground">
            <p>
              Poonam Oswal is a passionate author whose writings beautifully reflect the
              emotions, experiences, and deeper meanings of life. Through her words, she seeks
              to inspire readers to pause, reflect, and reconnect with themselves and the world
              around them. Her work blends thoughtful storytelling with philosophical insight,
              creating literature that resonates with readers who appreciate meaningful and
              uplifting writing. Her books explore themes of nature, human emotions,
              relationships, and personal transformation. In works like ‘प्रकृति की गोद में’, she
              highlights the peaceful connection between humans and nature, encouraging readers
              to rediscover the healing and harmony found in the natural world. In ‘जीवन के
              बहुरंग’, she captures the many shades of life, presenting reflections that guide
              readers toward positivity, self-understanding, and emotional growth. Through her
              writing, Poonam Oswal aims to create a space where readers can find inspiration,
              calmness, and a deeper understanding of life’s journey. Her books are appreciated
              for their thoughtful messages and relatable themes, making them meaningful companions
              for anyone seeking motivation, reflection, and a fresh perspective on life.
            </p>
          </div>

          {/* 2 Big Book Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {books.map((book) => (
              <div
                key={book.title}
                className="flex flex-col items-center justify-between rounded-3xl border border-border/70 bg-card p-10 text-center shadow-sm transition-all hover:shadow-md sm:p-14"
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

      {/* 4. Footer Connect Band */}
      <ConnectBand />
    </main>
  );
}