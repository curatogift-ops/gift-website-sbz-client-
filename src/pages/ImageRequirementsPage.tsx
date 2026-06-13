import { useMemo, useState, type ReactNode } from 'react';
import {
  buildImageRequirements,
  getRequirementStats,
  PAGE_OPTIONS,
  PRIORITY_OPTIONS,
  PURPOSE_OPTIONS,
  STATUS_OPTIONS,
} from '@/config/imageRequirementsRegistry';
import { formatSize } from '@/lib/imageRequirements/specBuilders';
import type { ImageRequirement } from '@/types/imageRequirements';
import { cn } from '@/utils/cn';
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Search,
  X,
} from 'lucide-react';

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden />
      {copied ? 'Copied' : label}
    </button>
  );
}

function StatusBadge({ status }: { status: ImageRequirement['status'] }) {
  const styles = {
    missing: 'bg-red-50 text-red-700 border-red-200',
    placeholder: 'bg-amber-50 text-amber-800 border-amber-200',
    production: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  const labels = {
    missing: 'Missing',
    placeholder: 'Placeholder',
    production: 'Production',
  };

  return (
    <span className={cn('inline-flex rounded border px-2 py-0.5 text-[11px] font-medium', styles[status])}>
      {labels[status]}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: ImageRequirement['priority'] }) {
  const styles = {
    Critical: 'bg-red-50 text-red-800 border-red-200',
    High: 'bg-orange-50 text-orange-800 border-orange-200',
    Medium: 'bg-slate-100 text-slate-700 border-slate-200',
    Low: 'bg-slate-50 text-slate-500 border-slate-200',
  };

  return (
    <span className={cn('inline-flex rounded border px-2 py-0.5 text-[11px] font-medium', styles[priority])}>
      {priority}
    </span>
  );
}

function SpecBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-2 border-b border-slate-100 py-2 text-sm last:border-0">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="min-w-0 text-slate-800">{value}</dd>
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-600">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="image-req-select h-10 w-full cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-0 pl-3 pr-9 text-sm font-medium text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          aria-hidden
        />
      </div>
    </div>
  );
}

function RequirementRow({ requirement }: { requirement: ImageRequirement }) {
  const [open, setOpen] = useState(false);
  const r = requirement;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 sm:gap-4 sm:p-5"
      >
        <div className="mt-0.5 shrink-0 text-slate-400">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900">{r.imageName}</h3>
            <StatusBadge status={r.status} />
            <PriorityBadge priority={r.priority} />
          </div>

          <p className="mt-1.5 text-sm text-slate-600">
            <span className="font-medium text-slate-700">{r.pageName}</span>
            <span className="mx-1.5 text-slate-300">/</span>
            {r.sectionName}
            <span className="mx-1.5 text-slate-300">·</span>
            {r.purpose}
          </p>

          <dl className="mt-3 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-slate-400">Desktop</dt>
              <dd className="font-mono text-slate-700">{r.technical.desktop.width} × {r.technical.desktop.height}px</dd>
            </div>
            <div>
              <dt className="text-slate-400">Tablet</dt>
              <dd className="font-mono text-slate-700">{r.technical.tablet.width} × {r.technical.tablet.height}px</dd>
            </div>
            <div>
              <dt className="text-slate-400">Mobile</dt>
              <dd className="font-mono text-slate-700">{r.technical.mobile.width} × {r.technical.mobile.height}px</dd>
            </div>
            <div>
              <dt className="text-slate-400">Aspect ratio</dt>
              <dd className="text-slate-700">{r.technical.aspectRatio}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Format</dt>
              <dd className="text-slate-700">{r.technical.format}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Max size</dt>
              <dd className="font-mono text-slate-700">{r.technical.maxFileSizeKb} KB</dd>
            </div>
          </dl>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <SpecBlock title="Metadata">
                <dl>
                  <MetaRow label="Route" value={<code className="break-all text-xs text-slate-700">{r.pageRoute}</code>} />
                  <MetaRow label="Priority" value={<PriorityBadge priority={r.priority} />} />
                  {r.currentSource && (
                    <MetaRow
                      label="Source"
                      value={<code className="break-all text-xs text-slate-600">{r.currentSource}</code>}
                    />
                  )}
                </dl>
              </SpecBlock>

              <SpecBlock title="Technical specifications">
                <dl>
                  <MetaRow label="Desktop" value={formatSize(r.technical.desktop)} />
                  <MetaRow label="Tablet" value={formatSize(r.technical.tablet)} />
                  <MetaRow label="Mobile" value={formatSize(r.technical.mobile)} />
                  <MetaRow
                    label="Retina"
                    value={`${r.technical.retinaExport.exportWidth} × ${r.technical.retinaExport.exportHeight}px`}
                  />
                  <MetaRow label="Quality" value={`${r.technical.compressionQuality}%`} />
                  <MetaRow label="Crop rules" value={r.technical.cropRules} />
                  <MetaRow label="Safe area" value={r.technical.safeArea} />
                  <MetaRow label="Focal point" value={r.technical.focalPoint} />
                  <MetaRow label="Transparency" value={r.technical.transparency ? 'Required' : 'Not required'} />
                </dl>
              </SpecBlock>

              <SpecBlock title="Content guidance">
                <dl>
                  <MetaRow label="Subject" value={r.content.subject} />
                  <MetaRow label="Composition" value={r.content.composition} />
                  <MetaRow label="Style" value={r.content.style} />
                  {r.content.lighting && <MetaRow label="Lighting" value={r.content.lighting} />}
                  <MetaRow label="Brand colors" value={r.content.brandColors} />
                  <MetaRow label="Mood" value={r.content.mood} />
                  {r.content.mobileCropNotes && <MetaRow label="Mobile crop" value={r.content.mobileCropNotes} />}
                </dl>
              </SpecBlock>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <SpecBlock title="Designer brief">
                <div className="mb-2 flex justify-end">
                  <CopyButton text={r.designerBrief} label="Copy brief" />
                </div>
                <pre className="max-h-52 overflow-auto rounded-md border border-slate-200 bg-white p-3 font-sans text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {r.designerBrief}
                </pre>
              </SpecBlock>
            </div>
          </div>
        </div>
      )}
    </article>
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
      <p className={cn('mt-1 text-3xl font-semibold tabular-nums', valueStyles[tone])}>{value}</p>
    </div>
  );
}

