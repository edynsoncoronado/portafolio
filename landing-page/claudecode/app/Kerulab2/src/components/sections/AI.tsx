import { Hand, Underlined } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { AssistantMockup } from '../visuals/AssistantMockup';
import { content } from '../../content/es';
import { sectionIds } from '../../config/site';

export function AI() {
  const { ai } = content;

  return (
    <section
      id={sectionIds.ai}
      className="scroll-mt-24 rounded-b-[2.5rem] bg-paper px-5 py-16 sm:rounded-b-[3.5rem] sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Hand className="text-center">
            {ai.titleLead} <Underlined color="teal">{ai.titleUnderlined}</Underlined> {ai.titleRest}
          </Hand>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
            {ai.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <AssistantMockup />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {ai.items.map((item) => (
                <li key={item.title} className="card-soft h-full px-5 py-5">
                  <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
