export { type Wallet, type Balance, type Transactions }

type Wallet = {
    readonly balance: Balance,
    readonly transactions: Transactions[],
    readonly _id: string
}

type Balance = {
    readonly amount: number,
    readonly currency: string
}

type Transactions = {
    readonly amount: number,
    readonly currency: string,
    readonly operation: string
}
