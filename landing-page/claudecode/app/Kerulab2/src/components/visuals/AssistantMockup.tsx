import { Bot, FileText, Send } from 'lucide-react';
import { content } from '../../content/es';

/** Mockup ilustrativo del asistente de negocio con respuesta referenciada. */
export function AssistantMockup() {
  const { assistant } = content.ai;

  return (
    <figure className="card-soft overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <Bot size={15} aria-hidden="true" />
          {assistant.title}
        </span>
        <span className="rounded-full bg-mango-300/50 px-2.5 py-1 text-[11px] font-semibold text-plum-600">
          {assistant.badge}
        </span>
      </div>

      <div className="space-y-3 px-4 py-5">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-plum-500 px-4 py-2.5 text-sm text-white">
          {assistant.question}
        </p>

        <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-cream px-4 py-3">
          <p className="text-sm leading-relaxed text-ink">{assistant.answer}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-teal-600">
            <FileText size={12} aria-hidden="true" />
            {assistant.sourceLabel}: {assistant.sourceValue}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        <span className="flex-1 truncate rounded-full bg-cream px-4 py-2 text-xs text-ink-mute">
          {assistant.placeholder}
        </span>
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-full bg-teal-500 text-white"
        >
          <Send size={14} />
        </span>
      </div>
    </figure>
  );
}
