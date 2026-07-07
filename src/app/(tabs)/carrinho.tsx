import CartCard from "@/components/CartCard";
import { Spacing } from "@/constants/theme";
import { useCart } from "@/services/CartContext";
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { PlatformColor, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function carrinho() {

    const { cart } = useCart();



    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: Spacing.three, paddingTop: 60, flex: 1 }}>
                <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 30, color: PlatformColor("label") }}>Carrinho</Text>
                <ScrollView style={{ flex: 1 }}>

                    {cart.map(ic => {
                        return (
                            <CartCard cartItem={ic} key={ic.id} />
                        )
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity style={{ position: "absolute", bottom: 100, left: 0, right: 0, marginHorizontal: Spacing.three }}>
                <GlassView
                    tintColor={PlatformColor("label")}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 30, paddingHorizontal: Spacing.three, paddingVertical: Spacing.three }}
                >
                    <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 20, color: PlatformColor("systemBackground") }}>Checkout</Text>
                    <SymbolView name={{
                        ios: 'cart.fill',
                        android: 'shopping_cart_checkout',
                    }}
                        tintColor={PlatformColor("systemBackground")}
                        size={24}
                    />
                </GlassView>
            </TouchableOpacity>

        </View>
    )
}