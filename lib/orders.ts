import { Order } from "../model/Order";
import { Pack } from "../model/Pack";
import { GetOrders } from "../repository/OrderRepository";

export async function getAllOrderIDs() {
    const orders = await GetOrders()

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: '1234123451231234'
    //     }
    //   },
    //   {
    //     params: {
    //       id: '647884314123123'
    //     }
    //   }
    // ]
    let toreturn = orders.map((order: Order) => {
        return {
            params: {
                id: order._id
            },
        };
    });

    return toreturn
}

// Para usuarios compradores
export function getSavedMoney(order: Order) {
    let amountSaved = 0;
    order.packs.forEach((pack: Pack) => {
        amountSaved += pack.original_price.amount - pack.price.amount
    })
    return amountSaved
}

// Para negocios
export function getEarnedMoney(order: Order) {
    let amountEarned = 0;
    order.packs.forEach((pack: Pack) => {
        amountEarned += pack.price.amount
    })
    return Math.round(amountEarned * 0.7)
}

export function getEarliestExpiryDate(order: Order) {
    return order.packs.reduce((minDatePack: Pack | null, pack: Pack) => {
        if (!minDatePack || pack.best_before < minDatePack.best_before) {
            return pack;
        }
        return minDatePack;
    }, null)?.best_before;
}