import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Accordion } from '../ui/Accordion';
import { faqOrder } from '../../data/faq';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds } from '../../config/site';

export function FAQ() {
  const { t } = useI18n();

  const items = faqOrder.map((id) => ({
    id,
    question: t.faq.items[id].question,
    answer: t.faq.items[id].answer,
  }));

  return (
    <Section id={sectionIds.faq} labelledBy="faq-title">
      <SectionHeading
        id="faq-title"
        eyebrow={t.faq.eyebrow}
        title={t.faq.title}
        subtitle={t.faq.subtitle}
      />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion items={items} />
      </Reveal>
    </Section>
  );
}
