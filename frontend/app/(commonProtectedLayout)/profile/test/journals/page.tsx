import { History, PencilLine, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { journalSummaries } from "./data";

const getSummary = (slug: string) =>
  journalSummaries.find((entry) => entry.slug === slug);

export default function JournalsPage() {
  const featured = getSummary("whispers-of-the-northern-highlands");
  const side = getSummary("the-vertical-village");
  const venice = getSummary("midnight-in-venice");
  const tokyo = getSummary("electric-dreams");
  const iceland = getSummary("black-sand-solitude");
  const patagonia = getSummary("patagonian-silence");

  if (!featured || !side || !venice || !tokyo || !iceland || !patagonia) {
    return null;
  }

  return (
    <main className="lg:ml-72 min-h-screen p-8 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <section className="mb-16 flex flex-col lg:flex-row items-end gap-12">
          <div className="flex-1">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
              Personal Archives
            </span>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-on-surface leading-[0.9] mb-6">
              Travel Journal
            </h2>
            <p className="text-on-surface-variant body-lg max-w-xl leading-relaxed">
              A curated collection of moments, landscapes, and internal
              reflections gathered across forty-two borders. From the neon hum
              of Tokyo to the silent peaks of the Andes.
            </p>
          </div>
          <div className="hidden lg:block pb-2">
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">
                  142
                </span>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
                  Entries
                </span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">
                  8.4k
                </span>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
                  Photos
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Link
            href="/profile/test/journals/kyoto-silent-sunrise"
            className="md:col-span-8 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">
                    {featured.tag}
                  </span>
                  <span className="text-on-surface-variant text-xs font-medium">
                    {featured.dateLabel}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-on-surface tracking-tight">
                  {featured.title}
                </h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-on-surface-variant leading-relaxed line-clamp-2">
                {featured.excerpt}
              </p>
            </div>
          </Link>

          <Link
            href={`/profile/test/journals/${side.slug}`}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={side.image}
                alt={side.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  {side.locationLabel}
                </span>
                <h3 className="text-xl font-bold text-on-surface tracking-tight">
                  {side.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                {side.excerpt}
              </p>
            </div>
          </Link>

          <Link
            href={`/profile/test/journals/${venice.slug}`}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="aspect-4/3 relative overflow-hidden">
              <Image
                src={venice.image}
                alt={venice.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  {venice.dateLabel}
                </span>
                <h3 className="text-xl font-bold text-on-surface tracking-tight">
                  {venice.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                {venice.excerpt}
              </p>
            </div>
          </Link>

          <Link
            href={`/profile/test/journals/${tokyo.slug}`}
            className="md:col-span-4 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="aspect-4/3 relative overflow-hidden">
              <Image
                src={tokyo.image}
                alt={tokyo.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dim/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1 block">
                  {tokyo.locationLabel}
                </span>
                <h3 className="text-xl font-bold text-on-surface tracking-tight">
                  {tokyo.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                {tokyo.excerpt}
              </p>
            </div>
          </Link>

          <article className="md:col-span-4 bg-[#333638] rounded-3xl p-8 flex flex-col justify-center border border-outline-variant/10">
            <Quote className="text-primary mb-4 h-10 w-10" />
            <h3 className="text-xl font-medium text-on-surface italic leading-relaxed mb-6">
              "The goal is not to see everything, but to see one thing
              completely."
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
                <PencilLine className="text-primary h-4 w-4" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                Journaling Philosophy
              </span>
            </div>
          </article>

          <Link
            href={`/profile/test/journals/${iceland.slug}`}
            className="md:col-span-12 lg:col-span-5 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row h-full">
              <div className="sm:w-2/5 overflow-hidden relative min-h-52">
                <Image
                  src={iceland.image}
                  alt={iceland.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {iceland.dateLabel}
                </span>
                <h3 className="text-2xl font-bold text-on-surface tracking-tight mb-4">
                  {iceland.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {iceland.excerpt}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={`/profile/test/journals/${patagonia.slug}`}
            className="md:col-span-12 lg:col-span-7 group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low transition-all duration-300"
          >
            <div className="aspect-21/9 relative overflow-hidden">
              <Image
                src={patagonia.image}
                alt={patagonia.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-surface-dim/90 via-surface-dim/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center max-w-sm">
                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {patagonia.tag}
                </span>
                <h3 className="text-3xl font-bold text-on-surface tracking-tight mb-4">
                  {patagonia.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed hidden sm:block">
                  {patagonia.excerpt}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <Link
            href="/profile/test/journals/kyoto-silent-sunrise"
            className="px-8 py-3 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest transition-colors font-medium text-sm flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            Explore Older Archives
          </Link>
          <p className="text-on-surface-variant/40 text-[11px] font-medium tracking-widest uppercase">
            Showing 8 of 142 entries
          </p>
        </div>
      </div>
    </main>
  );
}
