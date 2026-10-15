import { CircleCheck, Download, Printer, Send, Signature } from 'lucide-react';
import { content } from '../../content/es';

/** Mockup ilustrativo de un documento de venta dentro del ERP. */
export function InvoiceMockup() {
  const { invoice } = content.quality;

  const actionIcons = [Send, Signature, Download, Printer];

  return (
    <figure className="relative mx-auto w-full max-w-3xl">
      <div className="card-soft overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line bg-cream px-4 py-3">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-coral-400" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-mango-400" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-teal-400" />
          <span className="ml-2 text-xs font-medium text-ink-mute">
            {invoice.label} · {invoice.number}
          </span>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-[1.1fr_1fr] sm:p-7">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-mute">{invoice.customer}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-ink">{invoice.amount}</p>

            <div className="mt-5 space-y-2.5">
              <div className="h-2.5 w-4/5 rounded-full bg-cream-deep" />
              <div className="h-2.5 w-3/5 rounded-full bg-cream-deep" />
              <div className="h-2.5 w-2/3 rounded-full bg-cream-deep" />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-plum-100 text-sm font-semibold text-plum-600"
              >
                F
              </span>
              <span className="font-hand text-xl text-ink-soft">{invoice.person}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {invoice.actions.map((action, index) => {
                const Icon = actionIcons[index % actionIcons.length] ?? Send;
                const primary = index === 0;
                return (
                  <span
                    key={action}
                    className={
                      primary
                        ? 'inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white'
                        : 'inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft'
                    }
                  >
                    <Icon size={13} aria-hidden="true" />
                    {action}
                  </span>
                );
              })}
            </div>

            <dl className="rounded-2xl bg-cream px-4 py-3 text-sm">
              <div className="flex items-center justify-between py-1">
                <dt className="text-ink-mute">{invoice.dueLabel}</dt>
                <dd className="font-medium text-ink">{invoice.dueValue}</dd>
              </div>
              <div className="flex items-center justify-between py-1">
                <dt className="text-ink-mute">{invoice.tagsLabel}</dt>
                <dd className="flex gap-1.5">
                  {invoice.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-plum-100 px-2 py-0.5 text-[11px] font-medium text-plum-600"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-600">
              <CircleCheck size={14} aria-hidden="true" />
              {invoice.status}
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-ink-mute">{invoice.note}</figcaption>
    </figure>
  );
}
