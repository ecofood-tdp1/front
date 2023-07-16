import { Shop } from '../model/Shop';
import { Wallet } from '../model/Wallet';

export async function GetShops(): Promise<Shop[]> {
    console.log("SARASA", process.env.BACKEND_URL);
    const response = await fetch(`${process.env.BACKEND_URL}/shops`, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Shop[];
    return result
}

export async function GetShop(id: string): Promise<Shop> {
  const response = await fetch(`${process.env.BACKEND_URL}/shops/${id}`, {method:  'GET'})

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Shop;
  return result
}

export async function GetWalletOfShop(shopid: string): Promise<Wallet> {
  const response = await fetch(`${process.env.BACKEND_URL}/shops/${shopid}/wallet`, { method: 'GET' })

  if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Wallet;
  return result
}