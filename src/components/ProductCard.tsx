import { Spacing } from "@/constants/theme";
import { Button, Host, Icon } from "@expo/ui";
import { buttonBorderShape, buttonStyle, controlSize, tint } from '@expo/ui/swift-ui/modifiers';
import { GlassView } from "expo-glass-effect";
import { Image, PlatformColor, Text, View } from "react-native";

type Produto = {
    produto: {
        index: number,
        item: {
            id: number,
            title: string,
            price: number,
            description: string,
            category: string,
            image: string
        }
    }
};



export default function ProductCard({ produto, pressed }: Produto) {
    //console.log(produto)
    return (
        <View style={[produto.index === 0 && { marginLeft: Spacing.three }, { alignContent: "center", marginHorizontal: 5 }]}>
            <GlassView tintColor={PlatformColor("systemGray5")} style={{ width: 250, height: 250, alignItems: "center", justifyContent: "center", borderRadius: 32 }}>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={{ uri: produto.item.image }} />
                <GlassView tintColor="#000000de" style={{ padding: 14, position: "absolute", borderRadius: 15, right: 10, bottom: 10 }}>
                    <Text style={{ color: "#f0f0f0", fontFamily: "RethinkSans_400Regular", fontSize: 14 }}>R${produto.item.price?.toFixed(2)}</Text>
                </GlassView>
                <Host matchContents style={{ position: "absolute", top: 10, left: 10 }}>
                    <Button label="heart" modifiers={[buttonStyle('glass'), controlSize('large'), buttonBorderShape("circle"), tint("#000000de")]} onPress={() => alert('Pressed!')}>
                        <Icon
                            name={Icon.select({
                                ios: 'heart',
                                android: require('@expo/material-symbols/favorite.xml'),
                            })}
                            size={16}
                            color={PlatformColor("label")}
                        />
                    </Button>
                </Host>
            </GlassView>
            <Text numberOfLines={2} style={{ width: 240, marginHorizontal: 5, fontSize: 16, marginTop: Spacing.two, fontFamily: "RethinkSans_600SemiBold", textAlign: "center", color: PlatformColor("label") }}>{produto.item.title}</Text>
            <Text numberOfLines={2} style={{ width: 230, marginHorizontal: 5, fontSize: 12, textAlign: "center", marginTop: Spacing.one, fontFamily: "RethinkSans_400Regular", color: PlatformColor("label") }}>{produto.item.description}</Text>
        </View >
    )
}