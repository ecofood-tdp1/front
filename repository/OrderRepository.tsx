export async function GetOrdersOfUser(userid: string): Promise<Order[]> {
    const response = await fetch('http://localhost:2000/orders?user_id=' + userid, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrdersOfShop(shopid: string): Promise<Order[]> {
    const response = await fetch('http://localhost:2000/orders?shop_id=' + shopid, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrders(): Promise<Order[]> {
    const response = await fetch('http://localhost:2000/orders', { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}

export async function GetOrder(id: string): Promise<Order> {
    const response = await fetch('http://localhost:2000/orders/' + id, { method: 'GET' })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order;
    return result
}