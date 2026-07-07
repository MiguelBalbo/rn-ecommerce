import ProductCard from '@/components/ProductCard';
import { Spacing } from '@/constants/theme';
import { RethinkSans_400Regular, useFonts } from '@expo-google-fonts/rethink-sans';
import { Button, Host, Icon, Text as TextUi } from '@expo/ui';
import { buttonBorderShape, buttonStyle, controlSize, labelStyle } from '@expo/ui/swift-ui/modifiers';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, PlatformColor, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//https://dribbble.com/shots/26321869-Shoply-Smart-Shopping-Mobile-App-UI-UX-Design

const sections = [{
  title: 'Novidades',
  type: 'nov',
  data: [1]
}

]


export default function HomeScreen() {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProdutos(data);
    }
    carregarProdutos();
  }, []);



  const [fontsLoaded] = useFonts({
    RethinkSans_400Regular,
  });
  return (
    <View style={{ flex: 1, backgroundColor: PlatformColor("systemBackground"), paddingTop: 55 }}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Spacing.three }}>
        {/* <GlassView style={{ alignSelf: "flex-start", height: 50, borderRadius: 200, marginBottom: 10, backgroundColor: PlatformColor("systemBackground"), alignItems: "center", flexDirection: "row", gap: Spacing.two, paddingHorizontal: Spacing.two }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: "100%" }}
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-oVQFRMVQKMs2CqDprJYoM5-WM1qOUWTMtrrQsbSkkkR98pLZGRaH0cQ&s=10" }} />
          <Text style={{
            fontFamily: "RethinkSans_400Regular",
            fontSize: 16,
            color: PlatformColor("label")
          }}>Olá, Taylor</Text>
          <SymbolView
            name={{ ios: 'chevron.down', android: 'keyboard_arrow_down' }}
            tintColor={PlatformColor("label")}
            size={16}
          />
        </GlassView> */}

        <Host matchContents>
          <Button
            modifiers={[buttonStyle('glass'),
            controlSize('extraLarge'),
            ]}
            onPress={() => alert('Pressed!')}
          >
            <TextUi textStyle={{ color: PlatformColor("label") }}>Olá, Taylor</TextUi>
            <Icon
              name={Icon.select({
                ios: 'chevron.down',
                android: require('@expo/material-symbols/keyboard_arrow_down.xml'),
              })}
              size={16}
              color={PlatformColor("label")}
            />
          </Button>
        </Host>

        <View style={{ flexDirection: "row" }}>
          <Host matchContents>
            <Button
              modifiers={[buttonStyle('glass'),
              controlSize('extraLarge'),
              labelStyle('iconOnly'),
              buttonBorderShape('circle'),
              ]}
              onPress={() => alert('Pressed!')} >
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
          <Host matchContents>
            <Button
              modifiers={[buttonStyle('glass'),
              controlSize('extraLarge'),
              labelStyle('iconOnly'),
              buttonBorderShape('circle'),
              ]}
              onPress={() => alert('Pressed!')} >
              {/* label="Search"
              systemImage="magnifyingglass"
               */}
              <Icon
                name={Icon.select({
                  ios: 'magnifyingglass',
                  android: require('@expo/material-symbols/search.xml'),
                })}
                size={16}
                color={PlatformColor("label")}
              />
            </Button>
          </Host>
        </View>
      </View>
      <SectionList
        sections={sections}
        style={{ paddingHorizontal: Spacing.three }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ section }) => {
          if (section.type == 'nov') {
            return (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator
                persistentScrollbar
                style={{ marginTop: Spacing.three, marginHorizontal: -Spacing.three }}
                data={produtos.slice(0, 10)}
                renderItem={(item) => (<TouchableOpacity activeOpacity={0.5} onPress={() => { router.push({ pathname: "/produto/[id]", params: { id: item.item.id } }) }}><ProductCard produto={item} /></TouchableOpacity>)
                }
                keyExtractor={item => item.id}
              />
            );
          }


        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center" }}>
            <Text style={{ fontFamily: "RethinkSans_600SemiBold", fontSize: 30, color: PlatformColor("label") }}>{title}</Text>
            <Host matchContents>
              <Button
                modifiers={[buttonStyle('glass'),
                controlSize('large'),
                buttonBorderShape("circle")
                ]}
                onPress={() => alert('Pressed!')}
              >
                <Icon
                  name={Icon.select({
                    ios: 'chevron.right',
                    android: require('@expo/material-symbols/chevron_forward.xml'),
                  })}
                  size={12}
                  color={PlatformColor("label")}
                />
              </Button>
            </Host>
          </View>
        )}
      />



      {/* // https://dribbble.com/shots/26321869-Shoply-Smart-Shopping-Mobile-App-UI-UX-Design
      // https://fakestoreapi.com/docs#tag/Products */}

    </View >
  );
}

const styles = StyleSheet.create({

});
