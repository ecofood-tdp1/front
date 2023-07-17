import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logoEcofood from '../../public/ecofood_sin_fondo.png'
import Image from 'next/image'
import { UserDataContext} from "../../context/Context";
import { ShopDataContext} from "../../context/ShopContext";
import { useContext } from "react";
import { useRouter } from 'next/router'
import NextLink from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// export default function NavBar() {
//   const { user, switchUser } = useContext(UserDataContext);
//   const { shop, setShop} = useContext(ShopDataContext);
//   setShop(shopData);

//   const router = useRouter();

//   const navigation = [
//     { name: 'Home', href: '/', current: router.pathname == '/', visible_to: 'all' },
//     { name: 'Mis Pedidos', href: '/orders/my', current: router.pathname == '/orders/my', visible_to: 'buyer' },
//     { name: 'Carrito', href: '/shopcart', current: router.pathname == '/shopcart', visible_to: 'buyer' },
//     { name: 'Mi menú', href: '/shops/' + user._id, current: router.pathname == '/shops/[id]', visible_to: 'shop' },
//     { name: 'Mis órdenes', href: '/shoporders/my', current: router.pathname == '/shoporders/my', visible_to: 'shop' },
//     { name: 'Mis ganancias', href: '/profits/my', current: router.pathname == '/profits/my', visible_to: 'shop' },
//   ]
//   return (
//     <Disclosure as="nav" className="bg-gray-100">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <Image
//                     className="block h-8 w-auto lg:hidden"
//                     src={logoEcofood}
//                     alt="Ecofood"
//                   />
//                   <Image
//                     className="hidden h-10 w-auto lg:block"
//                     src={logoEcofood}
//                     alt="Ecofood"
//                   />
//                 </div>
//                 {user.type === 'buyer' && router.pathname.startsWith('/shops/') && 
//                   <Image
//                     className="hidden h-10 w-auto lg:block"
//                     src={shop ? shop.imageURL : "/defaultShopImage.png"}  // ruta a la imagen por defecto del usuario
//                     alt="Shop Image"
//                     width={40}   // define the width and height
//                     height={40}  // of the user image
//                   />
//                 }
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* Profile name */}
//                 <span className="mr-2 text-gray-600 text-sm font-medium">{user.display_name}</span>

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-14 w-14 rounded-full"
//                         src={user.type == 'buyer' ? "/messi.jpg" : "/la-continental.png"} // TODO: imagenes hardcodeadas
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <NextLink
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Mi perfil
//                           </NextLink>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <NextLink
//                             href="/"
//                             onClick={switchUser}
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             [dev] Cambiar a modo {user.type == 'buyer' ? 'Negocio' : 'Comprador'}
//                           </NextLink>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 (user.type == item.visible_to || item.visible_to == "all") &&
//                 <NextLink href={item.href}>
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     className={classNames(
//                       item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 </NextLink>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   )
// }


export default function NavBar() {
  const { user, switchUser } = useContext(UserDataContext);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', current: router.pathname == '/', visible_to: 'all' },
    { name: 'Mis Pedidos', href: '/orders/my', current: router.pathname == '/orders/my', visible_to: 'buyer' },
    { name: 'Carrito', href: '/shopcart', current: router.pathname == '/shopcart', visible_to: 'buyer' },
    { name: 'Mi menú', href: '/shops/' + user._id, current: router.pathname == '/shops/[id]', visible_to: 'shop' },
    { name: 'Mis órdenes', href: '/shoporders/my', current: router.pathname == '/shoporders/my', visible_to: 'shop' },
    { name: 'Mis ganancias', href: '/profits/my', current: router.pathname == '/profits/my', visible_to: 'shop' },
  ]
  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src={logoEcofood}
                    alt="Ecofood"
                  />
                  <Image
                    className="hidden h-10 w-auto lg:block"
                    src={logoEcofood}
                    alt="Ecofood"
                  />
                </div>
                
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile name */}
                <span className="mr-2 text-gray-600 text-sm font-medium">{user.display_name}</span>
                

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-14 w-14 rounded-full"
                        src={user.type == 'buyer' ? "/messi.jpg" : "/la-continental.png"} // TODO: imagenes hardcodeadas
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NextLink
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Mi perfil
                          </NextLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NextLink
                            href="/"
                            onClick={switchUser}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            [dev] Cambiar a modo {user.type == 'buyer' ? 'Negocio' : 'Comprador'}
                          </NextLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* <button 
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                (user.type == item.visible_to || item.visible_to == "all") &&
                <NextLink href={item.href}>
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </NextLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
