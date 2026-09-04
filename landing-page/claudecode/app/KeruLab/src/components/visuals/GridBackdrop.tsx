import { cn } from '../../lib/cn';

/**
 * Fondo decorativo: rejilla técnica con dos halos de color.
 * Es puramente ornamental (`aria-hidden`) y nunca genera scroll horizontal.
 */
export function GridBackdrop({
  className,
  withHalos = true,
}: {
  className?: string;
  withHalos?: boolean;
}) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {withHalos ? (
        <>
          <div className="animate-pulse-glow absolute -top-32 -left-24 size-[26rem] rounded-full bg-brand-500/20 blur-[100px]" />
          <div className="animate-pulse-glow absolute -right-24 -bottom-40 size-[30rem] rounded-full bg-ai-500/20 blur-[110px] [animation-delay:1.5s]" />
        </>
      ) : null}
    </div>
  );
}
