import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardBarChart from '../../components/pieChart/DashboardBarChart';
import TransactionTable from '../../components/table/TransactionTable';
import { MdOutlinePhotoSizeSelectSmall } from "react-icons/md";
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';

interface PieDataItem {
    name: string;
    value: number;
}

const sampleData = [
    { name: 'Page A', SUCCESSFUL: 4000, DECLINED: 2400 },
    { name: 'Page B', SUCCESSFUL: 3000, DECLINED: 1398 },
    { name: 'Page C', SUCCESSFUL: 2000, DECLINED: 9800 },
    { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
    { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
    { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
    { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
    { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
];

type Transaction = {
    id: number;
    amount: number;
    debitedTo: string;
    creditedTo: string;
    status: 'Success' | 'Declined' | 'On Hold';
    date: string;
};

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
];

const transactions: Transaction[] = [
    {
        id: 1,
        amount: 1500,
        debitedTo: 'Account A',
        creditedTo: 'Account B',
        status: 'Declined',
        date: '2025-06-18',
    },
    {
        id: 2,
        amount: 3200,
        debitedTo: 'Account C',
        creditedTo: 'Account D',
        status: 'Success',
        date: '2025-06-17',
    },
];

function Payments() {
    const [chartHeight, setChartHeight] = useState(400);

    const toggleHeight = () => {
        setChartHeight(prev => (prev === 400 ? 200 : 400));
    };

    return (
        <div>
            {/* Breadcrumbs */}
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                <Link to="/">
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Home</button>
                </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Payments</button>
                </li>
            </ol>

            {/* Toggle Button */}
            <div className='hidden md:block absolute top-[3rem] right-[4rem]  cursor-pointer' onClick={toggleHeight}>
                <MdOutlinePhotoSizeSelectSmall className=' text-2xl' />
            </div>

            {/* Chart with transition */}
            <div
                className="px-[8rem] transition-all duration-500 ease-in-out overflow-hidden md:block hidden"
                style={{ height: chartHeight }}
            >
                {/* <h1>Payment</h1> */}
                <DashboardBarChart data={sampleData} height={chartHeight} />
            </div>

              <div className="text-center block md:hidden">
                <DashboardPieChart data={pieData} />
                <p>
                    <span className="text-green-600">● Successful</span> <span className="text-red-600">● Declined</span>
                </p>
            </div>

            {/* Transaction Table */}
            <TransactionTable
                transactions={transactions}
                onApprove={(id) => console.log('Approved', id)}
                onReject={(id) => console.log('Rejected', id)}
            />
        </div>
    );
}

export default Payments;
