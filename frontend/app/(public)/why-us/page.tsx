import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Compass,
  Earth,
  Globe,
  HeartHandshake,
  ShieldCheck,
  Star,
  UserCog,
} from "lucide-react";

export default function WhyUs() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-20 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">
              tour
            </span>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
              TourBuddy
            </h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-8">
              <Link
                href="/"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/tours"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
              >
                Tours
              </Link>
              <Link
                href="/guides"
                className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/why-us"
                className="text-primary text-sm font-bold border-b-2 border-primary leading-normal"
              >
                Why Us
              </Link>
            </nav>
            <div className="flex items-center gap-4 ml-4">
              <Button className="flex min-w-21 cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-opacity hover:opacity-90">
                Sign Up
              </Button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4mt0_5z2iEykl4Yej98M8PAxv7I0E-xwhcFN7TkNQH8Ty4hN0a5wlxpj2MtK6ePnrcJrNdA-rUpQu_wI9y2DWDio2J9mgfSCX_jrgWlnjv6b1nwwMxhwNpWmsxwCoctxC0rqt0ejdUCV9mn6sGcsyLIVGxA0zlX27AN2TCxSN0J6L6HKiZyaUfSzJ-KQblp6h6cdF4f3iS9Sdksat0yISU2KlpD67AxcQSjYoTsCZ1l5sEXMksqGmMlwcmf3EsNgZIKggFEAKWLc");',
                }}
              ></div>
            </div>
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-slate-900 dark:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full w-fit">
                  Authentic Travel
                </span>
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Why Choose TourBuddy?
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-[540px]">
                  We're more than just a booking platform. We're a community of
                  storytellers and explorers redefining what it means to truly
                  see the world.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Button className="flex min-w-40 cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:shadow-lg hover:-translate-y-0.5">
                    Find a Tour
                  </Button>
                  <Button className="flex min-w-40 cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold transition-all hover:bg-slate-300 dark:hover:bg-slate-700">
                    Become a Guide
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div
                  className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-slate-200"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbDV2Ux6Jn5F9FKZ83CVM9cdw4Qv6s2v9ysdUPS6Z5N1i7rASATcsRHhtXeDquAPVa_NYZ2-u2ozL9y3v5vqzSanaSrCS0eLY0lVSMnTGFKAcPohKdreqiR3Df2sbhyUMH_TEofm8xyTd7-51HlGhhfZ6rNUAXgENCUGIDgNwzF-73he7iNq5C2e76y01d00cIoe-SEiLPHmaXnxypflM46IqG7822eGPg_cygB6tHK0q3VhU6HqZn2eqrfFvzZFEXg5X7kWH-O1A")',
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div
                        className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0E3mg7UiIQJ04CDAsy7xvtWgI73QQog7gqagSi0buLHcy2-n0uehLX_sNrNXdv3ppAi4A5EfVpv24N7ljvLkhNa1Z0LH5bSjZTx4VpVvlPJHxGg6XchsqpuotJTUGWMT3Awz7II2gAsWGggoVEpry90f9QQx6M_CJnhJ9I9PdccPMW-Q5vDEXhWIaMfryhBErX_43ypIzrxgN1EjOsP3dNjteD3XznKd6ziyqpRhJS1KTLhynU6HRk7GS5-lIlPpo1a9B3vW3H68");',
                        }}
                      ></div>
                      <div
                        className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArS7Qfui2JSOFbpAv8mjCS7sPtQgIQ32WK0ust-ErhE-dxekhnOInM4az8gqBe1GDb9rlbMgOASqZLQfVhbELhuW0FW3TYLM4uSwMu5f28LDETfDX0PHFf9IsN_CHhFzEfsLN6VNuBOL11Kl5HwIjRBUdVIGvIvNPDCWrStR5jVr2MspwgrUo2hOgTiAdVoJG1c0r_NBmDThjIUIpSxy8_O57CT3KFTSyf3IEjNlLpLkWEJoKalri_G1COUxhJ8HmGfYUI84DyH5E");',
                        }}
                      ></div>
                      <div
                        className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-S9RDZTfLHaZoW3AJfnyepqAd6GNeeY_bBwdJSOrufVvkJoMfedTINShENHBBXpDcYeQR4Z0s5E1VDR9QVBr0lAD3Yn0nci564UMH3oKLfU899TO3WK2C7KTJNFUnTSxkG5UqhYTE-Z431r2BVBfLagQQqwwUJE17m4BP-2AEr9US7xFWQSc9WfYlVAhaJIiKuM2MaupzdilewvPLaQPNJ03rn7d4SZ7MCXzV8VsnZ2wR-glLEF4Ati3bgvtuL8792rZQchVLU74");',
                        }}
                      ></div>
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold text-sm">
                        Join 50k+ travelers
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        Exploring 120+ cities globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* The TourBuddy Difference */}
          <section className="bg-white dark:bg-slate-900/50 py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
              <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black mb-4">
                  The TourBuddy Difference
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  We've built our platform on three core pillars that ensure
                  every trip is meaningful, safe, and impactful.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group flex flex-col gap-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark transition-all hover:border-primary/50 hover:shadow-xl">
                  <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ShieldCheck className="text-3xl" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                      Verified Local Guides
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Every guide undergoes a rigorous background check and
                      vetting process to ensure expertise and safety.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark transition-all hover:border-primary/50 hover:shadow-xl">
                  <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Compass className="text-3xl" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                      Handpicked Experiences
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      We skip the tourist traps to show you the heart of the
                      city through hidden gems known only to locals.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-6 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark transition-all hover:border-primary/50 hover:shadow-xl">
                  <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <HeartHandshake className="text-3xl" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                      Fair Pay for Locals
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      We ensure our guides earn a living wage while doing what
                      they love, supporting local economies directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Our Mission Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
              <div className="bg-primary rounded-4xl p-8 md:p-16 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                  <Globe
                    size={320}
                    className="text-[20rem] absolute -right-20 -top-20"
                  />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-black mb-8">
                    Our Mission: Humanizing Global Travel
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10">
                    We believe that travel should be about more than just
                    sight-seeing; it's about life-seeing. Our mission is to
                    break down cultural barriers by fostering genuine human
                    connections between travelers and locals.
                  </p>
                  <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-10">
                    <div>
                      <div className="text-3xl md:text-4xl font-black mb-1">
                        120+
                      </div>
                      <div className="text-white/70 text-sm font-medium uppercase tracking-widest">
                        Cities Covered
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-black mb-1">
                        85%
                      </div>
                      <div className="text-white/70 text-sm font-medium uppercase tracking-widest">
                        Guide Retention
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Community Stories (Testimonials) */}
          <section className="bg-white dark:bg-slate-900/50 py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="max-w-xl">
                  <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black mb-4">
                    Community Stories
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Hear from the travelers who explored and the guides who
                    shared their worlds.
                  </p>
                </div>
                <Link
                  className="text-primary font-bold flex items-center gap-2 group"
                  href="#"
                >
                  Read all stories{" "}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Story 1 */}
                <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                  <div className="flex gap-1 text-yellow-400">
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg italic leading-relaxed">
                    "My guide Marco didn't just show me Rome; he showed me his
                    Rome. We ate at his favorite neighborhood trattoria and met
                    his friends. It felt like visiting an old friend."
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div
                      className="size-12 rounded-full bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBeUHC5sbzPr5Agb3npmODKeGWwXkdmYE6rRjxpgJ5aKrtUxDRK5LuPLfHubtx-mC441oaLLYeeC8SQ9_VJ0BPvSMG-3H86bHsQQ2Ypv2aCs5EXM3cCnch5u0tXVKUj-ft07CDVXi5rf0Ck0sMEOaIHRtJaAiUVZHNj8JrEvm_k-CLOIEC4AhpW1n56Ufe3CNXXywMsK1h8SHd5tA4GsAXwhMP4bzXRbQoOELMj6IyFqVhB8hLA56idWXzHEdrkGqr-VjQzXPw8gM");',
                      }}
                    ></div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold">
                        Sarah Jenkins
                      </h4>
                      <p className="text-slate-500 text-xs">
                        Traveler from Chicago
                      </p>
                    </div>
                  </div>
                </div>
                {/* Story 2 */}
                <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                  <div className="flex gap-1 text-yellow-400">
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg italic leading-relaxed">
                    "Being a TourBuddy guide allows me to share the history of
                    my ancestors while earning a fair income. It's changed how I
                    see my own city and my future."
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div
                      className="size-12 rounded-full bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDg3wxRTVPhgddenvWHj-yXnsVM7Y1Y7-SqSAPR9MjMW-h_8S20ijh3uq10IHaKP6Z5sV1vsLcBvei1BIePusjavcVyfQkXhRG6VPwjsMfR8--E0H4twVF20Wk69gOZWIpcxTNR08yk7r5ket42QxnaO6mFlHEut1IS6iNVLUQQW_Gxo1vKUHawOzNJQWfxBZF1s1FcQt6QrZtvAL3fBD9YteLjXf_4kUYyDWcCwflcxD-5F8uCSLDRYXCCFpiSYjNO6sBl_b0f95U");',
                      }}
                    ></div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold">
                        Ahmed Hassan
                      </h4>
                      <p className="text-slate-500 text-xs">Guide in Cairo</p>
                    </div>
                  </div>
                </div>
                {/* Story 3 */}
                <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                  <div className="flex gap-1 text-yellow-400">
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                    <Star className="fill-current" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg italic leading-relaxed">
                    "We booked a street food tour in Tokyo and it was the
                    highlight of our honeymoon. Our guide took us to places we
                    never would have found on our own."
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div
                      className="size-12 rounded-full bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZi2DWyKl9wQrK4i5XjWEgcPADM39mSiO_7O8Hq-zZSCvT_VKafkBJ7Cy2GGYAFFHax-aLuotz-CNQ-AO20vClgF0jrZNgVd9j_--eH4tQ5cfiFBd--0aAA9w2OztEwgyAlI-QW5DUq17DBB6RVcFRq-H-A9GHKqJlvyr1dlaqY9N4W6Z5GqnRhq_bQgtU0IyGxZWAY8MUcSuH3pIBOlyWmL8nNrnLuD2Abl72cRI14oLeRsoGrD26AmLH5qwd80xFgKBZAi4dng8");',
                      }}
                    ></div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold">
                        Chloe Kim
                      </h4>
                      <p className="text-slate-500 text-xs">
                        Traveler from Seoul
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Final CTA */}
          <section className="py-20 md:py-32 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-10 md:p-16 rounded-4xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-start gap-6">
                  <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <Earth />
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-3xl font-black">
                    Ready to explore?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Browse hundreds of unique tours led by locals in your next
                    destination.
                  </p>
                  <Button className="flex min-w-50 cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold transition-all hover:shadow-lg">
                    Start Exploring
                  </Button>
                </div>
                <div className="bg-slate-900 p-10 md:p-16 rounded-4xl shadow-sm flex flex-col items-start gap-6 relative overflow-hidden">
                  <div className="size-12 bg-white/10 text-white rounded-full flex items-center justify-center relative z-10">
                    <UserCog />
                  </div>
                  <h3 className="text-white text-3xl font-black relative z-10">
                    Become a guide
                  </h3>
                  <p className="text-slate-400 text-lg relative z-10">
                    Share your passion for your city and earn income on your own
                    schedule.
                  </p>
                  <Button className="flex min-w-50 cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-white text-slate-900 text-lg font-bold transition-all hover:bg-slate-100 relative z-10">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
