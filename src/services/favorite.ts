import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY = '@MinhaLoja:favs';

export const favsStorage = {
    saveFavorite: async (favItems) => {
        try {
            await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favItems));
        } catch (error) {
            console.error("Erro ao salvar favoritos:", error);
        }
    },

    getFavorite: async () => {
        try {
            const cart = await AsyncStorage.getItem(FAVORITE_KEY);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
            return [];
        }
    },

    clearFavorite: async () => {
        await AsyncStorage.removeItem(FAVORITE_KEY);
    }
};