import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';
import './index.css'; // Ensure your styles are imported
// import { useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance from './api/axiosInstance';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const location = useLocation();


    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

 // ✅ Auth check using cookies
//   useEffect(() => {
//     const publicRoutes = ['/signin', '/forgot-password', '/privacy-policy', '/terms-of-use'];
//     const isPublicRoute = publicRoutes.includes(location.pathname);
//     console.log("🚀 ~ useEffect ~ isPublicRoute:", isPublicRoute)

//     if (!isPublicRoute) {
//       axiosInstance
//         .get('/admin/profile') // protected route that needs valid access token
//         .catch((error) => {
//             console.log("111",error.response?.status);
            
//           if (error.response?.status === 403) {
//             console.log("222");
            
//             navigate('/signin');
//           }
//           console.log("333")
//         });
//     }
//   }, [location, navigate]);
    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
