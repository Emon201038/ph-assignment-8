import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock3,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalDetailBySlug, journalDetails } from "../data";

export function generateStaticParams() {
  return journalDetails.map((entry) => ({ slug: entry.slug }));
}

export default async function JournalDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalDetailBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="flex-1 lg:ml-64 px-8">
      <div className="mx-auto">
        <section className="relative h-217.5 w-auto overflow-hidden mb-4">
          <Image
            src={entry.heroImage}
            alt={entry.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full px-8 md:px-24 pb-20 max-w-7xl text-primary-foreground">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
                {entry.category}
              </span>
              <span className="text-on-surface-variant text-sm">•</span>
              <span className="text-on-surface-variant text-sm font-medium">
                {entry.date}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-none mb-6">
              {entry.heroTitle} <br />
              <span className="text-primary-foregroundr">
                {entry.heroAccent}
              </span>
            </h1>
            <div className="flex items-center gap-8 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary h-5 w-5" />
                <span className="text-lg">{entry.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="text-primary h-5 w-5" />
                <span className="text-lg">{entry.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-container">
                Conditions
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Weather</span>
                  <span className="text-on-surface font-medium">
                    {entry.conditions.weather}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Steps</span>
                  <span className="text-on-surface font-medium">
                    {entry.conditions.steps}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">
                    Elevation Gain
                  </span>
                  <span className="text-on-surface font-medium">
                    {entry.conditions.elevationGain}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-container">
                Featured Gear
              </p>
              <div className="flex flex-wrap gap-2">
                {entry.featuredGear.map((gear) => (
                  <span
                    key={gear}
                    className="px-3 py-1 rounded-full bg-surface-container-low text-xs text-on-surface-variant border border-outline-variant/15"
                  >
                    {gear}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-16">
            <div className="prose prose-invert prose-xl max-w-none">
              <p className="text-2xl leading-relaxed text-on-surface-variant first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary-container">
                {entry.intro}
              </p>
              <h2 className="text-4xl font-black tracking-tight text-on-surface pt-10 pb-4">
                {entry.sectionOneTitle}
              </h2>
              <p className="text-lg leading-loose text-on-surface-variant">
                {entry.sectionOneBody}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-16">
                {entry.gallery.map((item) => (
                  <div key={item.image} className={item.className}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-4xl font-black tracking-tight text-on-surface pt-10 pb-4">
                {entry.sectionTwoTitle}
              </h2>
              <p className="text-lg leading-loose text-on-surface-variant">
                {entry.sectionTwoBody}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-t border-outline-variant/10 gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-on-surface-variant uppercase tracking-tighter">
                  Tags:
                </span>
                <div className="flex gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-xs hover:bg-primary-container transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button className="p-3 rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-all group">
                  <Share2 className="text-on-surface-variant group-hover:text-primary h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-all group">
                  <Heart className="text-on-surface-variant group-hover:text-error h-5 w-5" />
                </button>
                <button className="p-3 rounded-full bg-surface-container-low hover:bg-surface-container-highest transition-all group">
                  <Bookmark className="text-on-surface-variant group-hover:text-primary h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
