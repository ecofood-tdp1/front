import { Shop } from '../../components/shop/Shop';
import { getAllShopIDs, getShopData } from '../../lib/shops';


export async function getStaticPaths() {
    const paths = await getAllShopIDs();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const shopData = await getShopData(params.id);
    return {
        props: {
            shopData,
            shopId: params.id
        },
    };
}


const ShopView = ({ shopData, shopId }) => {
    return (
        <Shop shopData={shopData} shopId={shopId} />
    );
}

export default ShopView;