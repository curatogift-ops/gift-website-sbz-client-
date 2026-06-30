import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyLegalDetails from '@/components/shared/CompanyLegalDetails';
import { COMPANY_INFO } from '@/config/companyInfo';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="border-b border-border bg-[var(--cream)] py-12 sm:py-14">
          <div className="section-container">
            <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold text-primary">Terms of Service</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              These terms govern your use of the {COMPANY_INFO.brandName} website and services.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="section-container">
            <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <CompanyLegalDetails variant="light" />
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">1. Company information</h2>
                <p>
                  {COMPANY_INFO.legalName} operates from its registered office at{' '}
                  {COMPANY_INFO.singleLineAddress}. GSTIN/UIN: {COMPANY_INFO.gstin}. MSME Registration No.:{' '}
                  {COMPANY_INFO.msme}. State: {COMPANY_INFO.state} (Code: {COMPANY_INFO.stateCode}).
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">2. Orders &amp; enquiries</h2>
                <p>
                  Product availability, pricing, branding options, and delivery timelines are confirmed at the time of
                  quotation or order confirmation. Bulk and corporate orders may require minimum quantities and advance
                  payment as communicated by our team.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">3. Payments</h2>
                <p>
                  Payments are processed through secure payment gateways. Invoices are issued in accordance with applicable
                  GST regulations using the GSTIN stated above.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">4. Contact</h2>
                <p>
                  For questions regarding these terms, contact us at{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-medium text-primary hover:underline">
                    {COMPANY_INFO.email}
                  </a>{' '}
                  or {COMPANY_INFO.phoneDisplay}.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
