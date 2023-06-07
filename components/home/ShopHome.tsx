import Header from "./Header";
import img from '../../public/homeshops.webp'


const ShopHome = () => {
    return (
        <>
            <Header image={img} description={"Convertí pérdidas en ganancias"} description2={"salvando el planeta"} buttonTitle={"Vendé"} scrollHandler={null} />
        </>);
}

export default ShopHome;