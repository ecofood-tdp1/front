export async function GetShops(): Promise<Shop[]> {
    const response = await fetch('http://localhost:2000/shops', {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Shop[];
    return result
}

export async function GetShop(id: string): Promise<Shop> {
  const response = await fetch('http://localhost:2000/shops/' + id, {method:  'GET'})

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Shop;
  return result
}

export async function GetWalletOfShop(shopid: string): Promise<Wallet> {
  const response = await fetch('http://localhost:2000/shops/' + shopid + '/wallet', { method: 'GET' })

  if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
  }

  const result = (await response.json()) as Wallet;
  return result
}