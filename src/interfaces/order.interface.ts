export interface IOrderData {
    _id: string,
    productId: string,
    quantity: number
}
export interface IOrder {
    _id: string,
    userId: number,
    status: string,
    createdAt: string,
    data: {
        total: number,
        products: IOrderData[]
    }
}