import React from "react";

const HowItWorks = () => {
  const howItWorks = [
    {
      name: "Choose Experience",
      description:
        "Browse hundreds of unique activities curated by local experts.",
    },
    {
      name: "Book Safely",
      description:
        "Secure your spot with easy payment and instant confirmation.",
    },
    {
      name: "Meet Your Guide",
      description: "Show up, have fun, and experience the city like a local!",
    },
  ];
  return (
    <section className="px-6 md:px-20 py-16">
      <h2 className="text-slate-900 dark:text-white text-3xl font-bold text-center mb-16">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/4 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-10"></div>
        {howItWorks.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-xl">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.name}</h3>
            <p className="text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
