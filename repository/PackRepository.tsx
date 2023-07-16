import { Pack } from "../model/Pack";

export async function GetPack(id): Promise<Pack> {
    const response = await fetch(`${process.env.BACKEND_URL}/packs/${id}`, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Pack;
    return result
}

export async function GetShopPacks(shopId: string): Promise<Pack[]> {
  const response = await fetch(`http://localhost:2000/packs?shop_id=${shopId}`, {method:  'GET'})

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Pack[];
  return result
}

export async function RemovePack(id): Promise<Pack> {
  const response = await fetch(`http://localhost:2000/packs/${id}`, {method:  'DELETE'})

  if (response.status !== 204) {
     throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json());
  return
}