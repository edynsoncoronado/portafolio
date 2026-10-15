import { useId, useRef, useState, type FormEvent } from 'react';
import { CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { Hand } from '../ui/Hand';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { content } from '../../content/es';
import { sectionIds, siteConfig } from '../../config/site';
import {
  emptyContactForm,
  submitContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../lib/contactForm';
import { cn } from '../../lib/cn';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldClass =
  'w-full rounded-2xl border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-mute focus:border-plum-300 focus:outline-none';

export function Contact() {
  const { contact } = content;
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = <K extends keyof ContactFormValues>(key: K, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContactForm(values);
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      setStatus('idle');
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus('loading');
    try {
      await submitContactForm(values);
      setValues(emptyContactForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const errorFor = (key: keyof ContactFormValues) =>
    errors[key] ? (
      <p id={`${formId}-${key}-error`} className="mt-1.5 text-xs text-coral-500">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: keyof ContactFormValues) =>
    errors[key] ? `${formId}-${key}-error` : undefined;

  return (
    <section id={sectionIds.contact} className="scroll-mt-24 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
              {contact.eyebrow}
            </p>
            <Hand className="mt-3">{contact.title}</Hand>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{contact.subtitle}</p>

            <h3 className="mt-8 text-sm font-bold text-ink">{contact.asideTitle}</h3>
            <ol className="mt-3 space-y-3">
              {contact.asideSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-plum-100 text-xs font-bold text-plum-600"
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-1 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="block font-medium text-plum-600 hover:underline">
                {siteConfig.email}
              </a>
              <p className="text-ink-mute">{siteConfig.phone}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="card-soft px-5 py-6 sm:px-8 sm:py-8">
            {status === 'success' ? (
              <div role="status" className="py-8 text-center">
                <CircleCheck size={36} className="mx-auto text-teal-500" aria-hidden="true" />
                <h3 className="mt-4 font-hand text-3xl text-ink">{contact.successTitle}</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">{contact.successBody}</p>
                <Button as="button" type="button" className="mt-6" onClick={() => setStatus('idle')}>
                  {contact.successAgain}
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-name`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.name.label}
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    placeholder={contact.fields.name.placeholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                    className={cn(fieldClass, errors.name && 'border-coral-400')}
                  />
                  {errorFor('name')}
                </div>

                <div>
                  <label htmlFor={`${formId}-company`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.company.label}
                  </label>
                  <input
                    id={`${formId}-company`}
                    name="company"
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                    placeholder={contact.fields.company.placeholder}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={describedBy('company')}
                    className={cn(fieldClass, errors.company && 'border-coral-400')}
                  />
                  {errorFor('company')}
                </div>

                <div>
                  <label htmlFor={`${formId}-email`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.email.label}
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                    placeholder={contact.fields.email.placeholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                    className={cn(fieldClass, errors.email && 'border-coral-400')}
                  />
                  {errorFor('email')}
                </div>

                <div>
                  <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.phone.label}{' '}
                    <span className="font-normal text-ink-mute">({contact.fields.phone.optional})</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    placeholder={contact.fields.phone.placeholder}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor={`${formId}-industry`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.industry.label}
                  </label>
                  <select
                    id={`${formId}-industry`}
                    name="industry"
                    value={values.industry}
                    onChange={(event) => update('industry', event.target.value)}
                    aria-invalid={Boolean(errors.industry)}
                    aria-describedby={describedBy('industry')}
                    className={cn(fieldClass, errors.industry && 'border-coral-400')}
                  >
                    <option value="">{contact.fields.industry.placeholder}</option>
                    {contact.industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errorFor('industry')}
                </div>

                <div>
                  <label htmlFor={`${formId}-topic`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.topic.label}
                  </label>
                  <select
                    id={`${formId}-topic`}
                    name="topic"
                    value={values.topic}
                    onChange={(event) => update('topic', event.target.value)}
                    aria-invalid={Boolean(errors.topic)}
                    aria-describedby={describedBy('topic')}
                    className={cn(fieldClass, errors.topic && 'border-coral-400')}
                  >
                    <option value="">{contact.fields.topic.placeholder}</option>
                    {contact.topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  {errorFor('topic')}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-message`} className="mb-1.5 block text-xs font-semibold text-ink">
                    {contact.fields.message.label}
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(event) => update('message', event.target.value)}
                    placeholder={contact.fields.message.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy('message')}
                    className={cn(fieldClass, 'resize-y', errors.message && 'border-coral-400')}
                  />
                  {errorFor('message')}
                </div>

                <div aria-live="polite" className="sm:col-span-2 empty:hidden">
                  {Object.keys(errors).length > 0 ? (
                    <p className="rounded-2xl bg-coral-200/40 px-4 py-2.5 text-xs text-coral-500">
                      {contact.formErrorSummary}
                    </p>
                  ) : null}
                  {status === 'error' ? (
                    <p className="rounded-2xl bg-coral-200/40 px-4 py-2.5 text-xs text-coral-500">
                      <span className="font-semibold">{contact.errorTitle}. </span>
                      {contact.errorBody}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-mute">{contact.privacy}</p>
                  <Button as="button" type="submit" size="lg" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                        {contact.submitting}
                      </>
                    ) : (
                      <>
                        {contact.submit}
                        <Send size={15} aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
