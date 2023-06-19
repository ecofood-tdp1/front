import moment from 'moment'

export async function GetOrdersOfUser(userid: string): Promise<Order[]> {
    const response = await fetch(`${process.env.BACKEND_URL}/orders?user_id=${userid}`, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrdersOfShop(shopid: string): Promise<Order[]> {
    const response = await fetch(`${process.env.BACKEND_URL}/orders?shop_id=${shopid}`, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrders(): Promise<Order[]> {
    const response = await fetch(`${process.env.BACKEND_URL}/orders`, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrder(id: string): Promise<Order> {
    const response = await fetch(`${process.env.BACKEND_URL}/orders/${id}`, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order;
    return result
}

export async function UpdateOrderStatus(id: string, target_status: string): Promise<Order> {
    const response = await fetch(`${process.env.BACKEND_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: target_status
        })
    })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order;
    return result
}

export async function PostOrder(shopId: string, packs: Pack[], amount: number): Promise<Order> {
    
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', "application/json");
    const response = await fetch(`${process.env.BACKEND_URL}/orders`, 
    { method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
            "status": "paid",
            "user_id": "4016cb54-ff0e-46a6-ace5-69304d9720c7",
            "shop_id": shopId,
            "total": {
                "amount": amount,
                "currency": "ARS"
            },
            "packs": packs,
            "created_at": moment().format('MM/DD/YYYY HH:mm:ss'),
        })
    })
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order;
    return result
}