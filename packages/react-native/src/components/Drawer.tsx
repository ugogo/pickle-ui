import { BottomSheet } from '@expo/ui';
import { createContext, use, useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { useColorToken } from '../hooks/useColorToken';
import { cn } from '../lib/cn';
import { useControllableState } from './_internal/useControllableState';
import { Button, type ButtonProps } from './Button';
import { Text, type TextProps } from './Text';

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export type DrawerCloseProps = ButtonProps;

export type DrawerContentProps = React.ComponentProps<typeof View> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `false`. */
  showCloseButton?: boolean;
};

export type DrawerDescriptionProps = Omit<TextProps, 'tone' | 'variant'>;
export type DrawerFooterProps = React.ComponentProps<typeof View>;
export type DrawerHeaderProps = React.ComponentProps<typeof View>;
export type DrawerPanelProps = React.ComponentProps<typeof ScrollView>;
export type DrawerProps = {
  children?: React.ReactNode;
  /** Whether the drawer is initially open. Defaults to `false`. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the drawer is open. Use with `onOpenChange` to control it. */
  open?: boolean;
};
export type DrawerTitleProps = Omit<TextProps, 'tone' | 'variant'>;
export type DrawerTriggerProps = ButtonProps;
/** The web's `IconX`, drawn with two bars: the package ships no icon set. */
function CloseIcon() {
  return (
    <View className="size-4 items-center justify-center opacity-80">
      <View className="bg-foreground absolute h-[1.5px] w-4 rotate-45 rounded-full" />
      <View className="bg-foreground absolute h-[1.5px] w-4 -rotate-45 rounded-full" />
    </View>
  );
}

function DrawerClose({ onPress, ...props }: DrawerCloseProps) {
  const { setOpen } = useDrawer();

  return (
    <Button
      onPress={(event) => {
        onPress?.(event);
        setOpen(false);
      }}
      {...props}
    />
  );
}

/**
 * The bottom sheet, presented through Expo UI's `BottomSheet`: SwiftUI's sheet
 * on iOS, Material's on Android, a `<dialog>` on the web. The system draws the
 * sheet's shape, grabber and backdrop, follows the finger and sizes the sheet
 * to its content.
 */
function DrawerContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = false,
  ...props
}: DrawerContentProps) {
  const { open, setOpen } = useDrawer();
  const background = useColorToken('popover');

  return (
    <BottomSheet
      containerColor={background}
      // The parts pad themselves; the top clears the grabber.
      contentPadding={{ top: 8 }}
      isPresented={open}
      // A swipe, a tap on the backdrop or Android's back button.
      onDismiss={() => setOpen(false)}
    >
      <View aria-modal className={className} {...props}>
        {children}
        {showCloseButton ? (
          <Button
            accessibilityLabel={closeLabel}
            className="absolute end-3 top-1"
            onPress={() => setOpen(false)}
            size="icon-sm"
            variant="ghost"
          >
            <CloseIcon />
          </Button>
        ) : null}
      </View>
    </BottomSheet>
  );
}

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return <Text className={className} tone="muted" variant="body" {...props} />;
}

/** The sheet keeps its content above the home indicator, so the footer doesn't pad for it. */
function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <View
      className={cn(
        'border-border bg-muted/72 flex-col-reverse gap-2 border-t px-6 py-4',
        className,
      )}
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <View
      className={cn('gap-1.5 px-6 pe-12 pt-1 pb-4', className)}
      {...props}
    />
  );
}

/** The scrolling body between the header and the footer. */
function DrawerPanel({
  className,
  contentContainerClassName,
  ...props
}: DrawerPanelProps) {
  return (
    <ScrollView
      // Pulled 4pt into the header's padding and padded back, so a field's 3pt
      // focus ring at the top isn't clipped by the scroll view.
      className={cn('-mt-1 shrink grow-0', className)}
      contentContainerClassName={cn(
        'px-6 pt-1 pb-6',
        contentContainerClassName,
      )}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
}

function DrawerRoot({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
}: DrawerProps) {
  const [open, setOpen] = useControllableState(
    openProp,
    defaultOpen,
    onOpenChange,
  );
  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return <DrawerContext value={value}>{children}</DrawerContext>;
}

function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <Text
      className={cn('font-heading leading-snug font-semibold', className)}
      variant="h4"
      {...props}
    />
  );
}

function DrawerTrigger({ onPress, ...props }: DrawerTriggerProps) {
  const { setOpen } = useDrawer();

  return (
    <Button
      onPress={(event) => {
        onPress?.(event);
        setOpen(true);
      }}
      {...props}
    />
  );
}

function useDrawer() {
  const context = use(DrawerContext);
  if (!context) throw new Error('Drawer parts must be rendered in a <Drawer>.');
  return context;
}

const Drawer = Object.assign(DrawerRoot, {
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Panel: DrawerPanel,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
});

export { Drawer };
