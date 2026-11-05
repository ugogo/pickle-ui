import {
  Button,
  Card,
  Drawer,
  Input,
  Text,
  XStack,
} from '@pickle-ui/react-native';
import { requireOptionalNativeModule } from 'expo';
import { lazy, Suspense, useState } from 'react';

// Loaded only when Expo UI's native code is in the app, so a client without it
// (an older Expo Go) shows a note instead of crashing at import.
const ExpoUiSheet = lazy(() => import('./ExpoUiSheet'));
const hasExpoUi = requireOptionalNativeModule('ExpoUI') !== null;

/** Temporary: compares the Drawer with Expo UI's BottomSheet on a device. */
export function SheetComparison() {
  const [open, setOpen] = useState<'drawer' | 'expo-ui' | null>(null);
  const close = () => setOpen(null);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Drawer vs Expo UI</Card.Title>
        <Card.Description>
          The same header, panel and footer in each sheet.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <XStack gap={2}>
          <Button
            className="flex-1"
            onPress={() => setOpen('drawer')}
            variant="outline"
          >
            Drawer
          </Button>
          <Button
            className="flex-1"
            disabled={!hasExpoUi}
            onPress={() => setOpen('expo-ui')}
            variant="outline"
          >
            Expo UI
          </Button>
        </XStack>
        {hasExpoUi ? null : (
          <Text tone="muted" variant="small">
            This client doesn&apos;t include Expo UI&apos;s native code.
          </Text>
        )}
      </Card.Content>

      <Drawer
        onOpenChange={(next) => setOpen(next ? 'drawer' : null)}
        open={open === 'drawer'}
      >
        <Drawer.Content>
          <SheetBody onClose={close} />
        </Drawer.Content>
      </Drawer>

      {hasExpoUi ? (
        <Suspense fallback={null}>
          <ExpoUiSheet onClose={close} open={open === 'expo-ui'}>
            <SheetBody onClose={close} />
          </ExpoUiSheet>
        </Suspense>
      ) : null}
    </Card>
  );
}

/** The same parts in both sheets, so only the sheet itself differs. */
function SheetBody({ onClose }: { onClose: () => void }) {
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Share link</Drawer.Title>
        <Drawer.Description>
          Anyone with the link can view this project.
        </Drawer.Description>
      </Drawer.Header>
      <Drawer.Panel>
        <Input readOnly value="https://pickle-ui.dev/p/8f2a" />
      </Drawer.Panel>
      <Drawer.Footer>
        <Button onPress={onClose} variant="outline">
          Cancel
        </Button>
        <Button onPress={onClose}>Copy link</Button>
      </Drawer.Footer>
    </>
  );
}
