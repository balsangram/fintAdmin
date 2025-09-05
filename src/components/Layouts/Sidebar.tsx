import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import { MdDashboard } from 'react-icons/md';
import { MdOutlinePayment } from 'react-icons/md';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import { RiCoupon2Line } from 'react-icons/ri';
import { RiAdvertisementFill } from 'react-icons/ri';
import { MdOutlinePets } from 'react-icons/md';
import { MdBloodtype } from 'react-icons/md';
import { PiUserList } from 'react-icons/pi';
import { SiExpensify } from 'react-icons/si';
import { IoMdSettings } from 'react-icons/io';

import { IoIosLogOut } from 'react-icons/io';

import fintLogo from '../../../public/assets/fintImg/logo/fintLogo.jpeg';
import adminProfile from '../../../public/assets/fintImg/person/admin.jpg';
import { logout } from '../../store/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { logoutAdmin } from '../../api/auth.api';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const Navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutAdmin(); // ✅ Call the backend logout API

            dispatch(logout()); // ✅ Clear Redux/auth state
            toast.success('Logout successful');

            setTimeout(() => {
                Navigate('/signin'); // ✅ Correct usage of navigate
            }, 2000);
        } catch (error: any) {
            toast.error(error.message || 'Logout failed');
        }
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <>
            <ToastContainer />
            <div className={semidark ? 'dark' : ''}>
                <nav
                    className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
                >
                    <div className="bg-[#0e0955] text-white dark:bg-black h-full">
                        <div className="flex justify-between items-center px-4 py-3">
                            <NavLink to="/" className="main-logo flex items-center shrink-0">
                                <img className="w-[8rem] ml-[5px] flex-none" src={fintLogo} alt="logo" />
                                {/* <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('FINT')}</span> */}
                            </NavLink>

                            <button
                                type="button"
                                className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                                onClick={() => dispatch(toggleSidebar())}
                            >
                                <IconCaretsDown className="m-auto rotate-90" />
                            </button>
                        </div>
                        <div className="pb-6">
                            <img
                                src={adminProfile}
                                onClick={() => {
                                    Navigate('/profile');
                                }}
                                alt="admin profile"
                                className="w-[6rem] h-[6rem] rounded-xl mx-auto mt-2 mb-4 border-2 border-white dark:border-dark-light"
                            />
                            <p className="text-center text-sm text-gray-300 dark:text-white-light/70">Welcome Back,</p>
                            <h2 className="text-center text-lg font-semibold text-white dark:text-white-light">Ravi Shankar Iyer</h2>
                        </div>
                        <PerfectScrollbar className="h-[calc(100vh-80px)] relative ">
                            <ul className="relative font-semibold space-y-0.5 p-4 py-0">


                                <li className="nav-item">
                                    <ul
                                        className="overflow-y-scroll h-[23rem] scroll-smooth"
                                        style={{
                                            scrollbarWidth: 'none', // For Firefox
                                        }}
                                    >
                                        <li className="nav-item">
                                            <NavLink to="/" className="group">
                                                <div className="flex items-center">
                                                    {/* <MdDashboard className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }} /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/payments" className="group">
                                                <div className="flex items-center">
                                                    {/* <MdOutlinePayment className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/e-change" className="group">
                                                <div className="flex items-center">
                                                    {/* <MdOutlinePublishedWithChanges className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('E Change')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/coupons" className="group">
                                                <div className="flex items-center">
                                                    {/* <RiCoupon2Line className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Coupons')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/ads" className="group">
                                                <div className="flex items-center">
                                                    {/* <RiAdvertisementFill className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Ads')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/pet-applications" className="group">
                                                <div className="flex items-center">
                                                    {/* <MdOutlinePets className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pet Applications')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/red-drop" className="group">
                                                <div className="flex items-center">
                                                    {/* <MdBloodtype className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Red Drop')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/user-list" className="group">
                                                <div className="flex items-center">
                                                    {/* <PiUserList className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('User List')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/expense-tracker" className="group">
                                                <div className="flex items-center">
                                                    {/* <SiExpensify className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Expense Tracker')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/setting" className="group">
                                                <div className="flex items-center">
                                                    {/* <IoMdSettings className="group-hover:!text-[#fff] shrink-0"
                                                        style={{
                                                            color: "white"
                                                        }}
                                                    /> */}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                                </div>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item ">
                                            <button
                                                style={{
                                                    // backgroundColor: 'gray',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    padding: '10px 20px',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    maxWidth: '8rem',
                                                    margin: '2rem 1rem',
                                                    backgroundColor: '#ffffff2b',
                                                    border: "1px solid"
                                                }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                                {/* <IoIosLogOut className="inline-block ml-2" /> */}
                                            </button>
                                        </li>

                                    </ul>
                                </li>


                            </ul>
                        </PerfectScrollbar>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
