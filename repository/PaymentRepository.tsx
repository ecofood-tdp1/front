export async function PostPayment(creditCard: string, cardHolder: string, expirationMonth: string, 
                                  expirationYear: string, issuer: string, amount: number): Promise<void> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', "application/json");
    const body = JSON.stringify({
        "user_id": "4016cb54-ff0e-46a6-ace5-69304d9720c7",
        "payment_method": {
            "pan": creditCard,
            "cardholder_name": cardHolder,
            "expiration_date": `${expirationMonth}/${expirationYear}`,
            "issuer": issuer
        },
        "total": {
            "amount": amount,
            "currency": "ARS"
        }
    })
    const response = await fetch(`${process.env.BACKEND_URL}/payments`, 
        {method:  'POST',
        headers: requestHeaders,
        body: body
    })

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
}