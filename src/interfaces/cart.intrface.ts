export interface ICartProduct {
    productId: string
    quantity: number
}

export interface ICartApi {
    userId: string
    products: ICartProduct[]
    total: number
    totalPrice: number
}