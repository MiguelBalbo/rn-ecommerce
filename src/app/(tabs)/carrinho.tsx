import CartCard from "@/components/CartCard";
import { Colors, Spacing } from "@/constants/theme";
import { useCart } from "@/services/CartContext";
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { FlatList, Platform, PlatformColor, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function carrinho() {

    const { cart } = useCart();

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';


    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: Spacing.three, paddingTop: 60, flex: 1 }}>
                <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 30, color: PlatformColor("label") }}>Carrinho</Text>
                <FlatList
                    data={cart}
                    renderItem={(ic) => <CartCard cartItem={ic} key={ic.item.id} />}
                    keyExtractor={ic => ic.id}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: Platform.OS === "android" ? 87 : 175 }}
                />
            </View>
            <TouchableOpacity style={{ position: "absolute", bottom: Platform.OS === "android" ? 10 : 100, left: 0, right: 0, marginHorizontal: Spacing.three }}>
                <GlassView
                    tintColor={PlatformColor("label")}
                    style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 30, paddingHorizontal: Spacing.three, paddingVertical: Spacing.three }, Platform.OS === "android" && { backgroundColor: isDarkMode ? Colors.dark.text : Colors.light.text }]}
                >
                    <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 20, color: isDarkMode ? Colors.dark.background : Colors.light.background }}>Checkout</Text>
                    <SymbolView name={{
                        ios: 'cart.fill',
                        android: 'shopping_cart_checkout',
                    }}
                        tintColor={isDarkMode ? Colors.dark.background : Colors.light.background}
                        size={24}
                    />
                </GlassView>
            </TouchableOpacity>

        </View>
    )
}