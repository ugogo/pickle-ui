import { BottomSheet, RNHostView, type SnapPoint } from '@expo/ui';
import { createContext, use, useMemo } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { useColorToken } from '../hooks/useColorToken';
import { cn } from '../lib/cn';
import { useControllableState } from './_internal/useControllableState';
import { Button, type ButtonProps } from './Button';
import { Text, type TextProps } from './Text';

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  snapPoints?: readonly number[];
};
/** The DOM members the web fix uses: the package compiles without the DOM lib. */
type WebAnimationEvent = { animationName: string; target: unknown };

type WebElement = {
  addEventListener: (
    type: 'animationend',
    listener: (event: WebAnimationEvent) => void,
  ) => void;
  closest: (selector: string) => null | WebElement;
  removeEventListener: (
    type: 'animationend',
    listener: (event: WebAnimationEvent) => void,
  ) => void;
  style: { animation: string; transform: string };
};

const DrawerContext = createContext<DrawerContextValue | null>(null);
/** Whether the content shows its close button, which the header keeps clear of. */
const DrawerCloseButtonContext = createContext(false);

export type DrawerCloseProps = ButtonProps;

export type DrawerContentProps = React.ComponentProps<typeof View> & {
  /** Accessible name of the close icon button. Defaults to `"Close"`. */
  closeLabel?: string;
  /**
   * Renders a close icon button in the top-right corner. Defaults to `false`.
   */
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
  /**
   * Heights the sheet rests at, as Base UI's: a number from 0 to 1 is a
   * fraction of the screen's height, a larger one a height in points. Android
   * rests at half or full height, the nearest to each. Without them, the sheet
   * sizes to its content.
   */
  snapPoints?: readonly number[];
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
  const { setOpen } = useDrawer('Close');

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
 * to its content, or to the drawer's `snapPoints`.
 */
function DrawerContent({
  children,
  className,
  closeLabel = 'Close',
  showCloseButton = false,
  ...props
}: DrawerContentProps) {
  const { open, setOpen, snapPoints } = useDrawer('Content');
  const background = useColorToken('popover');
  const content = (
    <View
      aria-modal
      className={cn(snapPoints && 'h-0 grow', className)}
      {...props}
    >
      <DrawerCloseButtonContext value={showCloseButton}>
        {children}
      </DrawerCloseButtonContext>
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
  );

  return (
    <BottomSheet
      containerColor={background}
      // The parts pad themselves; the top clears the grabber and, with the
      // header's 4pt, matches the web header's 24px.
      contentPadding={{ top: 20 }}
      isPresented={open}
      // A swipe, a tap on the backdrop or Android's back button.
      onDismiss={() => setOpen(false)}
      snapPoints={snapPoints?.map(toSnapPoint)}
    >
      {Platform.OS === 'web' ? (
        <>
          <View aria-hidden ref={keepWebSheetDraggable} />
          {content}
        </>
      ) : (
        // SwiftUI and Compose lay out what they host: the content takes the
        // sheet's width, and its height from itself or from the snap point.
        <RNHostView matchContents={snapPoints ? false : { vertical: true }}>
          {content}
        </RNHostView>
      )}
    </BottomSheet>
  );
}

function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return <Text className={className} tone="muted" variant="body" {...props} />;
}

/** The sheet keeps its content above the home indicator, so no bottom inset. */
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
  const hasCloseButton = use(DrawerCloseButtonContext);

  return (
    <View
      // A shorter top than the web's: the sheet's grabber sits above it.
      className={cn(
        'gap-1.5 px-6 pt-1 pb-6',
        hasCloseButton && 'pe-12',
        className,
      )}
      {...props}
    />
  );
}

/**
 * The scrolling body between the header and the footer. With snap points, it
 * fills the height they leave.
 */
function DrawerPanel({
  className,
  contentContainerClassName,
  ...props
}: DrawerPanelProps) {
  const { snapPoints } = useDrawer('Panel');

  return (
    <ScrollView
      // Pulled 4pt into the header's padding and padded back, so a field's 3pt
      // focus ring at the top isn't clipped by the scroll view.
      className={cn('-mt-1 shrink', snapPoints ? 'grow' : 'grow-0', className)}
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
  snapPoints,
}: DrawerProps) {
  const [open, setOpen] = useControllableState(
    openProp,
    defaultOpen,
    onOpenChange,
  );
  const value = useMemo(
    () => ({ open, setOpen, snapPoints }),
    [open, setOpen, snapPoints],
  );

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
  const { setOpen } = useDrawer('Trigger');

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

/**
 * Expo UI's web sheet holds its enter animation's last frame over an inline
 * `translateY(100%)`, and an animation outranks the inline `translateY` a
 * downward drag writes, so the sheet stayed put under the pointer. Once the
 * sheet is in, both go and the drag shows.
 */
function keepWebSheetDraggable(node: unknown) {
  const panel = (node as null | WebElement)?.closest(
    '[data-expo-ui-bottom-sheet-panel]',
  );
  if (!panel) return;

  const onAnimationEnd = (event: WebAnimationEvent) => {
    if (event.target !== panel || event.animationName !== 'expo-ui-sheet-in') {
      return;
    }
    panel.style.animation = '';
    panel.style.transform = '';
  };
  panel.addEventListener('animationend', onAnimationEnd);
  return () => panel.removeEventListener('animationend', onAnimationEnd);
}

/** A snap point as Expo UI takes it: a fraction up to 1, points beyond. */
function toSnapPoint(snapPoint: number): SnapPoint {
  return snapPoint <= 1 ? { fraction: snapPoint } : { height: snapPoint };
}

function useDrawer(part: string) {
  const context = use(DrawerContext);
  if (!context) throw new Error(`Drawer.${part} must be inside a Drawer.`);
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
