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