import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out-expo disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-plum-500 text-white hover:bg-plum-600 hover:-translate-y-0.5 shadow-sm',
  secondary: 'bg-teal-500 text-white hover:bg-teal-600 hover:-translate-y-0.5 shadow-sm',
  ghost: 'border border-plum-300 text-plum-600 hover:border-plum-500 hover:bg-plum-50',
  light: 'bg-white text-plum-600 hover:bg-cream border border-line',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' };
type NativeProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };

export function Button(props: LinkProps | NativeProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.as === 'button') {
    const { as: _as, ...buttonProps } = rest as NativeProps;
    return (
      <button className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const { as: _as, ...anchorProps } = rest as LinkProps;
  return (
    <a className={classes} {...anchorProps}>
      {children}
    </a>
  );
}
