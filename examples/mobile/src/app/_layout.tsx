import '../global.css';

import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular';
import { Nunito_500Medium } from '@expo-google-fonts/nunito/500Medium';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { useColorToken } from '@pickle-ui/react-native';
import { type FontFamilyDefinition, useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

/*
 * The faces of the family global.css sets as `--font-sans`, one per weight
 * Pickle's components use. They share one `fontFamily`, so each text's weight
 * picks its face.
 */
const FONTS: FontFamilyDefinition[] = [
  {
    fontDefinitions: [
      { path: Nunito_400Regular, weight: 400 },
      { path: Nunito_500Medium, weight: 500 },
      { path: Nunito_600SemiBold, weight: 600 },
    ],
    fontFamily: 'Nunito',
  },
];

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts(FONTS);
  const { theme } = useUniwind();
  const background = useColorToken('background');
  const foreground = useColorToken('foreground');

  // Wait for the font, or text drawn before it loads keeps the system font.
  // If it fails to load, the system font stands in.
  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: background },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: background },
          headerTintColor: foreground,
          headerTitleStyle: { fontFamily: 'Nunito', fontWeight: '600' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Pickle projects' }} />
      </Stack>
    </>
  );
}
