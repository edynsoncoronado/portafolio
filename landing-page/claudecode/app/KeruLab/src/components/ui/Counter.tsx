import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../lib/cn';

/** Número que cuenta hacia arriba al entrar en pantalla. */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, value: current } = useCountUp(value);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
