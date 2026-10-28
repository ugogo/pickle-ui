import { View } from 'react-native';

import { cn } from '../lib/cn';

export type SeparatorProps = React.ComponentProps<typeof View> & {
  orientation?: 'horizontal' | 'vertical';
};

/**
 * A 1px rule in the border color, like `Separator` in @pickle-ui/react.
 * React Native has no separator role, so it is hidden from screen readers as
 * a decorative line.
 */
export function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <View
      accessibilityElementsHidden
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
      importantForAccessibility="no-hide-descendants"
      {...props}
    />
  );
}
