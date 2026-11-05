import { TrueSheet } from '@lodev09/react-native-true-sheet';
import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, View } from 'react-native';

import { useColorToken } from '../hooks/useColorToken';
import { cn } from '../lib/cn';
import { useControllableState } from './_internal/useControllableState';
import { Button, type ButtonProps } from './Button';
import { Text, type TextProps } from './Text';

// The web's `inset` gap, used where True Sheet draws a floating card (web).
const INSET = 8;

type DrawerContentContextValue = {
  /** The panel's scroll view, handed to True Sheet for nested scrolling. */
  scrollableRef: React.RefObject<null | ScrollViewInstance>;
};

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type DrawerVariant = 'attached' | 'inset' | 'straight';

type Presence = { mounted: boolean; open: boolean };

type ScrollViewInstance = React.ComponentRef<typeof ScrollView>;

const DrawerContext = createContext<DrawerContextValue | null>(null);
const DrawerContentContext = createContext<DrawerContentContextValue>({
  scrollableRef: { current: null },
});

function useDrawer() {
  const context = use(DrawerContext);
  if (!context) throw new Error('Drawer parts must be rendered in a <Drawer>.');
  return context;
}

/** Unmounts the content once the sheet is closed and stays closed. */
const unmountClosed = (current: Presence) =>
  current.open ? current : { ...current, mounted: false };

export type DrawerCloseProps = ButtonProps;

export type DrawerContentProps = React.ComponentProps<typeof View> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Renders a close icon button in the top-right corner. Defaults to `true`. */
  showCloseButton?: boolean;
  /**
   * `inset` floats the sheet away from the screen's edges, `attached` docks
   * it with the platform's rounded corners, and `straight` docks it without
   * rounding. On iOS 26 the system floats a sheet at its compact height
   * whatever the variant. Defaults to `inset`.
   */
  variant?: DrawerVariant;
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
 * The bottom sheet, presented by the platform through True Sheet:
 * `UISheetPresentationController` on iOS, Material's bottom sheet on Android.
 * The system draws the grabber and the dimmed backdrop, follows the finger,
 * hands drags between the sheet and `Drawer.Panel`, and avoids the keyboard
 * and the home indicator. The sheet sizes itself to its content.
 */
function DrawerContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = true,
  variant = 'inset',
  ...props
}: DrawerContentProps) {
  const { open, setOpen } = useDrawer();
  const sheetRef = useRef<TrueSheet>(null);
  const scrollableRef = useRef<null | ScrollViewInstance>(null);
  // Whether the sheet is up, so closing never dismisses it twice.
  const presentedRef = useRef(false);
  const background = useColorToken('popover');

  // The content stays mounted until the sheet has finished dismissing. One
  // state, so the open change and the mount land in the same update.
  const [presence, setPresence] = useState<Presence>({ mounted: open, open });
  if (presence.open !== open) {
    setPresence({ mounted: open || presence.mounted, open });
  }

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (open) {
      presentedRef.current = true;
      void sheet.present();
    } else if (presentedRef.current) {
      presentedRef.current = false;
      void sheet.dismiss().then(() => setPresence(unmountClosed));
    }
  }, [open]);

  const contentContext = useMemo(() => ({ scrollableRef }), []);

  return (
    <TrueSheet
      backgroundColor={background}
      cornerRadius={variant === 'straight' ? 0 : undefined}
      detached={variant === 'inset'}
      detachedOffset={INSET}
      detents={['auto']}
      // A swipe, a tap on the backdrop or Android's back button.
      onDidDismiss={() => {
        presentedRef.current = false;
        if (open) setOpen(false);
        setPresence(unmountClosed);
      }}
      ref={sheetRef}
      scrollableRef={scrollableRef}
    >
      {presence.mounted ? (
        <View aria-modal className={cn('pt-2', className)} {...props}>
          <DrawerContentContext value={contentContext}>
            {children}
          </DrawerContentContext>
          {showCloseButton ? (
            <Button
              accessibilityLabel={closeLabel}
              className="absolute end-3 top-3"
              onPress={() => setOpen(false)}
              size="icon-sm"
              variant="ghost"
            >
              <CloseIcon />
            </Button>
          ) : null}
        </View>
      ) : null}
    </TrueSheet>
  );
}

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return <Text className={className} tone="muted" variant="body" {...props} />;
}

/** The sheet insets itself from the home indicator, so the footer doesn't. */
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
      className={cn('gap-1.5 px-6 pe-12 pt-4 pb-4', className)}
      {...props}
    />
  );
}

/** The scrolling body between the header and the footer. */
function DrawerPanel({
  className,
  contentContainerClassName,
  ref,
  ...props
}: DrawerPanelProps) {
  const { scrollableRef } = use(DrawerContentContext);

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
      ref={(node) => {
        scrollableRef.current = node;
        if (typeof ref === 'function') return ref(node);
        if (ref) ref.current = node;
      }}
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
