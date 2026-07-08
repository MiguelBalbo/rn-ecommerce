import React, { createContext, useContext, useEffect, useState } from 'react';
import { favsStorage } from './favorite';

export interface FavsItem {
    id: string;
    name: string;
}

interface FavContextData {
    favorite: FavsItem[];
    addToFav: (product: any) => Promise<void>;
    removeFromFav: (productId: string) => Promise<void>;
    clearFavs: () => Promise<void>;
    isAlreadySaved: (productId: string) => boolean;
}

export const FavContext = createContext<FavContextData>({} as FavContextData);

export const FavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorite, setFav] = useState<FavsItem[]>([]);

    useEffect(() => {
        async function loadCart() {
            const savedFavs = await favsStorage.getFavorite();
            setFav(savedFavs);
        }
        loadCart();
    }, []);


    const addToFav = async (product: any) => {
        const currentFavs = [...favorite];
        const productIndex = currentFavs.findIndex(item => item.id === product.id);

        if (productIndex < 0) {
            currentFavs.push({ ...product });
        }


        setFav(currentFavs);
        await favsStorage.saveFavorite(currentFavs);
    };

    const removeFromFav = async (productId: string) => {
        let currentFavs = [...favorite];
        const productIndex = currentFavs.findIndex(item => item.id === productId);


        if (productIndex >= 0) {
            currentFavs = currentFavs.filter(item => item.id !== productId);
        }

        setFav(currentFavs);
        await favsStorage.saveFavorite(currentFavs);
    };

    // Limpa o carrinho
    const clearFavs = async () => {
        setFav([]);
        await favsStorage.clearFavorite();
    };

    const isAlreadySaved = (productId: string) => {
        const currentFavs = [...favorite];
        const productIndex = currentFavs.findIndex(item => item.id === productId);

        if (productIndex >= 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <FavContext.Provider value={{ favorite, addToFav, removeFromFav, clearFavs, isAlreadySaved }}>
            {children}
        </FavContext.Provider>
    );
};

// Hook personalizado para facilitar o uso nas telas
export function useFav() {
    return useContext(FavContext);
}