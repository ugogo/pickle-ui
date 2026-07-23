import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import * as React from 'react';

import { cn } from '@/lib/utils';

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
>;

type AvatarGroupChildProps = {
  className?: string;
  style?: React.CSSProperties;
};

type AvatarGroupProps = React.ComponentProps<'div'>;

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

function AvatarGroup({ children, className, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn('flex -space-x-3', className)}
      data-slot="avatar-group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<AvatarGroupChildProps>(child)) {
          return child;
        }

        return React.cloneElement(child, {
          className: cn(
            'ring-background relative ring-2',
            child.props.className,
          ),
          style: {
            ...child.props.style,
            zIndex: index + 1,
          },
        });
      })}
    </div>
  );
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn('size-full object-cover', className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarRoot({ className, ...props }: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'bg-background inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full align-middle text-xs font-medium select-none',
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Group: AvatarGroup,
  Image: AvatarImage,
});

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage, AvatarRoot };
export type {
  AvatarFallbackProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarRootProps,
};
