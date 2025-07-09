// import { createBrowserRouter } from 'react-router-dom';
// import BlankLayout from '../components/Layouts/BlankLayout';
// import DefaultLayout from '../components/Layouts/DefaultLayout';
// import { routes } from './routes';

// const finalRoutes = routes.map((route) => {
//     return {
//         ...route,
//         element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
//     };
// });

// const router = createBrowserRouter(finalRoutes);

// export default router;


// routes/mainRouter.tsx
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';

const finalRoutes = routes.map((route) => {
  const Layout = route.layout === 'blank' ? BlankLayout : DefaultLayout;

  return {
    ...route,
    element: <Layout>{route.element}</Layout>,
  };
});

const router = createBrowserRouter(finalRoutes);
export default router;
