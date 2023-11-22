export interface IOrderData {
    id: number,
    count: number,
    price: number
}
export interface IOrder {
    id: number,
    userId: number,
    status: string,
    createdAt: string,
    data: {
        total: number,
        products: IOrderData[]
    }
}