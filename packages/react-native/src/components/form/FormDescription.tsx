import { Text } from 'react-native';

import { cn } from '../../lib/cn';

export type FormDescriptionProps = React.ComponentProps<typeof Text>;

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  return (
    <Text
      className={cn('text-muted-foreground font-sans text-sm', className)}
      {...props}
    />
  );
}
