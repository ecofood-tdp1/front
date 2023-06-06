import { ShopOrder } from '../../components/shopOrder/ShopOrder';
import { getAllOrderIDs } from '../../lib/orders';
import { GetOrder } from '../../repository/OrderRepository';


export async function getStaticPaths() {
    const paths = await getAllOrderIDs();
    return {
        paths,
        fallback: false
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


const ShopOrderView = ({ orderData }) => {
    return (
        <ShopOrder orderData={orderData} />
    );
}

export default ShopOrderView;