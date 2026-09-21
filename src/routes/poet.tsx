import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Feather, Sparkles } from "lucide-react";
import { ConnectBand } from "@/components/site/Page";

export const Route = createFileRoute("/poet")({
  head: () => ({
    meta: [
      { title: "Poet & Literary Journey — Poonamm B Oswal" },
      {
        name: "description",
        content:
          "Soulful Hindi poetry, literary reflections, and verses exploring nature, human emotions, and spiritual awakening by Poonamm B Oswal.",
      },
    ],
  }),
  component: PoetPage,
});

function PoetPage() {
  const poems = [
    {
      title: "प्रकृति की पुकार",
      excerpt:
        "हरी भरी वादियों में गूँजती हवा की तान,\nशांत सरिताओं में बहता जीवन का गान।\nपेड़ों की छांव में छुपा सुकून का जहां,\nप्रकृति सिखाती हमें निस्वार्थ प्रेम का बयान।",
      theme: "Nature & Serenity",
    },
    {
      title: "जीवन के रंग",
      excerpt:
        "धूप छाँव सा सफ़र, कभी हर्ष कभी क्रंदन,\nहर पल में छिपा है जीवन का सुंदर स्पंदन।\nरिश्तों की डोर को स्नेह से जब सींचते हैं,\nहर कठिनाई बन जाती है भक्ति का वंदन।",
      theme: "Life & Inner Reflection",
    },
    {
      title: "आत्मबोध",
      excerpt:
        "बाहर की खोज में भटके कितने युग,\nभीतर ही छिपा था अनंत शांति का सुख।\nमौन की गहराई में जब उतरता है मन,\nखुल जाते हैं ज्ञान और अध्यात्म के नयन।",
      theme: "Spiritual Awakening",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* 1. HERO SECTION (2-Column with Right Image) */}
      <section className="relative overflow-hidden bg-[#faf6f0] px-6 pb-20 pt-36 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Side: Poetry Title & Subtitle */}
            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#9333ea]">
                <Feather className="size-3.5" /> Kavyanjali &amp; Literary Expressions
              </span>

              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                शब्‍दों की साधना, <br />
                <span className="text-[#9333ea]">आत्‍मा की अनुभूति</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A poetic journey celebrating the harmony between nature, heartfelt emotions, and spiritual introspection through expressive Hindi poetry.
              </p>
            </div>

            {/* Right Side: Image Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-border/70 bg-[#faf6f0] shadow-md sm:aspect-square sm:max-w-lg">
                <img
                  src="/poet.jpg"
                  alt="Poonam Oswal — Poet"
                  className="size-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POETRY COLLECTION CARDS */}
      <section className="bg-background px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Selected Verses &amp; Reflections
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Excerpts from literary works and poetic collections
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {poems.map((poem, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-border/70 bg-[#faf8f5] p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-10"
              >
                <div>
                  <span className="inline-block rounded-full bg-orange-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-700">
                    {poem.theme}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                    {poem.title}
                  </h3>
                  <div className="mt-6 border-l-2 border-[#9333ea]/40 pl-4">
                    <p className="whitespace-pre-line font-serif text-[15px] italic leading-relaxed text-foreground/80">
                      {poem.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[#9333ea]">
                  <Sparkles className="size-3.5" /> पूनम ओसवाल
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LITERARY INFLUENCE & PHILOSOPHY */}
      <section className="border-t border-border/60 bg-[#fdfbf7] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-[#9333ea] mb-6">
            <BookOpen className="size-7" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            The Philosophy of Words
          </h2>
          <p className="mt-6 text-[15px] leading-8 text-muted-foreground sm:text-base">
            Poetry for Poonam Oswal is not merely rhyme; it is a sacred medium to touch human consciousness. Rooted in deep observations of human relationships, environmental connection, and Indian cultural values, her verses inspire inner calmness, hope, and compassion in a fast-paced modern world.
          </p>
        </div>
      </section>

      {/* 4. FOOTER CONNECT BAND */}
      <ConnectBand />
    </main>
  );
}