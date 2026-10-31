import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SimplePageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SimplePage({ title, description, children, className }: SimplePageProps) {
  return (
    <div className={cn('container max-w-3xl py-12', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-8 text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

/** Helper to build metadata for static info pages. */
export function infoMetadata(title: string, description: string): Metadata {
  return { title, description };
}
