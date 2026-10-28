import { View } from 'react-native';

import { cn } from '../lib/cn';

export type SeparatorProps = React.ComponentProps<typeof View> & {
  orientation?: 'horizontal' | 'vertical';
};

/**
 * A 1px rule in the border color, like `Separator` in @pickle-ui/react. Its
 * `separator` role reaches screen readers on the web; iOS and Android have no
 * separator trait, so they skip it like any non-focusable view.
 */
export function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <View
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
      role="separator"
      {...props}
    />
  );
}
