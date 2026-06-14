import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TrophiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />
      
      <main className="page-main-offset flex-grow">
        <section className="bg-[#1A1010] py-20 sm:py-32">
          <div className="section-container text-center">
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Premium Trophies
            </h1>
            <p className="mt-6 mx-auto max-w-2xl font-sans text-lg text-white/80">
              Celebrate milestones with our exclusive collection of bespoke and ready-to-award trophies.
            </p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="section-container text-center">
            <h2 className="font-serif text-3xl font-semibold text-primary">Collection Coming Soon</h2>
            <p className="mt-4 font-sans text-muted-foreground">
              We are curating a premium selection of crystal, metal, and wooden trophies.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
