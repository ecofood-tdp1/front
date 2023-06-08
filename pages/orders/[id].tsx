import { Order } from '../../components/order/Order';
import { getAllOrderIDs } from '../../lib/orders';
import { GetOrder } from '../../repository/OrderRepository';


export async function getStaticPaths() {
    const paths = await getAllOrderIDs();
    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const orderData = await GetOrder(params.id);
    return {
        props: {
            orderData
        },
    };
}


const OrderView = ({ orderData }) => {
    return (
        <Order orderData={orderData} />
    );
}

export default OrderView;