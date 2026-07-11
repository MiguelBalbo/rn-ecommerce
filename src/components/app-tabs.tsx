import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { PlatformColor, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={"#ebebebff"}
      indicatorColor={"#bcbcbcff"}
      iconColor={{ selected: PlatformColor("label") }}
      labelStyle={{ selected: { color: PlatformColor("label") } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="house"
          md="home"
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="carrinho">
        <NativeTabs.Trigger.Label>Carrinho</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="cart"
          md="shopping_cart"
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
