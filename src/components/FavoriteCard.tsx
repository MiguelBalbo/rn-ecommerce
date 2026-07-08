import { Spacing } from "@/constants/theme";
import { FavsItem, useFav } from "@/services/FavoriteContext";
import { GlassView } from "expo-glass-effect";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, PlatformColor, Text, TouchableOpacity, View } from "react-native";

type ItemFav = {
    favItem: {
        index: number,
        item: FavsItem
    }
}

export default function CartCard(favItem: ItemFav) {

    const [precoProduto, setPrecoProduto] = useState();
    const [urlProduto, setUrlProduto] = useState();

    useEffect(() => {
        async function carregarProduto() {
            const response = await fetch(`https://fakestoreapi.com/products/${favItem.favItem.item.id}`);
            const data = await response.json();
            setPrecoProduto(data.price);
            setUrlProduto(data.image);
        }
        carregarProduto();
    }, []);

    const { removeFromFav } = useFav()

    const alertRemocao = () => {
        Alert.alert(
            "Remover Produto",
            `Tem certeza que deseja remover ${favItem.favItem.item.name} dos favoritos?`,
            [{
                text: "Cancelar",
                onPress: () => console.log("Cancelou"),
                style: "cancel"
            }, {
                text: "Remover",
                onPress: () => removeFromFav(favItem.favItem.item.id),
                style: "destructive"
            }]
        );
    };


    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/produto/[id]", params: { id: favItem.favItem.item.id } })}>

            <GlassView style={{ borderRadius: 24, marginVertical: 5, padding: Spacing.three }}>
                <View style={{ flexDirection: "row", width: '100%', alignItems: 'center' }}>
                    <Image source={{ uri: urlProduto }} style={{ width: 100, height: 100, resizeMode: "contain" }} />
                    <View style={{ gap: 5, flex: 1 }}>
                        <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 18, color: PlatformColor("label"), flexShrink: 1 }}>{favItem.favItem.item.name}</Text>
                        <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 16, color: PlatformColor("label") }}>Preço: R$ {(precoProduto * 1).toFixed(2)}</Text>

                    </View>
                </View>
            </GlassView>

        </TouchableOpacity>
    )
}