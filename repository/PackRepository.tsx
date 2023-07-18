import { Pack } from "../model/Pack";
import { CreatePackRequest } from "../model/PackCreateRequest";

export async function GetPack(id): Promise<Pack> {
    const response = await fetch(`${process.env.BACKEND_URL}/packs/${id}`, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Pack;
    return result
}

export async function GetShopPacks(shopId: string): Promise<Pack[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/packs?shop_id=${shopId}`, {method:  'GET'})

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Pack[];
  return result
}

export async function CreatePack(pack: CreatePackRequest) : Promise<Pack> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', "application/json");
  const response = await fetch(`${process.env.BACKEND_URL}/packs`,
    { method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(pack)
})
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Pack;
  return result
}

export async function RemovePack(id): Promise<Pack> {
  const response = await fetch(`${process.env.BACKEND_URL}/packs/${id}`, {method:  'DELETE'})

  console.log(response.status)
  if (response.status !== 204) {
     throw new Error(`Error! status: ${response.status}`);
  }

  return
}