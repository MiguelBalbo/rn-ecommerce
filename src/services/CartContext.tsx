import * as Notifications from 'expo-notifications';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartStorage } from './cart';

export interface CartItem {
    id: string;
    name: string;
    image?: string;
    quantity: number;
    properties: {
        cor?: { label: string, value: string, hex: string },
        tamanho?: string
    }
}

interface CartContextData {
    cart: CartItem[];
    addToCart: (product: any) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);
const NOTIFICACAO_CARRINHO_ID = 'carrinho_abandonado';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        // Função para gerenciar o agendamento
        async function gerenciarNotificacaoCarrinho() {
            // 1. Sempre cancela o agendamento anterior para resetar o "cronômetro"
            await Notifications.cancelScheduledNotificationAsync(NOTIFICACAO_CARRINHO_ID);

            // 2. Se o carrinho tiver itens, agenda um novo para o futuro
            if (cart.length > 0) {
                await Notifications.scheduleNotificationAsync({
                    id: NOTIFICACAO_CARRINHO_ID, // Mantém o mesmo ID para podermos cancelar depois
                    content: {
                        title: "Esqueceu alguma coisa?",
                        body: `Seus itens ainda estão te esperando no carrinho. Garanta-os antes que acabem!`,
                        sound: true,
                        badge: 1,
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: 2 * 60 * 60,
                    },
                });
            }
        }

        gerenciarNotificacaoCarrinho();
    }, [cart]); // Executa toda vez que o carrinho mudar

    // Carrega o carrinho do AsyncStorage assim que o app abre
    useEffect(() => {
        async function loadCart() {
            const savedCart = await cartStorage.getCart();
            setCart(savedCart);
        }
        loadCart();
    }, []);


    // Adiciona item (ou aumenta quantidade) e salva
    const addToCart = async (product: any) => {
        const currentCart = [...cart];
        const productIndex = currentCart.findIndex(item => item.id === product.id);

        if (productIndex >= 0) {
            currentCart[productIndex].quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }

        setCart(currentCart);
        await cartStorage.saveCart(currentCart);
    };

    // Remove um item completamente ou diminui a quantidade
    const removeFromCart = async (productId: string) => {
        let currentCart = [...cart];
        const productIndex = currentCart.findIndex(item => item.id === productId);

        if (productIndex >= 0) {
            if (currentCart[productIndex].quantity > 1) {
                currentCart[productIndex].quantity -= 1;
            } else {
                currentCart = currentCart.filter(item => item.id !== productId);
            }
        }

        setCart(currentCart);
        await cartStorage.saveCart(currentCart);
    };

    // Limpa o carrinho
    const clearCart = async () => {
        setCart([]);
        await cartStorage.clearCart();
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para facilitar o uso nas telas
export function useCart() {
    return useContext(CartContext);
}