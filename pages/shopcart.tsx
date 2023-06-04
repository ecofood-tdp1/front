import { ShopCart } from "../components/shopCart/ShopCart";
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
        <ShopCart packs={shopCartData} />
    );
}

export default ShopCartView;