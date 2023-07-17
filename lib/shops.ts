import axios from "axios"


const allShopsURL = `${process.env.BACKEND_URL}/shops`
const getShopURL = (id) => `${process.env.BACKEND_URL}/shops/${id}`
const getShopPacksURL = (id) => `${process.env.BACKEND_URL}/packs?shop_id=${id}`

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
        console.log('responseShop')
        console.log(responseShop.data)

        const responsePacks = await axios.get(getShopPacksURL(id));

        return Object.assign({}, { shop: responseShop.data }, { packs: responsePacks.data })
    } catch (error) {
        console.error('Error fetching shop data:', error);
        return
    }
}