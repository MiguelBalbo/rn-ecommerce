import { Notificacao } from '@/types/notificacaoType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOT_KEY = '@MinhaLoja:schedulednotifications';




export const notificationStorage = {
    saveNotification: async (notification: Notificacao) => {
        try {
            const nots = await AsyncStorage.getItem(NOT_KEY);
            let objNots = []

            if (nots) {
                objNots = JSON.parse(nots)
            }

            objNots.push(notification)

            console.log("Scheduler - todas as notificações + a ser salva:", objNots);

            await AsyncStorage.setItem(NOT_KEY, JSON.stringify(objNots));
        } catch (error) {
            console.error("Erro ao salvar notificações:", error);
        }
    },

    getNotifications: async () => {
        try {
            const not = await AsyncStorage.getItem(NOT_KEY);
            return not ? JSON.parse(not) : [];
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
            return [];
        }
    },

    removeNotification: async (idNotificacao: String) => {
        try {
            const not = await AsyncStorage.getItem(NOT_KEY);
            if (!not) return;

            const newNots = JSON.parse(not).filter((not: Notificacao) => not.id != idNotificacao);
            await AsyncStorage.setItem(NOT_KEY, JSON.stringify(newNots));
            console.log(newNots);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
            return [];
        }
    },

    apagaAntigas: async () => {
        let nots = [];
        const tempNots = await AsyncStorage.getItem(NOT_KEY);

        if (tempNots) {
            nots = JSON.parse(tempNots)
        }

        if (nots) {
            console.log("antes :", nots);
            nots = nots.filter((notification: Notificacao) => notification.horarioDisparo > Date.now())
            console.log("depois :", nots);
        }

        await AsyncStorage.setItem(NOT_KEY, JSON.stringify(nots));
    },

    clearNots: async () => {
        await AsyncStorage.setItem(NOT_KEY, JSON.stringify([]));
    },
};