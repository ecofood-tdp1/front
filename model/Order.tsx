import { Pack, Price } from "./Pack";
import { Shop } from "./Shop";
import { User } from "./User";

export { OrderStatus, type Order, type OrderWithShop, type OrderWithUser }

enum OrderStatus {
    paid = 'paid',
    marked_as_delivered = 'marked_as_delivered',
    delivered = 'delivered',
}

type Order = {
    readonly _id: string;
    readonly status: OrderStatus;
    readonly user_id: string;
    readonly shop_id: string;
    readonly total: Price;
    readonly packs: Pack[];
    readonly created_at: string | Date;
}

type OrderWithShop = {
    readonly order: Order;
    readonly shop: Shop;
}

type OrderWithUser = {
    readonly order: Order;
    readonly user: User;
}