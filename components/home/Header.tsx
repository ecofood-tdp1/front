import Image from 'next/image'
import React from 'react';


export default function Header({ scrollHandler, description, description2, buttonTitle, image }) {

  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-sm sm:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              priority
              fill
              className="h-full w-full object-cover"
              src={image}
              placeholder="blur"
              alt="Ecofood"
            />
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-6xl  font-extrabold uppercase tracking-wide text-green-500 lg:text-8xl"
              >
              Ecofood
            </p>
            <h1 className="mt-6 text-center font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-3xl">
              <span className="block text-white text-xl"> {description} </span>
              <span className="mt-2 block text-white text-xl"> {description2} </span>
            </h1>

            {/* <div className="mx-auto mt-10 max-w-xs flex justify-center">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-extrabold text-orange-600 shadow-sm hover:bg-orange-100 sm:px-8"
                onClick={scrollHandler}
              >
                {buttonTitle}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </header >
  )
}