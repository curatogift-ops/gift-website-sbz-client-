import { useMemo, useState } from 'react';
import {
  buildImageRequirements,
  getRequirementStats,
  groupImageRequirements,
  PAGE_OPTIONS,
  type PageGroup,
  type SectionGroup,
} from '@/config/imageRequirementsRegistry';
import { toSimpleSpecBlocks, type SimpleSpecBlock } from '@/lib/imageRequirements/simpleSpec';
import type { ImageRequirement } from '@/types/imageRequirements';
import { cn } from '@/utils/cn';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';

function StatusDot({ status }: { status: ImageRequirement['status'] }) {
  const styles = {
    missing: 'bg-red-500',
    placeholder: 'bg-amber-500',
    production: 'bg-emerald-500',
  };
  const labels = {
    missing: 'Missing',
    placeholder: 'Placeholder',
    production: 'Ready',
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className={cn('h-2 w-2 rounded-full', styles[status])} aria-hidden />
      {labels[status]}
    </span>
  );
}

function SpecCard({ block }: { block: SimpleSpecBlock }) {
  const isDesktopHero = block.title.startsWith('Desktop hero');
  const isMobileHero = block.title.startsWith('Mobile hero');

  return (
    <div
      className={cn(
        'rounded-lg border bg-white p-4 sm:p-5',
        isDesktopHero && 'border-blue-200/80 ring-1 ring-blue-100',
        isMobileHero && 'border-violet-200/80 ring-1 ring-violet-100',
        !isDesktopHero && !isMobileHero && 'border-slate-200'
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {(isDesktopHero || isMobileHero) && (
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide',
                  isDesktopHero && 'bg-blue-50 text-blue-800',
                  isMobileHero && 'bg-violet-50 text-violet-800'
                )}
              >
                {isDesktopHero ? 'Desktop' : 'Mobile'}
              </span>
            )}
            <h4 className="text-sm font-semibold text-slate-900">{block.title}</h4>
          </div>
          {block.subtitle && (
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{block.subtitle}</p>
          )}
        </div>
        <StatusDot status={block.status} />
      </div>
      <ul className="mt-3 space-y-1">
        {block.lines.map((line) => (
          <li
            key={line}
            className={cn(
              'text-sm text-slate-700',
              line.startsWith('Desktop:') && 'font-medium text-blue-900',
              line.startsWith('Mobile:') && 'font-medium text-violet-900',
              line.startsWith('Current file:') && 'break-all font-mono text-xs text-slate-500'
            )}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionBlock({ section }: { section: SectionGroup }) {
  const blocks = useMemo(() => toSimpleSpecBlocks(section.requirements), [section.requirements]);

  return (
    <div className="border-t border-slate-100 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 xl:gap-12">
        <div className="shrink-0 lg:w-64 xl:w-72">
          <p className="text-xs font-bold tabular-nums text-[#9D7D47]">{section.sectionOrder}.</p>
          <h3 className="text-base font-semibold text-slate-900 lg:text-lg">{section.sectionName}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{section.sectionDescription}</p>
          {section.sectionName === 'Hero Slider' && (
            <p className="mt-2 rounded-md border border-blue-100 bg-blue-50/80 px-3 py-2 text-xs leading-relaxed text-blue-900">
              <strong className="font-semibold">Important:</strong> Each slide needs two files — one{' '}
              <strong>Desktop</strong> (blue) and one <strong>Mobile</strong> (purple). Do not use the mobile
              file on desktop or vice versa.
            </p>
          )}
        </div>
        <div className="min-w-0 flex-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {blocks.map((block, i) => (
            <SpecCard key={`${block.title}-${i}`} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PageBlock({ page, defaultOpen }: { page: PageGroup; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-300 bg-slate-50 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 bg-white px-4 py-4 text-left transition hover:bg-slate-50 sm:px-6 sm:py-5"
      >
        {open ? (
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
        ) : (
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-500" />
        )}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{page.pageName}</h2>
          <p className="font-mono text-sm text-slate-500">{page.pageRoute}</p>
        </div>
      </button>

      {open && (
        <div className="divide-y divide-slate-200 bg-white">
          {page.sections.map((section) => (
            <SectionBlock key={section.sectionName} section={section} />
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, tone = 'default' }: { label: string; value: number; tone?: 'default' | 'success' | 'warning' | 'danger' }) {
  const valueStyles = {
    default: 'text-slate-900',
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    danger: 'text-red-700',
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={cn('mt-1 text-2xl font-semibold tabular-nums', valueStyles[tone])}>{value}</p>
    </div>
  );
}

export default function ImageRequirementsPage() {
  const allRequirements = useMemo(() => buildImageRequirements(), []);
  const stats = useMemo(() => getRequirementStats(allRequirements), [allRequirements]);

  const [search, setSearch] = useState('');
  const [pageFilter, setPageFilter] = useState<string>('All pages');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allRequirements.filter((r) => {
      if (pageFilter !== 'All pages' && r.pageName !== pageFilter) return false;
      if (!q) return true;
      return (
        r.imageName.toLowerCase().includes(q) ||
        r.sectionName.toLowerCase().includes(q) ||
        r.pageName.toLowerCase().includes(q)
      );
    });
  }, [allRequirements, search, pageFilter]);

  const groupedPages = useMemo(() => groupImageRequirements(filtered), [filtered]);

  const hasActiveFilters = search.trim() !== '' || pageFilter !== 'All pages';

  return (
    <div className="image-req-admin min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Internal · Designer handoff
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Image Requirements
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Recommended sizes only — organized by page and section.
          </p>

          <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:max-w-3xl">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Ready" value={stats.byStatus.get('production') ?? 0} tone="success" />
            <StatCard label="Placeholder" value={stats.byStatus.get('placeholder') ?? 0} tone="warning" />
            <StatCard label="Missing" value={stats.byStatus.get('missing') ?? 0} tone="danger" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-end">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search page or section…"
              className="h-10 w-full rounded-md border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <select
            value={pageFilter}
            onChange={(e) => setPageFilter(e.target.value)}
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          >
            {PAGE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPageFilter('All pages');
              }}
              className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-4">
          {groupedPages.map((page, index) => (
            <PageBlock key={page.pageName} page={page} defaultOpen={index === 0} />
          ))}
        </div>

        {groupedPages.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">No matching pages.</p>
        )}
      </main>
    </div>
  );
}
