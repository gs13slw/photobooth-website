export default function PhotoboothLanding() {
  return (
    <div className="w-full min-h-screen bg-[#0B0914] text-white">
      {/* 1. TOP SCROLLING MARQUEE BANNER - UNTOUCHED */}
      <div className="w-full bg-[#1A0B2E] text-amber-200 py-2 overflow-hidden border-b border-amber-500/20">
        {/* Your scrolling marquee content stays as-is */}
      </div>

      {/* 2. HERO SECTION - WHITE WITH GOLD ACCENTS */}
      <section className="relative bg-white text-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-sm">
              Lasting Moments, Captured Forever
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Capture. Celebrate.<br />
              <span className="text-[#D4AF37]">Cherish forever.</span>
            </h1>
            <p className="text-slate-600 text-lg">
              Premium photo booth experiences designed to make every moment unforgettable — weddings, birthdays, family reunions, and corporate events. Serving Atlanta & surrounding areas.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#booking" className="bg-[#D4AF37] hover:bg-[#B89628] text-white font-medium px-6 py-3 rounded-full transition-colors shadow-md">
                Get your quote
              </a>
              <a href="#gallery" className="border border-slate-300 hover:border-slate-400 text-slate-800 font-medium px-6 py-3 rounded-full transition-colors">
                See it in action
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL OTHER SECTIONS - REVERTED TO DARK GRAY/PURPLE */}
      <main className="bg-[#0B0914]">
        {/* EXPERIENCES / SERVICES */}
        <section id="services" className="py-20 px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <span className="text-amber-400 font-medium">Experiences</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">Perfect for every memory.</h2>
            {/* Grid Items */}
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-20 px-6 bg-[#0E0B1A]">
          <div className="max-w-7xl mx-auto">
            <span className="text-amber-400 font-medium">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">Moments, freshly printed.</h2>
          </div>
        </section>

        {/* BOOKING / ESTIMATOR */}
        <section id="booking" className="py-20 px-6">
          {/* Booking calculator content */}
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 px-6 bg-[#0E0B1A]">
          {/* FAQ Accordions */}
        </section>
      </main>

      {/* FOOTER - DARK GRAY/PURPLE */}
      <footer className="bg-[#07050E] border-t border-slate-800 py-12 px-6 text-slate-400">
        <div className="max-w-7xl mx-auto">
          {/* Footer content */}
        </div>
      </footer>
    </div>
  );
}