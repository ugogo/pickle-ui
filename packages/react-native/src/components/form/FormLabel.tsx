import { Text } from 'react-native';

import { cn } from '../../lib/cn';

export type FormLabelProps = React.ComponentProps<typeof Text>;

export function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <Text
      className={cn(
        'text-foreground font-sans text-sm leading-none font-medium',
        className,
      )}
      {...props}
    />
  );
}
