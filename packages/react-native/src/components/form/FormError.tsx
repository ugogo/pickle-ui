import { Text } from 'react-native';

import { cn } from '../../lib/cn';

export type FormErrorProps = React.ComponentProps<typeof Text>;

/** Announced by screen readers when it appears, like the web's live error. */
export function FormError({ className, ...props }: FormErrorProps) {
  return (
    <Text
      accessibilityLiveRegion="polite"
      className={cn(
        'text-destructive font-sans text-sm font-medium',
        className,
      )}
      role="alert"
      {...props}
    />
  );
}
