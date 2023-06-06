type Pack = {
    readonly _id: string,
    readonly shop_id: string,
    readonly type: string,
    readonly name: string,
    readonly description: string,
    readonly products: Product[],
    readonly stock: number,
    readonly best_before: string,
    readonly price: Price,
    readonly original_price: Price
    readonly imageURL: string
}

type Product = {
    readonly name: string,
    readonly quantity: number,
    readonly best_before: string
}

type Price = {
    readonly amount: number,
}