import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import EChangeTable from '../../components/table/EChangeTable';
import { Link } from 'react-router-dom';

interface PieDataItem {
    name: string;
    value: number;
}

export interface EChangeTransaction {
    roleNo: number;
    name: string;
    amount: number;
    debitedFrom: string;
    creditedTo: string;
    status: 'On Hold' | 'Success' | 'Declined';
    date: string;
}

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
    { name: 'Expired', value: 300 },
];

// ✅ Explicitly annotate sampleData with EChangeTransaction[]
const sampleData: EChangeTransaction[] = [
    {
        roleNo: 101,
        name: 'Alice Johnson',
        amount: 1200,
        debitedFrom: 'Wallet A',
        creditedTo: 'Wallet B',
        status: 'On Hold',
        date: '2025-06-18',
    },
    {
        roleNo: 102,
        name: 'Bob Smith',
        amount: 2500,
        debitedFrom: 'Bank X',
        creditedTo: 'Bank Y',
        status: 'Success',
        date: '2025-06-17',
    },
];

function EChange() {
    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                <Link to="/">
                                      <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                      
                                      >Home</button>
                                  </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">E Changes</button>
                </li>
                {/* <li>/</li>
                <li>
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
                </li> */}
            </ol>
            <div className="text-center">
                <DashboardPieChart data={pieData} />
                <p>
                    <span className="text-green-600">● Successful</span> <span className="text-red-600">● Declined</span> <span className="text-gray-600">● On Hold</span>
                </p>
            </div>
            <div className="mt-8">
                <EChangeTable data={sampleData} />
            </div>
        </>
    );
}

export default EChange;
