import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Payments = lazy(() => import('../pages/Payments/Payments'));
const EChange = lazy(() => import('../pages/E-Change/EChange'));
const Coupons = lazy(() => import('../pages/Coupons/Coupons'));
const Ads = lazy(() => import('../pages/Ads/Ads'));
const PetApplications = lazy(() => import('../pages/PetApplications/PetApplications'));
const RedDrop = lazy(() => import('../pages/RedDrop/RedDrop'));
const UserList = lazy(() => import('../pages/UsersList/UserList'));
const ExpenseTracker = lazy(() => import('../pages/ExpenseTracker/ExpenseTracker'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const SignIn = lazy(() => import('../pages/auth/SignIn'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Security = lazy(() => import('../pages/Settings/Security'));
const Setting = lazy(() => import('../pages/Settings/Setting'));
const General = lazy(() => import('../pages/Settings/General'));
const DeleteAccount = lazy(() => import('../pages/Settings/DeleteAccount'));
const Notifications = lazy(() => import('../pages/Settings/Notifications'));
const Password = lazy(() => import('../pages/Settings/Password'));

const protectedPages = [
  { path: '/', element: <Dashboard /> },
  { path: '/payments', element: <Payments /> },
  { path: '/e-change', element: <EChange /> },
  { path: '/coupons', element: <Coupons /> },
  { path: '/ads', element: <Ads /> },
  { path: '/pet-applications', element: <PetApplications /> },
  { path: '/red-drop', element: <RedDrop /> },
  { path: '/user-list', element: <UserList /> },
  { path: '/expense-tracker', element: <ExpenseTracker /> },
  { path: '/profile', element: <Profile /> },
  { path: '/security', element: <Security /> },
  { path: '/change-password', element: <Password /> },
  { path: '/notification', element: <Notifications /> },
  { path: '/delete-account', element: <DeleteAccount /> },
  { path: '/general', element: <General /> },
  { path: '/setting', element: <Setting /> },
];

// Map all protected routes to apply layout + ProtectedRoute
const protectedRoutes = protectedPages.map((page) => ({
  ...page,
  element: <ProtectedRoute>{page.element}</ProtectedRoute>,
  layout: 'default',
}));

const publicRoutes = [
  {
    path: '/signin',
    element: <SignIn />,
    layout: 'blank',
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'blank',
  },
];

const routes = [...publicRoutes, ...protectedRoutes];

export { routes };
