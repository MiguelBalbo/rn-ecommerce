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