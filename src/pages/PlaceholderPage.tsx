import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type PlaceholderPageProps = {
  title: string;
};

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow pb-24 px-6 pt-[12rem] md:pt-[9.5rem] xl:pt-[5.75rem] 2xl:pt-[6rem]">
        <div className="container mx-auto max-w-lg text-center py-16">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            This page is coming soon. Browse our collection or reach out on WhatsApp for help.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6B1E30] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F2EDE8] shadow-md transition-colors hover:bg-[#8C3048]"
          >
            Browse shop
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
