import { Spacing } from "@/constants/theme";
import { useCart } from "@/services/CartContext";
import { CartItem } from "@/types/itemCarrinhoType";
import { GlassView } from "expo-glass-effect";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Alert, Image, PlatformColor, Pressable, Text, TouchableOpacity, View } from "react-native";

type ItemCar = {
    cartItem: {
        index: number
        item: CartItem
    }
}

export default function CartCard(cartItem: ItemCar) {

    const [precoProduto, setPrecoProduto] = useState();
    const [urlProduto, setUrlProduto] = useState();

    useEffect(() => {
        async function carregarProduto() {
            const response = await fetch(`https://fakestoreapi.com/products/${cartItem.cartItem.item.id}`);
            const data = await response.json();
            setPrecoProduto(data.price);
            setUrlProduto(data.image);
        }
        carregarProduto();
    }, []);

    const { removeFromCart } = useCart()

    const alertRemocao = () => {
        Alert.alert(
            "Remover Produto",
            `Tem certeza que deseja remover ${cartItem.cartItem.item.name} do carrinho?`,
            [{
                text: "Cancelar",
                onPress: () => console.log("Cancelou"),
                style: "cancel"
            }, {
                text: "Remover",
                onPress: () => removeFromCart(cartItem.cartItem.item.id),
                style: "destructive"
            }]
        );
    };


    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/produto/[id]", params: { id: cartItem.cartItem.item.id } })}>

            <GlassView style={{ borderRadius: 24, marginVertical: 5, padding: Spacing.three }}>
                <View style={{ flexDirection: "row", width: '100%', alignItems: 'center' }}>
                    <Image source={{ uri: urlProduto }} style={{ width: 100, height: 100, resizeMode: "contain" }} />
                    <View style={{ gap: 5, flex: 1 }}>
                        <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 18, color: PlatformColor("label"), flexShrink: 1 }}>{cartItem.cartItem.item.name}</Text>

                        <Pressable onPress={(e) => e.stopPropagation()} style={{ borderColor: PlatformColor("secondaryLabel"), flexDirection: "row", alignItems: "center", padding: 5, borderWidth: 1, alignSelf: "flex-start", borderRadius: 20 }}>

                            <TouchableOpacity style={{ marginRight: 3 }} onPress={() => { }}>
                                <View style={{ backgroundColor: PlatformColor("systemGray6"), padding: 7, borderRadius: 300, marginLeft: 3, marginRight: 3 }}>
                                    <SymbolView name={{
                                        ios: 'plus',
                                        android: 'add',
                                    }}
                                        tintColor={PlatformColor("label")}
                                        size={12}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 18, color: PlatformColor("label") }}>{cartItem.cartItem.item.quantity}</Text>
                            <TouchableOpacity onPress={() => {
                                cartItem.cartItem.item.quantity > 1 ?
                                    removeFromCart(cartItem.cartItem.item.id) : alertRemocao()
                            }}>
                                <View style={{ backgroundColor: PlatformColor("systemGray6"), padding: 7, borderRadius: 300, marginLeft: 10 }}>
                                    <SymbolView name={cartItem.cartItem.item.quantity > 1 ? {
                                        ios: 'minus',
                                        android: 'remove',
                                    } : {
                                        ios: 'trash',
                                        android: 'delete',
                                    }}
                                        tintColor={cartItem.cartItem.item.quantity > 1 ? PlatformColor("label") : PlatformColor("systemRed")}
                                        size={12}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Pressable>

                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <View style={{ alignSelf: "flex-start", backgroundColor: PlatformColor("secondarySystemFill"), flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: Spacing.one, paddingHorizontal: Spacing.two, borderRadius: 20 }}>
                                <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 14, color: PlatformColor("label") }}>Cor: </Text>
                                <View style={{ width: 12, height: 12, backgroundColor: cartItem.cartItem.item.properties.cor?.cor, borderRadius: 100, borderColor: PlatformColor("label"), borderWidth: 1 }}></View>
                                <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 14, color: PlatformColor("label") }}>{cartItem.cartItem.item.properties.cor?.label}</Text>

                            </View>
                            <View style={{ alignSelf: "flex-start", backgroundColor: PlatformColor("secondarySystemFill"), flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: Spacing.one, paddingHorizontal: Spacing.two, borderRadius: 20 }}>
                                <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 14, color: PlatformColor("label") }}>Tamanho: </Text>
                                <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 14, color: PlatformColor("label"), textTransform: "capitalize" }}>{cartItem.cartItem.item.properties.tamanho}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 16, color: PlatformColor("label") }}> Preço: R$ {(precoProduto * cartItem.cartItem.item.quantity).toFixed(2)}</Text>

                    </View>
                </View>
            </GlassView>

        </TouchableOpacity>
    )
}