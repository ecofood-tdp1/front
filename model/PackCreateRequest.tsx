export { type PackForRequest, type PriceForRequest, type CreatePackRequest }

type PackForRequest = {
    name: string,
    quantity: number
}

type PriceForRequest = {
    amount: number,
    currency: string
}


type CreatePackRequest = {
    shop_id: string,
    type: string,
    name: string,
    description: string,
    products: PackForRequest[],
    stock: number,
    best_before: string,
    price: PriceForRequest,
    original_price: PriceForRequest,
    imageUrl: string
}