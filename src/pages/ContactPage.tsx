import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyLegalDetails from '@/components/shared/CompanyLegalDetails';
import { COMPANY_INFO } from '@/config/companyInfo';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="border-b border-border bg-[var(--cream)] py-12 sm:py-16">
          <div className="section-container text-center">
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-tight text-primary">
              Contact {COMPANY_INFO.brandName}
            </h1>
            <p className="section-lede mx-auto mt-4 max-w-2xl">
              Reach our team for corporate gifting enquiries, bulk orders, and customer support.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="section-container">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-serif text-xl font-semibold text-foreground">Business &amp; registration</h2>
                <div className="mt-6">
                  <CompanyLegalDetails variant="light" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-white p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground">Contact details</h2>
                  <ul className="mt-5 space-y-4">
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Phone</p>
                        <a href={`tel:${COMPANY_INFO.phone}`} className="mt-1 block text-sm font-medium text-primary hover:underline">
                          {COMPANY_INFO.phoneDisplay}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#9D7D47]" strokeWidth={1.75} aria-hidden />
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Email</p>
                        <a href={`mailto:${COMPANY_INFO.email}`} className="mt-1 block break-all text-sm font-medium text-primary hover:underline">
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-[var(--cream)] p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    For bulk corporate gifting, visit our{' '}
                    <Link to="/corporate" className="font-medium text-primary hover:underline">
                      corporate gifting page
                    </Link>{' '}
                    or submit a bulk enquiry from any product page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