export default function ImageRequirementsPage() {
  const allRequirements = useMemo(() => buildImageRequirements(), []);
  const stats = useMemo(() => getRequirementStats(allRequirements), [allRequirements]);

  const [search, setSearch] = useState('');
  const [pageFilter, setPageFilter] = useState<string>('All pages');
  const [purposeFilter, setPurposeFilter] = useState<string>('All purposes');
  const [priorityFilter, setPriorityFilter] = useState<string>('All priorities');
  const [statusFilter, setStatusFilter] = useState<string>('All statuses');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allRequirements.filter((r) => {
      if (pageFilter !== 'All pages' && r.pageName !== pageFilter) return false;
      if (purposeFilter !== 'All purposes' && r.purpose !== purposeFilter) return false;
      if (priorityFilter !== 'All priorities' && r.priority !== priorityFilter) return false;
      if (statusFilter !== 'All statuses' && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.imageName.toLowerCase().includes(q) ||
        r.sectionName.toLowerCase().includes(q) ||
        r.pageName.toLowerCase().includes(q) ||
        r.componentName.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q)
      );
    });
  }, [allRequirements, search, pageFilter, purposeFilter, priorityFilter, statusFilter]);

  const hasActiveFilters =
    search.trim() !== '' ||
    pageFilter !== 'All pages' ||
    purposeFilter !== 'All purposes' ||
    priorityFilter !== 'All priorities' ||
    statusFilter !== 'All statuses';

  const clearFilters = () => {
    setSearch('');
    setPageFilter('All pages');
    setPurposeFilter('All purposes');
    setPriorityFilter('All priorities');
    setStatusFilter('All statuses');
  };

  return (
    <div className="image-req-admin min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Internal · Designer handoff
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Image Requirements
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total assets" value={stats.total} />
            <StatCard label="Production ready" value={stats.byStatus.get('production') ?? 0} tone="success" />
            <StatCard label="Placeholder (Unsplash)" value={stats.byStatus.get('placeholder') ?? 0} tone="warning" />
            <StatCard label="Missing assets" value={stats.byStatus.get('missing') ?? 0} tone="danger" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h2 className="text-sm font-semibold text-slate-900">Search &amp; filters</h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Clear all
              </button>
            )}
          </div>

          <div className="pt-4">
            <label htmlFor="image-req-search" className="mb-1.5 block text-xs font-medium text-slate-600">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                id="image-req-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Image name, section, or purpose"
                className="image-req-search h-10 w-full rounded-md border border-slate-300 bg-white py-0 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect id="filter-page" label="Page" value={pageFilter} onChange={setPageFilter} options={PAGE_OPTIONS} />
            <FilterSelect id="filter-purpose" label="Purpose" value={purposeFilter} onChange={setPurposeFilter} options={PURPOSE_OPTIONS} />
            <FilterSelect id="filter-priority" label="Priority" value={priorityFilter} onChange={setPriorityFilter} options={PRIORITY_OPTIONS} />
            <FilterSelect id="filter-status" label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{' '}
          <span className="font-medium text-slate-700">{allRequirements.length}</span> requirements
        </p>

        <div className="space-y-3">
          {filtered.map((req) => (
            <RequirementRow key={req.id} requirement={req} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-base font-medium text-slate-900">No matching requirements</p>
            <p className="mt-1 text-sm text-slate-500">Adjust filters or search to find assets.</p>
          </div>
        )}

        <aside className="mt-10 rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Adding new image slots</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Register new assets in{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">src/config/imageRequirementsRegistry.ts</code>
            {' '}or add entries to{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">customImageSlots</code>.
            Arrays in{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">personalizedSections.ts</code>
            {' '}are expanded automatically.
          </p>
        </aside>
      </main>
    </div>
  );
}
