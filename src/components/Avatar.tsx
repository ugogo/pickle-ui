import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import * as React from 'react';

import { cn } from '@/lib/utils';

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
>;

type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

type AvatarRootProps = React.ComponentProps<typeof AvatarPrimitive.Root>;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full',
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square size-full object-cover', className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarRoot({ className, ...props }: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'bg-muted relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-medium select-none',
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot };
export type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps };
