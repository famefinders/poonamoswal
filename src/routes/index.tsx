// import { createFileRoute, Link } from "@tanstack/react-router";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   AboutOverviewSection,
//   BooksHighlightSection,
//   CareerHighlightSection,
//   HeroSection,
//   PillarsSection,
// } from "@/components/site/Sections";
// import { ConnectBand } from "@/components/site/Page";
// import { useBio } from "@/lib/api";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "Poonamm B Oswal — Inspiring Lives Through Art, Words & Wisdom" },
//       {
//         name: "description",
//         content:
//           "Poonam Oswal — Former Joint Director (Govt. of India), Author, Poet, Actor, Dancer, Mentor and Social Worker.",
//       },
//       { property: "og:title", content: "Poonam Oswal — Art, Words & Wisdom" },
//       {
//         property: "og:description",
//         content:
//           "An Author, Social Worker, Actor, Dancer & Voice Over Artist To Nurture Your Skills.",
//       },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: Index,
// });

// function Index() {
//   // Ensure SSR context hydrates data properly without crashing
//   useBio();

//   return (
//     <main className="min-h-screen">
//       <HeroSection />
//       <PillarsSection />
//       <AboutOverviewSection />
//       <CareerHighlightSection />
//       <BooksHighlightSection />
//       <ConnectBand />
//     </main>
//   );
// }



import { createFileRoute } from "@tanstack/react-router";
import {
  AboutOverviewSection,
  BooksHighlightSection,
  CareerHighlightSection,
  HeroSection,
  PillarsSection,
} from "@/components/site/Sections";
import { ConnectBand } from "@/components/site/Page";
import { useBio } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poonamm B Oswal — Author, Poet, Social Worker & Thought Leader" },
      {
        name: "description",
        content:
          "Official portfolio of Poonam Oswal. Former Joint Director (Govt. of India), renowned Hindi author, poet, mentor, and dedicated social worker transforming lives through words and wisdom.",
      },
      { property: "og:title", content: "Poonamm B Oswal — Inspiring Lives Through Art, Words & Wisdom" },
      {
        property: "og:description",
        content:
          "Explore literary publications, cultural philosophy, humanitarian fieldwork, and mentorship by Poonam Oswal.",
      },
      { property: "og:image", content: "/portrait.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Poonamm B Oswal — Official Website" },
      {
        name: "twitter:description",
        content:
          "Author, poet, spiritual guide, and former Joint Director dedicated to national and social enrichment.",
      },
      { name: "twitter:image", content: "/portrait.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  useBio();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <PillarsSection />
      <AboutOverviewSection />
      <CareerHighlightSection />
      <BooksHighlightSection />
      <ConnectBand />
    </main>
  );
}