# front

# Para testear mobile

## Configuración inicial
Asegurarse de tener instalado:

En mac:
* Xcode
* cocoapods (se instala con ```sudo gem install cocoapods```)

En android:
* android studio
* no sé si alguna otra cosa

Luego instalar capacitor y crear la carpeta de build llamada "out":
```
npm install @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android
npm run static
```

Finalmente agregar las plataformas nativas (sólo la que uses)
```
npx cap add ios
npx cap add android
```

## Para correr
* Tener corriendo el server en el puerto 3000
```
npm run dev
```

* Obtener la IP local. En mac es:
```
ipconfig getifaddr en0
```

* En el archivo ```capacitor.config.ts``` reemplazar la IP en la url

* Correr ```npx cap sync```

* Abrir el proyecto de Xcode o en android studio:
```
npx cap open ios
npx cap open android
```
* Levantar el simulador en Xcode o android y ver la app corriendo y actualizándose live...


--------------

## This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
