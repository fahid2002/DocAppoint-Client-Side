"use client";

const steps = [
  { n: 1, icon: "ti-search",   cls: "ico-blue",  title: "Find a doctor", desc: "Search by specialty, location, or name. Read real patient reviews to make an informed choice." },
  { n: 2, icon: "ti-calendar", cls: "ico-green", title: "Book a slot",    desc: "Choose a convenient date and time. Fill in your details and confirm in seconds." },
  { n: 3, icon: "ti-heart",    cls: "ico-pink",  title: "Get treated",   desc: "Visit the clinic and receive expert, personalized care from your chosen specialist." },
];

const iconStyles = {
  "ico-blue":  { bg: "bg-(--p3)",         text: "text-(--p)" },
  "ico-green": { bg: "bg-(--green-bg)",   text: "text-[#3B6D11]" },
  "ico-pink":  { bg: "bg-[#FBEAF0]",      text: "text-[#993556]" },
};

export default function HowItWorks() {
  return (
    <div className="bg-(--bg3) border-t border-(--bdr) border-b py-12">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-[1.8rem]">
          <div className="eyebrow text-center">Simple process</div>
          <div className="sec-title text-2xl">How it works</div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.2rem]">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-(--card) border border-(--card-bdr) rounded-xl p-6 text-center transition-transform duration-[220ms] hover:-translate-y-[3px]"
            >
              {/* Step number */}
              <div className="w-6 h-6 rounded-full bg-(--p) text-white text-[11px] font-extrabold flex items-center justify-center mx-auto mb-[0.7rem] font-[Sora,sans-serif]">
                {s.n}
              </div>

              {/* Icon */}
              <div className={`w-[58px] h-[58px] rounded-xl flex items-center justify-center mx-auto mb-[0.9rem] text-[25px] ${iconStyles[s.cls].bg} ${iconStyles[s.cls].text}`}>
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>

              {/* Text */}
              <h3 className="font-[Sora,sans-serif] text-sm font-bold text-(--tx) mb-[5px]">
                {s.title}
              </h3>
              <p className="text-[13px] text-(--tx2) leading-[1.55]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}