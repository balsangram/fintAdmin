import React, { useEffect, useState } from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import AdsTable, { AdData } from '../../components/table/AdsTable';
import { Link } from 'react-router-dom';
import { getAdminAdvertisements } from '../../api/all.api';

interface PieDataItem {
    name: string;
    value: number;
}

// const pieData: PieDataItem[] = [
//     { name: 'Added', value: 400 },
//     { name: 'Expired', value: 300 },
//     { name: 'Deleted', value: 100 },
// ];

// const dummyAds: AdData[] = [
//     {
//         id: 1,
//         adName: 'Summer Sale',
//         dateAdded: '2025-06-01',
//         adCount: 150,
//         expiredOn: '2025-06-30',
//         status: 'Deleted',
//     },
//     {
//         id: 2,
//         adName: 'Flash Discount',
//         dateAdded: '2025-05-10',
//         adCount: 90,
//         expiredOn: '2025-06-10',
//         status: 'Expired',
//     },
// ];

function Ads() {

      const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [dummyAds, setDummyAds] = useState<AdData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("advertisement page");

        const result = await getAdminAdvertisements();
        const { advertisements, statusSummary } = result.data;

        // ✅ 1. Prepare pie chart data
        const pieDataFormatted: PieDataItem[] = Object.entries(statusSummary).map(
          ([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
            value: value as number,
          })
        );

        // ✅ 2. Format ad data
        const adsFormatted: AdData[] = advertisements.map((ad: any) => ({
          id: ad._id,
          adName: ad.title,
          dateAdded: new Date(ad.createdAt).toLocaleDateString(),
          expiredOn: new Date(ad.validity).toLocaleDateString(),
          status: ad.status.charAt(0).toUpperCase() + ad.status.slice(1),
        }));

        setPieData(pieDataFormatted);
        setDummyAds(adsFormatted);
      } catch (error) {
        console.error("❌ Error in useEffect while fetching admin advertisements:", error);
      }
    };

    fetchData();
  }, []);

    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
              <Link to="/">
                                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                    
                                    >Home</button>
                                </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Ads</button>
                </li>
                {/* <li>/</li>
                <li>
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
                </li> */}
            </ol>
            <div className="text-center">
                <DashboardPieChart data={pieData} />
                <p>
                    <span className="text-[#131D4F]">● Added</span> <span className="text-[#8CCDEB]">● Expired</span>{' '}
                    <span className="text-[#FFE3A9]">● Deleted</span>
                </p>
            </div>
            <div className="p-6">
                {/* <h2 className="text-xl font-semibold mb-4">Ad Management</h2> */}
                <AdsTable ads={dummyAds} />
            </div>
        </>
    );
}

export default Ads;
