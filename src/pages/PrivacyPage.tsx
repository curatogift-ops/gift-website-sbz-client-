import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyLegalDetails from '@/components/shared/CompanyLegalDetails';
import { COMPANY_INFO } from '@/config/companyInfo';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Navbar />

      <main className="page-main-offset flex-grow">
        <section className="border-b border-border bg-[var(--cream)] py-12 sm:py-14">
          <div className="section-container">
            <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold text-primary">Privacy Policy</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              How {COMPANY_INFO.brandName} collects, uses, and protects your information.
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
                <h2 className="font-serif text-lg font-semibold text-foreground">Data controller</h2>
                <p>
                  {COMPANY_INFO.legalName}, registered at {COMPANY_INFO.singleLineAddress}, is responsible for personal
                  data submitted through this website, including enquiry forms and order-related communications.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">Information we collect</h2>
                <p>
                  We may collect your name, contact number, email address, company name, order requirements, and messages
                  you submit through enquiry or contact forms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">How we use your information</h2>
                <p>
                  Your information is used to respond to enquiries, prepare quotations, process orders, provide customer
                  support, and comply with legal and tax obligations under applicable Indian law.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">Contact &amp; grievances</h2>
                <p>
                  For privacy-related requests, write to{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-medium text-primary hover:underline">
                    {COMPANY_INFO.email}
                  </a>{' '}
                  or contact us at our registered office address listed above.
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
