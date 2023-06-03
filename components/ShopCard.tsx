import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import React from 'react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ShopCardProps {
  _id: string,
  name: string,
  address: string,
  description: string,
  openTime: number,
  closeTime: number,
  imageURL: string,
}

export const ShopCard: React.FC<ShopCardProps> = ({ _id, name, address, description, openTime, closeTime, imageURL }) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <NextLink href={"/shops/" + _id} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt="Shop image"
          src={imageURL}
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