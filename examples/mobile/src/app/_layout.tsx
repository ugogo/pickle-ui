import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCSSVariable, useUniwind } from 'uniwind';

export default function Layout() {
  const { theme } = useUniwind();
  // APIs that take a color instead of a className read the token in JS.
  const [background, foreground] = useCSSVariable([
    '--color-background',
    '--color-foreground',
  ]);

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: String(background) },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: String(background) },
          headerTintColor: String(foreground),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Pickle projects' }} />
      </Stack>
    </>
  );
}
