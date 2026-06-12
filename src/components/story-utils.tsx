import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function Section({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section>
      <h2 className="text-foreground mb-6 text-xl font-medium">{title}</h2>
      {children}
    </section>
  );
}

export function StoryLayout({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <div className={cn('mx-auto px-8 py-12', className)}>
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        </header>
        <div className="space-y-16">{children}</div>
      </div>
    </div>
  );
}
