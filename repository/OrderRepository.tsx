export async function GetOrdersOfUser(userid: string): Promise<Order[]> {
    const response = await fetch('http://localhost:2000/orders?user_id=' + userid, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Order[];
    return result
}