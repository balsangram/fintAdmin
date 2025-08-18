// import React, { useEffect, useState } from 'react';
// import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
// import CouponsTable, { Coupon } from '../../components/table/CouponsTable';
// import { Link } from 'react-router-dom';
// import { getAllCoupons } from '../../api/all.api';

// interface PieDataItem {
//     name: string;
//     value: number;
// }

// const pieData: PieDataItem[] = [
//     { name: 'Added', value: 400 },
//     { name: 'Viewed', value: 300 },
//     { name: 'Expired', value: 300 },
//     { name: 'Deleted', value: 100 },
// ];

// function Coupons() {
//     const [viewedCouponId, setViewedCouponId] = useState<string | null>(null);

//     const couponList: Coupon[] = [
//         {
//             id: '1',
//             name: 'Festival Deal',
//             dateAdded: '2025-06-01',
//             viewCount: 200,
//             expiredOn: '2025-06-30',
//             status: 'Deleted',
//             claimPercentage: 80,
//         },
//         {
//             id: '2',
//             name: 'Flash Sale',
//             dateAdded: '2025-05-01',
//             viewCount: 120,
//             expiredOn: '2025-05-15',
//             status: 'Expired',
//             claimPercentage: 95,
//         },
//     ];

//     const handleView = (id: string) => {
//         setViewedCouponId(viewedCouponId === id ? null : id);
//     };

//     const handleDelete = (id: string) => {
//         alert(`Delete clicked for coupon ID: ${id}`);
//     };

//       const [pieData, setPieData] = useState<PieDataItem[]>([]);
//       const [coupons, setCoupons] = useState<Coupon[]>([]);

//     useEffect(()=>{
//         const couonsFunction = async() =>{
//             const router = await getAllCoupons

//         }
//     })

//     couonsFunction();
//     return (
//         <>
//             <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
//                 <Link to="/">
//                                       <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                      
//                                       >Home</button>
//                                   </Link>
//                 <li>/</li>
//                 <li>
//                     <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Coupons</button>
//                 </li>
//                 {/* <li>/</li>
//                 <li>
//                     <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
//                 </li> */}
//             </ol>
//             <div className="text-center">
//                 <DashboardPieChart data={pieData} />
//                 <p>
//                     <span className="text-green-600">● Added</span> <span className="text-orange-600">● Viewed</span> <span className="text-gray-600">● Expired</span>{' '}
//                     <span className="text-red-600">● Deleted</span>
//                 </p>
//             </div>

//             <div className="p-6">
//                 <CouponsTable coupons={couponList} onDelete={handleDelete} />
//             </div>
//         </>
//     );
// }

// export default Coupons;
import React, { useEffect, useState } from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import CouponsTable, { Coupon } from '../../components/table/CouponsTable';
import { Link } from 'react-router-dom';
import { getAllCoupons } from '../../api/all.api';

interface PieDataItem {
  name: string;
  value: number;
  color?: string;
}

const Coupons = () => {
  const [viewedCouponId, setViewedCouponId] = useState<string | null>(null);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [couponList, setCouponList] = useState<Coupon[]>([]);

  const handleView = (id: string) => {
    setViewedCouponId(viewedCouponId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    alert(`Delete clicked for coupon ID: ${id}`);
  };

  const statusColorMap: Record<string, string> = {
    active: '#FFE3A9',   // Yellow
    viewed: '#FFA500',   // Orange
    expired: '#131D4F',  // Dark blue
    deleted: '#8CCDEB',  // Light blue
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getAllCoupons();
        const coupons = result.data.coupons;
        const statusSummary = result.data.statusSummary;

        // Format table data
        const formattedCoupons: Coupon[] = coupons.map((coupon: any) => ({
          id: coupon.id,
          name: coupon.title,
          dateAdded: new Date(coupon.createdAt).toLocaleDateString(),
          expiredOn: new Date(coupon.expiryDate).toLocaleDateString(),
          viewCount: coupon.viewCount,
          status: coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1),
          claimPercentage: 0,
        }));

        setCouponList(formattedCoupons);

        // Format pie chart data with matching colors
        const formattedPieData: PieDataItem[] = Object.entries(statusSummary).map(
          ([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: value as number,
            color: statusColorMap[key.toLowerCase()] || '#999999',
          })
        );

        setPieData(formattedPieData);
      } catch (error) {
        console.error('❌ Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
        <Link to="/">
          <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Home</button>
        </Link>
        <li>/</li>
        <li>
          <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Coupons</button>
        </li>
      </ol>

      {/* Pie Chart */}
      <div className="text-center mt-6">
        <DashboardPieChart data={pieData} />
        <p className="mt-4 flex justify-center gap-4 flex-wrap text-sm font-semibold">
          {pieData.map((item) => (
            <span key={item.name} style={{ color: item.color }}>
              ● {item.name}
            </span>
          ))}
        </p>
      </div>

      {/* Table */}
      <div className="p-6">
        <CouponsTable coupons={couponList} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default Coupons;
