import { EditMenuForm } from "../../../components/shop/EditMenuForm";
import { getAllPackUrls } from "../../../lib/shops";
import { GetPack } from "../../../repository/PackRepository";


export async function getStaticPaths() {
    const paths = await getAllPackUrls();
    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const pack = await GetPack(params.id);
    return {
        props: {
            pack,
            packId: params.id
        },
    };
}

const PackEditView = ({ pack, packId }) => {
    return (
        <EditMenuForm pack={pack} paramPackId={packId} />
    );
}

export default PackEditView;