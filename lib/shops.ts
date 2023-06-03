import axios from "axios"


const allShopsURL = "http://localhost:2000/shops"
const getShopURL = (id) => `http://localhost:2000/shops/${id}`

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

// TODO: que tambien busque los productos de este local, y agregárselos al JSON
export async function getShopData(id) {
    try {
        const response = await axios.get(getShopURL(id));

        return response.data
    } catch (error) {
        console.error('Error fetching offers data:', error);
        return
    }
}