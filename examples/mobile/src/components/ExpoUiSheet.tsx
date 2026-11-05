import { BottomSheet } from '@expo/ui';
import { useColorToken } from '@pickle-ui/react-native';

type ExpoUiSheetProps = {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
};

/**
 * Expo UI's universal `BottomSheet`: SwiftUI's sheet on iOS, Material's on
 * Android. The system draws the shape, the grabber and the backdrop; we only
 * paint its background with the `popover` token and fill it with Drawer parts.
 */
export default function ExpoUiSheet({
  children,
  onClose,
  open,
}: ExpoUiSheetProps) {
  const background = useColorToken('popover');

  return (
    <BottomSheet
      containerColor={background}
      contentPadding={{ top: 8 }}
      isPresented={open}
      onDismiss={onClose}
    >
      {children}
    </BottomSheet>
  );
}
