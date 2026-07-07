import { CartProvider } from '@/services/CartContext';
import { RethinkSans_400Regular, RethinkSans_600SemiBold, useFonts } from '@expo-google-fonts/rethink-sans';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        RethinkSans_400Regular,
        RethinkSans_600SemiBold
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <CartProvider>
                <Stack>
                    {/* Oculta o cabeçalho das abas porque elas já têm layout próprio */}
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    {/* Configura o cabeçalho da página de produto */}
                    <Stack.Screen name="produto/[id]" options={{
                        title: 'Detalhes do Produto',
                        headerBackTitle: "Voltar",
                        headerTitleAlign: "center",
                        headerTitleStyle: { fontFamily: "RethinkSans_400Regular" },
                    }} />
                </Stack>
            </CartProvider>
        </ThemeProvider>
    );
}