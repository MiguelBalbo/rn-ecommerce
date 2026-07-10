import { Spacing } from "@/constants/theme";
import { useFav } from "@/services/FavoriteContext";
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { Image, PlatformColor, Pressable, Text, TouchableOpacity, View } from "react-native";

type Produto = {
    produto: {
        index: number,
        item: {
            id: string,
            title: string,
            price: number,
            description: string,
            category: string,
            image: string
        }
    }
};



export default function ProductCard({ produto, pressed }: Produto) {

    const { addToFav, isAlreadySaved, removeFromFav } = useFav();

    return (
        <View style={[produto.index === 0 && { marginLeft: Spacing.three }, { alignContent: "center", marginHorizontal: 5 }]}>
            <View style={{ width: 250, height: 250, alignItems: "center", justifyContent: "center", borderRadius: 32, backgroundColor: PlatformColor("systemGray5") }}>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={{ uri: produto.item.image }} />
                <GlassView tintColor="#000000de" style={{ padding: 14, position: "absolute", borderRadius: 15, right: 10, bottom: 10 }}>
                    <Text style={{ color: "#f0f0f0", fontFamily: "RethinkSans_400Regular", fontSize: 14 }}>R${produto.item.price?.toFixed(2)}</Text>
                </GlassView>
                <Pressable onPress={(e) => {
                    e.stopPropagation()
                }} style={{ position: "absolute", top: 10, left: 12 }}>
                    <TouchableOpacity onPress={() => {
                        {
                            isAlreadySaved(produto.item.id) ?
                                removeFromFav(produto.item.id) :
                                addToFav({
                                    id: produto.item.id,
                                    name: produto.item.title
                                })
                        }
                    }}>
                        <View style={{ backgroundColor: PlatformColor("systemGray6"), padding: Spacing.two, borderRadius: 300 }}>
                            <SymbolView name={isAlreadySaved(produto.item.id) ? {
                                ios: 'heart.fill',
                                android: 'favorite',
                            } : {
                                ios: 'heart',
                                android: 'favorite',
                            }}
                                tintColor={isAlreadySaved(produto.item.id) ? PlatformColor("systemRed") : PlatformColor("label")}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                </Pressable>
            </View>
            <Text numberOfLines={2} style={{ width: 240, marginHorizontal: 5, fontSize: 16, marginTop: Spacing.two, fontFamily: "RethinkSans_600SemiBold", textAlign: "center", color: PlatformColor("label") }}>{produto.item.title}</Text>
            <Text numberOfLines={2} style={{ width: 230, marginHorizontal: 5, fontSize: 12, textAlign: "center", marginTop: Spacing.one, fontFamily: "RethinkSans_400Regular", color: PlatformColor("label") }}>{produto.item.description}</Text>
        </View >
    )
}