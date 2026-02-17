import { useState } from 'react';

// Curated list of companies with logos that are likely to display well
const companies = [
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Whatfix', domain: 'whatfix.com' },
  { name: 'Cuemath', domain: 'cuemath.com' },
  { name: 'Tencent', domain: 'tencent.com' },
  { name: 'Masai', domain: 'masaischool.com' },
  { name: 'Saint-Gobain', domain: 'saint-gobain.com' },
  { name: 'Meesho', domain: 'meesho.com' },
  { name: 'PhonePe', domain: 'phonepe.com' },
  { name: 'Zoho', domain: 'zoho.com' },
  { name: 'Freshworks', domain: 'freshworks.com' },
];

const CompanyLogo = ({ name, domain }: { name: string; domain: string }) => {
  const [imgSrc, setImgSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (imgSrc.includes('clearbit')) {
      // Fallback to Google Favicon service for better reliability
      setImgSrc(`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`);
    } else {
      setError(true);
    }
  };

  if (error) {
    return null;
  }

  return (
    <div className="flex items-center justify-center px-10 md:px-14 shrink-0 group">
      <img
        src={imgSrc}
        alt={`${name} logo`}
        className="h-7 md:h-9 w-auto object-contain transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
        onError={handleError}
      />
    </div>
  );
};

const MarqueeRow = ({ items }: { items: typeof companies }) => {
  return (
    <div className="flex overflow-hidden group select-none">
      <div 
        className="flex items-center animate-marquee py-4"
        style={{ animationDuration: '40s' }}
      >
        {/* Duplicate items for seamless flow */}
        {[...items, ...items].map((company, i) => (
          <CompanyLogo key={`${company.name}-${i}-a`} {...company} />
        ))}
      </div>
      <div 
        aria-hidden="true"
        className="flex items-center animate-marquee py-4"
        style={{ animationDuration: '40s' }}
      >
        {[...items, ...items].map((company, i) => (
          <CompanyLogo key={`${company.name}-${i}-b`} {...company} />
        ))}
      </div>
    </div>
  );
};

export default function TrustedCompanies() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-300 mb-6 tracking-tight">
          Trusted by more than <span className="text-white">5,000+</span> leading HR teams of all sizes
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Teams choose Taurus's AI interview software to make interviews simple, structured, and deliver a better candidate experience.
        </p>
      </div>

      <div className="relative w-full flex items-center py-10 bg-white/[0.02] border-y border-white/[0.05]">
        {/* Premium Gradient Masks for Soft Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={companies} />
      </div>
    </section>
  );
}
