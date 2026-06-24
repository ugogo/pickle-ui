import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium select-none',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        lg: 'size-10 text-base',
        md: 'size-8 text-sm',
        sm: 'size-7 text-xs',
      },
    },
  },
);

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
>;

type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image>;

type AvatarRootProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

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

function AvatarRoot({ className, size = 'md', ...props }: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size }), className)}
      data-slot="avatar"
      {...props}
    />
  );
}

const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot, avatarVariants };
export type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps };
