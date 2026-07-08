import { Spacing } from '@/constants/theme';
import { useCart } from '@/services/CartContext';
import { useFav } from '@/services/FavoriteContext';
import { Host, Picker, Row } from '@expo/ui';
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import * as React from "react";
import { useEffect, useState } from 'react';
import { Image, PlatformColor, Pressable, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination, } from "react-native-reanimated-carousel";



export default function Produto() {

    const { id } = useLocalSearchParams();
    const [produto, setProduto] = useState([]);
    const { addToFav, isAlreadySaved, removeFromFav } = useFav();

    console.log(produto);



    useEffect(() => {
        async function carregarProdutos() {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduto(data);
        }
        carregarProdutos();
    }, []);

    const imagensCarr = [
        { uri: produto.image }
    ];

    //console.log(imagensCarr);

    const tamanhos = [
        { label: 'P', value: 'p' },
        { label: 'M', value: 'm' },
        { label: 'G', value: 'g' },
    ];

    const [valueT, setValueT] = useState(tamanhos[0].value);

    const cores = [
        { label: 'Azul', value: 'azul', hex: "#0000ff" },
        { label: 'Vermelho', value: 'vermelho', hex: "#FF0000" },
        { label: 'Verde', value: 'verde', hex: "#00FF00" },
    ];

    const [valueC, setValueC] = useState(cores[0].value);

    const getCorAtual = () => {
        const corAchada = cores.find((c) => c.value == valueC)
        return corAchada.hex
    }

    const [open, setOpen] = useState(true);


    const scrollOffsetValue = useSharedValue<number>(0);
    const progress = useSharedValue<number>(0);
    const ref = React.useRef<ICarouselInstance>(null);
    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const cher = async () => {
        try {
            // Dispara a janela nativa de compartilhamento
            await Share.share({
                message: `Confira este produto incrível que encontrei!`,
                url: `minhaloja://produto/${id}`
            });
        } catch (error) {
            console.log("Erro ao compartilhar:", error);
        }
    }

    //carrinho
    const { addToCart } = useCart();
    const { cart } = useCart();

    return (
        <View style={{ flex: 1 }}>

            <ScrollView style={{ paddingHorizontal: Spacing.three }} contentContainerStyle={{ paddingBottom: 80, paddingTop: 20 }}>
                <GlassView
                    id="carousel-component"
                    dataSet={{ kind: "basic-layouts", name: "normal" }}
                    style={{ justifyContent: "center", alignItems: "center", width: 350, alignSelf: 'center', borderRadius: 35, padding: 10, marginTop: 10, position: "relative" }}
                >
                    <Carousel
                        testID={"normal-carousel-demo"}
                        loop={true}
                        snapEnabled={true}
                        pagingEnabled={true}
                        autoPlayInterval={2000}
                        data={imagensCarr}
                        scrollOffsetValue={scrollOffsetValue}
                        style={{ marginBottom: 10 }}
                        width={350}
                        height={350}
                        onScrollStart={() => {
                            console.log("Scroll start");
                        }}
                        onScrollEnd={() => {
                            console.log("Scroll end");
                        }}
                        onProgressChange={(offsetProgress, absoluteProgress) => {
                            progress.value = absoluteProgress;
                        }}
                        onSnapToItem={(index: number) => console.log("current index:", index)}
                        renderItem={({ item, index }) => (
                            <Image
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 16, // Caso queira arredondado
                                    margin: 10
                                }}
                                source={item}
                                resizeMode="contain"
                            />
                        )}
                    />

                    <Pressable onPress={(e) => {
                        e.stopPropagation()
                    }} style={{ position: "absolute", top: 16, right: 12 }}>
                        <TouchableOpacity onPress={() => {
                            {
                                isAlreadySaved(produto.id) ?
                                    removeFromFav(produto.id) :
                                    addToFav({
                                        id: produto.id,
                                        name: produto.title
                                    })
                            }
                        }}>
                            <View style={{ backgroundColor: PlatformColor("systemGray6"), padding: Spacing.three, borderRadius: 300 }}>
                                <SymbolView name={isAlreadySaved(produto.id) ? {
                                    ios: 'heart.fill',
                                    android: 'favorite',
                                } : {
                                    ios: 'heart',
                                    android: 'favorite',
                                }}
                                    tintColor={isAlreadySaved(produto.id) ? PlatformColor("systemRed") : PlatformColor("label")}
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    </Pressable>

                    <Pressable onPress={(e) => {
                        e.stopPropagation()
                    }} style={{ position: "absolute", top: 16, left: 12 }}>
                        <TouchableOpacity onPress={() => cher()}>
                            <View style={{ backgroundColor: PlatformColor("systemGray6"), padding: Spacing.three, borderRadius: 300 }}>
                                <SymbolView name={{
                                    ios: 'square.and.arrow.up',
                                    android: 'share',
                                }}
                                    tintColor={PlatformColor("label")}
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    </Pressable>

                </GlassView>

                <View style={{ marginTop: 10 }}>
                    <Pagination.Basic<{ color: string }>
                        progress={progress}
                        data={imagensCarr.map((img) => ({ img }))}
                        dotStyle={{
                            width: 25,
                            height: 4,
                            backgroundColor: "#262626",
                        }}
                        activeDotStyle={{
                            overflow: "hidden",
                            backgroundColor: "#f1f1f1",
                        }}
                        containerStyle={{
                            gap: 10,
                            marginBottom: 10,
                        }}
                        horizontal
                        onPress={onPressPagination}
                    />
                </View>

                <View>
                    <Text style={{
                        fontFamily: "RethinkSans_600SemiBold",
                        fontSize: 20,
                        color: PlatformColor("label"),
                        marginHorizontal: 10,
                    }}>{produto.title}</Text>

                    <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
                        <GlassView style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: Spacing.two, paddingHorizontal: Spacing.three, marginTop: Spacing.two, borderRadius: 100, alignItems: "center" }}>
                            <Text style={{ fontSize: 16, fontFamily: "RethinkSans_400Regular", color: PlatformColor("label") }} >Tamanho:</Text>
                            <Host matchContents style={{ width: 200, marginRight: -10 }}>
                                <Row alignment="center" spacing={12}>
                                    <Picker selectedValue={valueT} onValueChange={setValueT}>
                                        {tamanhos.map(t => (
                                            <Picker.Item key={t.value} label={t.label} value={t.value} />
                                        ))}
                                    </Picker>
                                </Row>
                            </Host>
                        </GlassView>

                        <GlassView style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: Spacing.two, paddingHorizontal: Spacing.three, marginTop: Spacing.two, borderRadius: 100, alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <View style={{ width: 16, height: 16, backgroundColor: getCorAtual(), borderRadius: 100, borderColor: PlatformColor("label"), borderWidth: 1 }}></View>
                                <Text style={{ fontSize: 16, fontFamily: "RethinkSans_400Regular", color: PlatformColor("label") }} >Cor:</Text>
                            </View>
                            <Host matchContents style={{ marginHorizontal: -10 }}>
                                <Row alignment="center" spacing={12}>
                                    <Picker selectedValue={valueC} onValueChange={setValueC}>
                                        {cores.map(c => (
                                            <Picker.Item key={c.value} label={c.label} value={c.value}></Picker.Item>
                                        ))}
                                    </Picker>
                                </Row>
                            </Host>
                        </GlassView>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <View>
                            <Animated.View
                                layout={LinearTransition.duration(250)}
                                style={{ borderRadius: 20, overflow: 'hidden' }}
                            >

                                <GlassView style={{ padding: Spacing.three }}>
                                    <TouchableOpacity onPress={() => { setOpen(!open) }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{
                                                fontFamily: "RethinkSans_600SemiBold",
                                                fontSize: 20,
                                                color: PlatformColor("label"),
                                            }}>Descrição</Text>
                                            <SymbolView
                                                name={open ? { ios: 'chevron.down', android: 'keyboard_arrow_down' } : { ios: 'chevron.forward', android: 'chevron_forward' }}
                                                tintColor={PlatformColor("label")}
                                                size={24} />
                                        </View>
                                    </TouchableOpacity>

                                    {open &&
                                        <Animated.View
                                            entering={FadeIn.duration(200)}
                                            exiting={FadeOut.duration(200)}
                                            layout={LinearTransition}
                                        >
                                            <Text style={{
                                                fontFamily: "RethinkSans_400Regular",
                                                fontSize: 16,
                                                color: PlatformColor("label"),
                                                textAlign: "left",
                                                marginTop: Spacing.two
                                            }}>{produto.description}</Text>
                                        </Animated.View>}

                                </GlassView>
                            </Animated.View>
                        </View>
                    </View>
                </View>

            </ScrollView>


            <BlurView intensity={5} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: 17 }}>
                <LinearGradient
                    colors={['transparent', "#222222"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingBottom: 30, gap: 12 }}>
                    <GlassView style={{ paddingVertical: Spacing.three, paddingHorizontal: 16, borderRadius: 100, alignSelf: "center" }}>
                        <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 18, color: PlatformColor("label"), textAlign: "center", minWidth: 85 }}>R${produto.price?.toFixed(2)}</Text>
                    </GlassView>
                    <TouchableOpacity onPress={() => {
                        const produtoSalvar = {
                            id: produto.id,
                            name: produto.title,
                            image: imagensCarr[0],
                            quantity: 1,
                            properties: {
                                cor: cores.find((c) => c.value == valueC),
                                tamanho: valueT
                            }
                        }
                        addToCart(produtoSalvar);
                        router.push({ pathname: "/carrinho" })
                    }}>
                        <GlassView
                            tintColor={PlatformColor("label")}
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 30, paddingHorizontal: Spacing.three, paddingVertical: Spacing.three }}
                        >
                            <SymbolView name={{
                                ios: 'cart',
                                android: 'shopping_cart',
                            }}
                                tintColor={PlatformColor("systemBackground")}
                                size={16}
                            />
                            <Text style={{ fontFamily: "RethinkSans_400Regular", fontSize: 16, color: PlatformColor("systemBackground") }}>Adicionar ao carrinho</Text>
                        </GlassView>
                    </TouchableOpacity>
                </View>
            </BlurView>

        </View>
    )
}