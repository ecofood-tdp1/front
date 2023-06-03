import axios from "axios"


const allShopsURL = "http://localhost:2000/shops"
const getShopURL = (id) => `http://localhost:2000/shops/${id}`
const getShopPacksURL = (id) => `http://localhost:2000/packs?shop_id=${id}`

export async function getAllShopIDs() {
    let shops = []

    try {
        const response = await axios.get(allShopsURL);

        shops = response.data
    } catch (error) {
        console.error('Error fetching shops:', error);
        return
    }

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
    let toreturn = shops.map((shop) => {
        return {
            params: {
                id: shop._id
            },
        };
    });

    console.log(toreturn)
    return toreturn
}

export async function getShopData(id) {
    try {
        const responseShop = await axios.get(getShopURL(id));

        const responsePacks = await axios.get(getShopPacksURL(id));

        return Object.assign({}, { shop: responseShop.data }, { packs: responsePacks.data })
    } catch (error) {
        console.error('Error fetching shop data:', error);
        return
    }
}