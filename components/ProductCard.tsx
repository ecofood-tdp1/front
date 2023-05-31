import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import img from '../public/negocio.jpg'
import React from 'react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ProductCardProps {
  name: string,
  address: string,
  description: string,
  openTime: number,
  closeTime: number,
}

export const ProductCard: React.FC<ProductCardProps> = ({name, address, description, openTime, closeTime}) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <NextLink href="/products/1" className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt="product image"
          src={img}
          fill
          className={cn(
            'object-cover duration-700 ease-in-out group-hover:opacity-75	',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-bold text-gray-900">
        <div>
          <h3>{name}</h3>
        </div>
        <div className="text-base font-medium text-gray-900">
          <p>{address}</p>
          <p> De {openTime}hs A {closeTime}hs </p>
        </div>
      </div>
      <p className="mt-1 text-sm italic text-gray-500">
        {description}
      </p>
    </NextLink>
  )
}