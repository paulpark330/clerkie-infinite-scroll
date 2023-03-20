# Clerkie Infinite Scroll


Clerkie Infinite Scroll aims to implement an infinite scroll feature with filtering functionality. The application displays a list of friends and allows users to filter them based on their relationship status with the user. The infinite scroll feature is implemented using the SWR `stale-while-revalidate` library.

In addition, the project includes a skeleton screen loading state, which displays a temporary animation while waiting for the data to load. The loading state is implemented using CSS animations and keyframes.

[![Product Name Screen Shot][screenshot]](https://clerkie-infinite-scroll.vercel.app)


### Built With

- [Next.js 13 App Router](https://beta.nextjs.org/docs)
- [React](https://react.dev/)
- [SCSS](https://sass-lang.com/)
- [Material UI](https://mui.com/)
- [Strapi](https://strapi.io/)
- [Vercel](https://vercel.com/)

### Installation

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/paulpark330/clerkie-infinite-scroll.git
    npm install
    npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

- Responsive design

- Fetches data from [headless CMS](https://strapi.io/) with [useSWRInfinite](https://swr.vercel.app/docs/pagination#useswrinfinite) hook

- Infinite scroll functionality

  <img src="./public/gifs/infinite-scroll.gif" width="300"/>

- Filter management with Context API and local storage

  <img src="./public/gifs/filter.gif" width="300"/>

- Dark mode

  <img src="./public/gifs/dark-mode.gif" width="300"/>

- Skeleton screen for loading state

  <img src="./public/gifs/skeleton.gif" width="300"/>

[screenshot]: ./public/gifs/screenshot.gif