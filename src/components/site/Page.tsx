import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionTitle({ eyebrow, title, intro, align = "left" }: { eyebrow: string; title: string; intro?: string; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="font-display text-3xl leading-tight text-foreground sm:text-5xl">{title}</h2>
    {intro ? <p className="mt-5 leading-7 text-muted-foreground">{intro}</p> : null}
  </div>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <section className="paper-texture border-b border-border bg-secondary/60 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
    <div className="mx-auto max-w-6xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h1 className="max-w-4xl font-display text-4xl leading-[1.08] text-foreground sm:text-6xl">{title}</h1>
      {children ? <div className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div> : null}
    </div>
  </section>;
}

export function ConnectBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#2c0b3b] via-[#3d0f52] to-[#20072b] px-6 py-16 text-white sm:px-10 sm:py-20 border-b border-purple-300/15">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24]">
            BEGIN A CONVERSATION
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let wisdom become a shared journey.
          </h2>
        </div>
        <a
          href="/connect"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#20072b] shadow-xl transition-all hover:scale-105 hover:bg-[#fbbf24] hover:text-[#1e0728]"
        >
          Connect with Poonam <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}