export type JournalSummary = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  dateLabel: string;
  locationLabel?: string;
  tag?: string;
  featured?: boolean;
};

export type JournalDetail = {
  slug: string;
  category: string;
  date: string;
  heroTitle: string;
  heroAccent: string;
  heroImage: string;
  heroImageAlt: string;
  location: string;
  readTime: string;
  conditions: {
    weather: string;
    steps: string;
    elevationGain: string;
  };
  featuredGear: string[];
  intro: string;
  sectionOneTitle: string;
  sectionOneBody: string;
  gallery: Array<{
    image: string;
    alt: string;
    className: string;
  }>;
  sectionTwoTitle: string;
  sectionTwoBody: string;
  tags: string[];
  previous: {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  next: {
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
};

export const journalSummaries: JournalSummary[] = [
  {
    slug: "whispers-of-the-northern-highlands",
    title: "Whispers of the Northern Highlands",
    excerpt:
      "The mist does not just hang in Sapa; it breathes. We spent three days navigating the vertical emerald staircases of the rice terraces, guided by a Hmong elder who spoke in rhythms rather than sentences...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCE90MAWXQZJ7iMiLvmqmFEoed-_zD5WbqL7-NIWvkiE671RHBkELCzDPuAqFvDsGG8S9deJeVUyleKaNVPXZakyFPch_XaKwIUrkY5a7T0Z_t_iUUjNLnWQ0f2X0njzqQOOMLtwqmOabmMdslGW8TkPD27W8IVWmgtR-DiXxfY-B6NCbTJg_wGxWdzZXSaUu8fzrVrisDJK7PBWRMt_mT1ZlNrcaPB97rjgGMvGKxcDF_SZvQ7wfBG0vy2RTNCuvIof_jOmvFBwlA",
    imageAlt:
      "Misty sunrise over terraced rice fields in Vietnam with golden light filtering through mountain peaks",
    dateLabel: "October 12, 2023",
    tag: "Featured Expedition",
    featured: true,
  },
  {
    slug: "the-vertical-village",
    title: "The Vertical Village",
    excerpt:
      "Escaping the crowds of Florence for the steep stairways of Vernazza. Every corner smells of sea salt and lemon zest.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2sldYV4rz67mpiDrS9Ayj4Wq14Lvn2keo_YSVv0fPYJNdfNC-ZFh8KWM2hh3hHocWt7sT7tSrr_dZp5HAdsoh0tmBqQPZ9xC-B0ayRuA8u_EaMBUyqNI_ntu8f3HbLtSBEdiU6eeOjBDQYjD1z-UNI2VOt0orPZq7FfEG-_Z2j1ifmD87ecMLgeBlwgnbI8F3InizX9oO2c3-0Rj92FzT_Oo0nBgxkofZF7DHKV061my0LBoUca4qR6bcuQAUHkrIurKbSORqPDc",
    imageAlt:
      "Vibrant colorful houses of Cinque Terre perched on a rugged cliff overlooking the Mediterranean",
    dateLabel: "Italy",
    locationLabel: "Italy",
  },
  {
    slug: "midnight-in-venice",
    title: "Midnight in Venice",
    excerpt:
      "When the tourists retreat, the city belongs to the water and the shadows...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPmNCUJnzdentkB_Oopuc_aWjXf1GlzqIUj-bp7eghaH310yhGZFHcouyTQ4qtY80H8w6qmPf6QlgSvQ9kYm7wi41UfAGfaP-Ytfroirrbcwuc764KF5KmXhFOwCIbal1uvob2BYC1qmQj863xkae5YaYLuKhCcfNXOsIhd0E1N1CPa2PhrHYhhHDwdIPKuzyBWlQocsPD71siKMK5dmmR96vNZCl372G63SzPzPZ8mYrVb65HjncDMVhiPxDC_bKt1iaUYY0_A5o",
    imageAlt:
      "Atmospheric view of a narrow Venetian canal with a traditional gondola at twilight",
    dateLabel: "August 2023",
  },
  {
    slug: "electric-dreams",
    title: "Electric Dreams",
    excerpt:
      "Lost in the rhythmic pulse of Shinjuku's neon arteries. A city that never sleeps.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBL37AJkhscviw80TVtK1vu6MZojtyKa8fcQ2EVv6zPXvSTQJgZ216Up4ezxVmLIkvB-rAAdkskh0PDm87s9sNzKjIN8aGmlhVKl5HvHtiY_AvJr0Cqxa5lskrVol9RMS1H1gYZhyA8dcZQm4F6d1_BuR2WDWMKQ97BsnYKGyXsOKQ_vSfYE6kz4KmgmS0F-L5UPe2eHYDZbIx_xnfVtNPYuQKXfunz_9HRKFEK2bHrVcRahf2QIilEqqUPz9ksCl5BBdRPt-NfV6E",
    imageAlt:
      "Vibrant neon lights of Shinjuku at night reflecting on wet pavement after rain",
    dateLabel: "Japan",
    locationLabel: "Japan",
  },
  {
    slug: "black-sand-solitude",
    title: "Black Sand Solitude",
    excerpt:
      "Reynisfjara feels like the end of the world. The waves are relentless, a reminder of nature's raw power.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZIdx2rFKsd7Scg6PXCYMFm9VJxPbtxDnP8dIudODaEqnJAEZg59En19-pqpQXRJp8LhFkpgqShy4G7D65H71DiPN4qNzAVTmPT-5fn__YCQjhdXq-d5ET_A9gtnzVYfgA0iAJFnI6gNPyr82p2W8aD9b96YKKgSB_914voO3YZORiUFteefD3hO0_FNd7wqmiSQc6uwIdmpyH9pC-qHK_Wgo_Rm-0rDRe19bbw1_O6QMvoV9urnMQJsszLaiBe94D-HF-X9kcmnw",
    imageAlt: "Black basalt sea stacks rising from a volcanic beach in Iceland",
    dateLabel: "June 2023",
  },
  {
    slug: "patagonian-silence",
    title: "Patagonian Silence",
    excerpt:
      "Mapping the southern tip of the world. A project about wind, stone, and the persistence of life in the cold.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPYAly5crEroicNOEv8AZEg3uf1EAfwdcJuWsuTiK1ko-AAV50XnrKrRNvID7fnywFApkmaAD0JJSoJFF-z21mFWWCkpznjTM9X1_qqVXjysgiNMyKmroEH-WT3_oNo1cgdBBfjN-J2HZM2ykTa94kDJM0jCQcXCLPns1wjtEJa6UZyW410nBXuaPlmRucv25IKVdj0Ss7sWh05vZqSCRvAMciI-VBswKaCUQ5g7J9AuGszkmXRW8Lead1ZkFynAU9NwIVyO-bzlU",
    imageAlt:
      "Panoramic Andes mountains reflecting in a crystal glacial lake in Patagonia",
    dateLabel: "Ongoing series",
    tag: "Ongoing series",
  },
];

export const journalDetails: JournalDetail[] = [
  {
    slug: "kyoto-silent-sunrise",
    category: "Japan Expedition",
    date: "Oct 14, 2024",
    heroTitle: "The Silent Sunrise:",
    heroAccent: "Kyoto",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9nN2TsWaKYXVB3z_IFS9ih45j4js6IicfDFJnncEq_DU_a0l2GLFdTqBN9wKrHjW4mG8nhJamm1cPnr9NebkO-OCvTeXSHvLBx9WlpsTwvSH0PRqlqhUYED9X31h-poGHHhxR2rFyrKV6mBMEZlSwgiWpLYbH4vvL2X9E6nl-vTvBsHQut9mEfFz5OJUzzgi18ZNEsJEj-hE7C-DRzy3pwGnYVNn5xIYeEL4hQTs-2qjrtqt-XBUOwjCOe6JYnsKkx60E1lp5iCY",
    heroImageAlt:
      "Dramatic wide shot of a traditional Japanese pagoda at sunrise in Kyoto",
    location: "Kyoto, Japan",
    readTime: "8 min read",
    conditions: {
      weather: "Clear / 14C",
      steps: "22,481",
      elevationGain: "320m",
    },
    featuredGear: ["Sony a7R IV", "35mm Prime", "Osprey 30L"],
    intro:
      "Kyoto does not wake up; it unfolds. Long before the first subway lines begin their mechanical hum, the city breathes in the scent of cedar incense and morning mist. My journey began at 4:30 AM, navigating the silent, narrow alleys of Higashiyama, where the only sound was the rhythmic click of my camera shutter against the absolute stillness.",
    sectionOneTitle: "The Fushimi Inari Climb",
    sectionOneBody:
      "While most tourists arrive mid-morning, the real magic of Fushimi Inari-taisha happens in the indigo hours. Climbing the thousand vermillion torii gates in near-total darkness is a spiritual exercise. Each step upward feels like passing through another veil of history. By the time I reached the Yotsutsuji intersection, the sky had shifted from a bruised purple to a delicate, translucent peach.",
    gallery: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmmnGz0EbSyBr4YVdVdgrzyhO095qjBcep9wRI9Lmi4tu73uPbPy0vWwS9VMtJxUt5JWNESwB-zs9s2N2lLN9fahYgWqCWFghZSEm5_Byd-LjgU6Co5gup4kqH38w6Qg9Z2DcnpY0bD1tW-YLWz6QHC6OImQgh9T5_2W1Gb6Mm9RweYf-mzRVXgn8DzJumfuyncOuUuIHQBJKBkchKqzBS8QVA2cQvNOP1ByVI-9bAD-M9qOFq3mHO9iTLQuF9YveQEOQ87enEDyA",
        alt: "Vertical close up of numerous bright red torii gates creating a tunnel perspective",
        className:
          "aspect-square md:aspect-auto md:row-span-2 rounded-2xl overflow-hidden shadow-xl relative",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDFA_sAvKGo8M3Q1Te9-SAdj_4vIU_DoJwRKzKkeO__dpYWYY0VJgFFyBjuwK8u47TO9cvTkg670h02Y0fwS2xM7-J-pF2Gv6WI0qCbXoKIP5R6GQjDid64gviVd0sT8YnzsTrogI0bvCg8G9N8IADj8jFG_PxrVhi3TI8hfNjGlsK3r7Sf9qzknnqxY3_rzydQEzAGjD35cdVXc1MHC1TRQZgFmmKGQOFBGwdAdeMNVeQ9K5xPqfDkEpLBmYEpvcJqtKL6o0y9Ul8",
        alt: "Small stone statue with a red bib in a Japanese moss garden",
        className:
          "aspect-square rounded-2xl overflow-hidden shadow-xl relative",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuChx68Nejb4tMzcgoNSejskCbdMjn4XyOcKfR7Zb3UDe_Lf1Qt1rFo7lhNybT9RA0pj5cCtAgngN_72boR-bhPgmx4Ev1sScQhMbDG7fck5YlFRLfgghiD_dpo-KoW_wwHeIz79CL5UtM4TV4QGLWL2lb87mGrRbXkWIATmuKAlZDD4u04D--ZzifIN-N0yCQ45uWm7h_wEoMaNg8d_a0bq42BhcAt_AnFsbPAs1_DgY-YnjFh2lCf9UpJc1e3qiYfMbyhJwyH0vQQ",
        alt: "Cherry blossom petals floating on a dark water stream",
        className:
          "aspect-square rounded-2xl overflow-hidden shadow-xl relative",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAlfKhP6wze_mcabYIds543M5gqPGFUsZvVGVZH9xZojogMGMWbBtxXTjbwEa94SvTbogqu-LKSpQApLdRiC9tij039r9MgaYoSyGHMq54GIt3inefMBVEMVRrrLWvFa54HsisstyD0EVkdjfOc8hzGvGEiLSFtDjkQYchQXtK8yEVDBmewZady2cEkY8OkhSXKRKXkN1OPhS6ITQj7wZgi-tsVpxxM-JvxExMY8KDH5LQX-YosjrwazfQqRym4ihEYwA_GLDvB4Vw",
        alt: "Wide scenic view of Kyoto city skyline from a mountain temple during blue hour",
        className:
          "col-span-2 aspect-[16/9] rounded-2xl overflow-hidden shadow-xl relative",
      },
    ],
    sectionTwoTitle: "A Moment of Zen",
    sectionTwoBody:
      "I found myself later at a small, nameless shrine near the base of the mountain. An elderly monk was sweeping the gravel; the sound of the broom was the only percussion to the birds' morning chorus. We did not speak, but he offered a slight nod. In that exchange, I understood the silent sunrise was not about the absence of noise, but the presence of peace. Kyoto rewards those willing to lose sleep in exchange for finding their soul.",
    tags: ["Solitude", "Kyoto", "Photography"],
    previous: {
      slug: "electric-dreams",
      title: "The Neon Rain of Shinjuku",
      subtitle: "Tokyo nightlife explored through a rain-slicked lens.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-JD05I_8ZDwkOW5-4--wSc9y6v9nT8MtE43yHttPyaweP0OFFsSA5hyhB75vjO5ybxCvs0eOI374kLWyEVUh901mI0R0QaI1EwWfxtUX1UoGOSm_X11RMPrVRbRWR75Y7fMO9kcEL6Q5dSwL1j_s9iLHHcCXYvJTPG5a_U1i5udP05RK17oiw3IEZsY3kteIajVS8TvwjW3dN9KYsDnxNsB9-S_RAybvA7gikS0TVCwVLg30B63kLVf0UJW98W9jlD-4KNg02_Q",
      imageAlt: "Neon lights of Shinjuku streets at night in rain",
    },
    next: {
      slug: "arashiyama-bamboo-whispers",
      title: "Arashiyama Bamboo Whispers",
      subtitle: "Finding rhythm in the swaying bamboo stalks.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBXjzl4SW6Vt79i9jr7scqw2finxupAmd3dJYMMggZ30k9bZRw3fPBmOhEjmfZd4gp-Aco01Q3gVxhdn5JdAfuDgLZGaNnjQuXR4EfR2rJ1GX8DGiiuzgMyoxXVv-v5SIz4kuxMHlwNE4Y3g-4Atwos0QUi9boxJ1TDydqJIn1Gu7cOuClf67ElH4bR1LwAPLAZ5tDB-URlTi4u8LhOFKpMByGpkTBK-fWNGBgY35id65Oy-MKOYVBBsAY63eGxMKI61fBvbNfofOI",
      imageAlt: "Dense tall bamboo forest stalks in Arashiyama Kyoto",
    },
  },
];

export const getJournalDetailBySlug = (slug: string) =>
  journalDetails.find((entry) => entry.slug === slug);
