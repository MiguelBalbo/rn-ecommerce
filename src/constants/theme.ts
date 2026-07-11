/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';



export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#dededfff',
    backgroundElement2: '#ecebebff',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    red: '#fa2828ff'
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundElement2: '#171819ff',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    red: '#be2121ff'
  },
} as const;


export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
