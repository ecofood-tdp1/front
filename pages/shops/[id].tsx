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
            shopData
        },
    };
}


const ShopView = ({ shopData }) => {
    return (
        <Shop shopData={shopData} />
    );
}

export default ShopView;