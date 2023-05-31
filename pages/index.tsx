import { useRef, useState } from 'react'
import Header from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import React from 'react'
import { GetShops } from '../repository/ShopRepository';

export default function Gallery() {
  let shopsRef = useRef<HTMLParagraphElement | null>(null);
  const [shops, setShops] = useState<Shop[]>([])

  const scrollHandler = async () => {
    // @ts-ignore
    shopsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    });

    const shopResults = await GetShops()
    setShops(shopResults)
  }

  return (
    <>
      <Header scrollHandler={scrollHandler} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
              ref={shopsRef}
            >
              Elegí un negocio
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            shops.map(shop => 
              <ProductCard 
                name={shop.name} 
                address={shop.address} 
                description={shop.description}
                openTime={shop.pick_up_from}
                closeTime={shop.pick_up_to}
              />
            )
          }
        </div>
      </div>
    </>
  )
}

// export async function getStaticProps() {
//   const searchResults = await getProducts('coffee')

//   return {
//     props: {
//       data: searchResults,
//     },
//   }
// }