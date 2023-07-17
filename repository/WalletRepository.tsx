export async function MakeWithdraw(wallet_id: string, amount: number): Promise<void> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', "application/json");
    const response = await fetch(`${process.env.BACKEND_URL}/shops/${wallet_id}/wallet`, {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify({
            "operation": "withdraw",
            "amount": amount,
            "currency": "ARS"
        })
    })
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
}