import { PaymentForm } from "../components/payment/PaymentForm";
import { GetPacksFromShoppingCart } from "../repository/UserRepository";


export async function getStaticProps({ params }) {
    const shopCartData = await GetPacksFromShoppingCart();
    return {
        props: {
            shopCartData
        },
    };
}

const ShopCartView = ({ shopCartData }) => {

    return (
        <PaymentForm packs={shopCartData} />
    );
}

export default ShopCartView;