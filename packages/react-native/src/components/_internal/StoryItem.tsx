import { View } from 'react-native';

import { cn } from '../../lib/cn';
import { Text } from '../Text';

/** A labelled box for the layout stories. */
export function StoryItem({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <View
      className={cn(
        'border-border bg-muted items-center justify-center rounded-md border px-4 py-3',
        className,
      )}
    >
      <Text>{children}</Text>
    </View>
  );
}
