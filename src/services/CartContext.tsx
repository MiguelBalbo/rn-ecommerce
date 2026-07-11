import { CartItem } from '@/types/itemCarrinhoType';
import { Notificacao } from '@/types/notificacaoType';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { cartStorage } from './cart';
import { notificationStorage } from './notificationscheduler';


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

    //agenda notificações de carrinho abandonado
    useEffect(() => {
        if (Platform.OS === 'ios') {
            async function gerenciarNotificacaoCarrinho() {
                try {

                    let nots = await notificationStorage.getNotifications();

                    notificationStorage.apagaAntigas();

                    const ultimoIdNotificacao = async () => {

                        if (nots) {
                            const notCarrinho = nots.filter((notification: Notificacao) => notification.tipo == "cart")
                            return notCarrinho && notCarrinho.length > 0 ? notCarrinho[notCarrinho.length - 1].id : "";
                        }

                        return ""
                    }

                    const idNotificacao: string = await ultimoIdNotificacao();
                    console.log("ID recuperado para cancelar:", idNotificacao);

                    //apaga agendamento
                    if (idNotificacao !== "") {
                        await Notifications.cancelScheduledNotificationAsync(idNotificacao);
                        await notificationStorage.removeNotification(idNotificacao);
                    }

                    // cria novo agendamento
                    if (cart.length > 0) {
                        const novoIdNotificacao = await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Esqueceu alguma coisa?",
                                body: `Seus itens ainda estão te esperando no carrinho. Garanta-os antes que acabem!`,
                                sound: true,
                                badge: 1,
                            },
                            trigger: {
                                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                                seconds: 10,
                            },
                        });

                        await notificationStorage.saveNotification({
                            tipo: "cart",
                            id: novoIdNotificacao,
                            horarioDisparo: Date.now()
                        });
                    }

                } catch (err) {
                    console.log(err);
                    return [];
                }
            }

            gerenciarNotificacaoCarrinho();
        }
    }, [cart]);


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