import { GetPack } from "./PackRepository";

export async function GetUser(userid: string): Promise<User> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('x-user-id', userid);
    const response = await fetch(`${process.env.BACKEND_URL}/users`, { method: 'GET', headers: requestHeaders })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as User;
    return result
}

export async function GetPacksFromShoppingCart(): Promise<Pack[]> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('x-user-id', "4016cb54-ff0e-46a6-ace5-69304d9720c7");
    const response = await fetch(`${process.env.BACKEND_URL}/users`, { method: 'GET', headers: requestHeaders })

    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }

    var packs: Pack[] = [];
    const packIds = (await response.json())['pack_ids'];
    for (var pack of packIds) {
        packs.push(await GetPack(pack))
    }

    return packs
}

export async function AddPackToShoppingCart(packId: string): Promise<void> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('x-user-id', "4016cb54-ff0e-46a6-ace5-69304d9720c7");
    requestHeaders.set('Content-Type', "application/json");
    const response = await fetch(`${process.env.BACKEND_URL}/users/shopcart`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify({
            "pack_ids": [packId]
        })
    })
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
}

export async function RemovePackFromShoppingCart(packId: string): Promise<void> {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('x-user-id', "4016cb54-ff0e-46a6-ace5-69304d9720c7");
    requestHeaders.set('Content-Type', "application/json");
    const response = await fetch(`${process.env.BACKEND_URL}/users/shopcart/${packId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
}
