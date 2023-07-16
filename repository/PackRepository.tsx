import { Pack } from "../model/Pack";

export async function GetPack(id): Promise<Pack> {
    const response = await fetch(`${process.env.BACKEND_URL}/packs/${id}`, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Pack;
    return result
}