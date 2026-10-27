import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

import { useColorToken } from '../lib/useColorToken';

export default function Layout() {
  const { theme } = useUniwind();
  const background = useColorToken('background');
  const foreground = useColorToken('foreground');

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: background },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: background },
          headerTintColor: foreground,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Pickle projects' }} />
      </Stack>
    </>
  );
}
