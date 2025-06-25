import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import SpendingTable from '../../components/table/SpendingTable';
import { Link } from 'react-router-dom';
import CustomPieChart from '../../components/pieChart/CustomPieChart';

interface PieDataItem {
    name: string;
    value: number;
}

const sampleData = [
  { name: 'Food', value: 400 },
  { name: 'Gym', value: 300 },
  { name: 'Travel', value: 250 },
  { name: 'Electronics', value: 350 },
];

const colors = ['#6C5CE7', '#00B894', '#D63031',  '#15803D'];


const spendingData = [
    {
        rollNo: '101',
        userName: 'Sangram Bal',
        // avatarUrl: 'https://i.pravatar.cc/150?img=1',
        spentOn: 'Online Course',
        spentDate: '2024-06-20',
        amount: 499.99,
        category: 'Food',
    },
    {
        rollNo: '102',
        userName: 'Ravi Kumar',
        // avatarUrl: 'https://i.pravatar.cc/150?img=2',
        spentOn: 'Amazon Purchase',
        spentDate: '2024-05-15',
        amount: 899.0,
        category: 'Gym',
    },
];

function ExpenseTracker() {
    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                 <Link to="/">
                                       <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                       
                                       >Home</button>
                                   </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Expense Tracker</button>
                </li>
            
            </ol>

            <div className="text-center flex flex-col items-center justify-center">
            
  <CustomPieChart data={sampleData} />


              
                <p>
                    <span className="text-green-600">● Food </span> <span className="text-red-600">● Gym </span>
                     <span className="text-pink-600">● Travel </span>
                     <span className="text-yellow-600">● Electronics</span>
                </p>
            </div>

            <div className="p-6">
                {/* <h1 className="text-xl font-bold mb-4">Spending Report</h1> */}
                <SpendingTable data={spendingData} />
            </div>
        </>
    );
}

export default ExpenseTracker;
