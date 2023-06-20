import { Pack } from "../model/Pack";

export async function GetPack(id): Promise<Pack> {
    const response = await fetch(`http://localhost:2000/packs/${id}`, {method:  'GET'})

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Pack;
    return result
}