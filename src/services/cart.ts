import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@MinhaLoja:cart';

export const cartStorage = {
    saveCart: async (cartItems) => {
        try {
            await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Erro ao salvar carrinho:", error);
        }
    },

    getCart: async () => {
        try {
            const cart = await AsyncStorage.getItem(CART_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
            return [];
        }
    },

    clearCart: async () => {
        await AsyncStorage.removeItem(CART_KEY);
    }
};