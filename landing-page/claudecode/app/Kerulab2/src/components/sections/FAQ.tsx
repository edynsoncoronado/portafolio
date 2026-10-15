import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';
import { cn } from '../../lib/cn';

export function FAQ() {
  const { faq } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={sectionIds.faq}
      className="scroll-mt-24 rounded-[2.5rem] bg-paper px-5 py-16 sm:rounded-[3.5rem] sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
            {faq.eyebrow}
          </p>
          <Hand className="mt-3 text-center">{faq.title}</Hand>
          <p className="mt-4 text-center text-base text-ink-soft">{faq.subtitle}</p>
        </Reveal>

        <ul className="mt-10 space-y-3">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <li key={item.question} className="card-soft overflow-hidden">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-ink">{item.question}</span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={cn('shrink-0 text-plum-500 transition-transform', open && 'rotate-180')}
                    />
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} hidden={!open} className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-ink-soft">{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
