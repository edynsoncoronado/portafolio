import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonElementProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { as?: 'button' };

type AnchorElementProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { as: 'a' };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[transform,box-shadow,background-color,color,border-color] duration-200 ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-60 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-500';

const variants: Record<ButtonVariant, string> = {
  primary:
    'text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-ai-500/30 hover:-translate-y-0.5 ' +
    'bg-linear-to-r from-brand-500 via-brand-500 to-ai-500 bg-size-[180%_180%] bg-position-[0%_50%] ' +
    'hover:bg-position-[100%_50%] transition-[background-position,transform,box-shadow] duration-500',
  secondary:
    'border border-strong bg-surface text-fg hover:border-brand-500 hover:text-brand-500 ' +
    'hover:-translate-y-0.5 dark:hover:text-brand-300',
  ghost: 'text-muted hover:text-fg hover:bg-surface-muted',
  subtle:
    'border border-subtle bg-surface-muted/70 text-fg hover:bg-surface-muted hover:border-strong',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm sm:text-[0.95rem]',
  lg: 'min-h-12 px-6 text-base',
};

/**
 * Botón único de la landing. `PrimaryButton` / `SecondaryButton` del brief se
 * resuelven con la prop `variant`, para no duplicar estilos.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const content = (
    <>
      {Icon && iconPosition === 'left' ? (
        <Icon aria-hidden="true" className="size-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {Icon && iconPosition === 'right' ? (
        <Icon
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, icon: _i, iconPosition: _ip, fullWidth: _fw, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, icon: _i, iconPosition: _ip, fullWidth: _fw, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
