import { useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { useI18n } from '../../hooks/useI18n';
import { sectionIds, siteConfig } from '../../config/site';
import { submitContactForm } from '../../lib/submitContactForm';
import {
  emptyContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../lib/validation';
import { cn } from '../../lib/cn';

type Status = 'idle' | 'loading' | 'success' | 'error';

const fieldClass =
  'w-full min-h-11 rounded-xl border border-subtle bg-surface px-3.5 py-2.5 text-sm text-fg ' +
  'placeholder:text-faint transition-colors focus:border-brand-500 focus:outline-none';

export function Contact() {
  const { t } = useI18n();
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
    const found = validateContactForm(values, t.contact.errors);
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

  const describedBy = (key: keyof ContactFormValues) =>
    errors[key] ? `${formId}-${key}-error` : undefined;

  const errorFor = (key: keyof ContactFormValues) =>
    errors[key] ? (
      <p id={`${formId}-${key}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
        {errors[key]}
      </p>
    ) : null;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Section id={sectionIds.contact} labelledBy="contact-title" tone="muted">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
            align="left"
          />

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-subtle bg-surface p-6">
              <h3 className="font-display font-semibold">{t.contact.asideTitle}</h3>
              <ol className="mt-4 space-y-3">
                {t.contact.asideSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-muted">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 text-xs font-semibold text-brand-600 dark:text-brand-300">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-subtle pt-4 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-9 items-center font-medium text-brand-600 hover:underline dark:text-brand-300"
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-subtle bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col items-center py-10 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CircleCheck aria-hidden="true" className="size-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{t.contact.successTitle}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted">{t.contact.successBody}</p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="mt-6"
                    onClick={() => setStatus('idle')}
                  >
                    {t.contact.successAgain}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.name.label}
                      </label>
                      <input
                        id={`${formId}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) => update('name', event.target.value)}
                        placeholder={t.contact.fields.name.placeholder}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={describedBy('name')}
                        className={cn(fieldClass, errors.name && 'border-red-500/60')}
                      />
                      {errorFor('name')}
                    </div>

                    <div>
                      <label htmlFor={`${formId}-company`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.company.label}
                      </label>
                      <input
                        id={`${formId}-company`}
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={values.company}
                        onChange={(event) => update('company', event.target.value)}
                        placeholder={t.contact.fields.company.placeholder}
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={describedBy('company')}
                        className={cn(fieldClass, errors.company && 'border-red-500/60')}
                      />
                      {errorFor('company')}
                    </div>

                    <div>
                      <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.email.label}
                      </label>
                      <input
                        id={`${formId}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) => update('email', event.target.value)}
                        placeholder={t.contact.fields.email.placeholder}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={describedBy('email')}
                        className={cn(fieldClass, errors.email && 'border-red-500/60')}
                      />
                      {errorFor('email')}
                    </div>

                    <div>
                      <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.phone.label}{' '}
                        <span className="font-normal text-faint">({t.contact.fields.phone.optional})</span>
                      </label>
                      <input
                        id={`${formId}-phone`}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(event) => update('phone', event.target.value)}
                        placeholder={t.contact.fields.phone.placeholder}
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-industry`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.industry.label}
                      </label>
                      <select
                        id={`${formId}-industry`}
                        name="industry"
                        value={values.industry}
                        onChange={(event) => update('industry', event.target.value)}
                        aria-invalid={Boolean(errors.industry)}
                        aria-describedby={describedBy('industry')}
                        className={cn(fieldClass, errors.industry && 'border-red-500/60')}
                      >
                        <option value="">{t.contact.fields.industry.placeholder}</option>
                        {Object.entries(t.contact.industries).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                      {errorFor('industry')}
                    </div>

                    <div>
                      <label htmlFor={`${formId}-topic`} className="mb-1.5 block text-sm font-medium">
                        {t.contact.fields.topic.label}
                      </label>
                      <select
                        id={`${formId}-topic`}
                        name="topic"
                        value={values.topic}
                        onChange={(event) => update('topic', event.target.value)}
                        aria-invalid={Boolean(errors.topic)}
                        aria-describedby={describedBy('topic')}
                        className={cn(fieldClass, errors.topic && 'border-red-500/60')}
                      >
                        <option value="">{t.contact.fields.topic.placeholder}</option>
                        {Object.entries(t.contact.topics).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                      {errorFor('topic')}
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
                      {t.contact.fields.message.label}
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={(event) => update('message', event.target.value)}
                      placeholder={t.contact.fields.message.placeholder}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={describedBy('message')}
                      className={cn(fieldClass, 'resize-y', errors.message && 'border-red-500/60')}
                    />
                    {errorFor('message')}
                  </div>

                  <div aria-live="polite" role="status" className="empty:hidden">
                    {hasErrors ? (
                      <p className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400">
                        <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
                        {t.contact.formErrorSummary}
                      </p>
                    ) : null}
                    {status === 'error' ? (
                      <p className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400">
                        <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                        <span>
                          <span className="font-medium">{t.contact.errorTitle}.</span> {t.contact.errorBody}
                        </span>
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === 'loading'}
                      icon={status === 'loading' ? LoaderCircle : Send}
                      iconPosition={status === 'loading' ? 'left' : 'right'}
                      className={cn(status === 'loading' && '[&_svg]:animate-spin')}
                    >
                      {status === 'loading'
                        ? t.contact.submitting
                        : status === 'error'
                          ? t.contact.retry
                          : t.contact.submit}
                    </Button>
                    <p className="text-xs text-faint">{t.contact.privacy}</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
