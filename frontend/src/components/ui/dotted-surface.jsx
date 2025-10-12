import { cn } from '@/lib/utils';

export function DottedSurface({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'relative bg-background overflow-hidden',
        '[background-image:radial-gradient(hsl(var(--foreground)/0.25)_1.2px,transparent_1.2px)]',
        '[background-size:18px_18px]',
        'animate-[wave_20s_ease-in-out_infinite]',
        className
      )}
      style={{
        backgroundPosition: '0 0',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
