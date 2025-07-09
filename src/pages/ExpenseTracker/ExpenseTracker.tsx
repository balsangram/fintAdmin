import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import SpendingTable from '../../components/table/SpendingTable';
import { Link } from 'react-router-dom';
import CustomPieChart from '../../components/pieChart/CustomPieChart';

// interface PieDataItem {
//     name: string;
//     value: number;
// }

// const sampleData = [
//   { name: 'Food', value: 400 },
//   { name: 'Gym', value: 300 },
//   { name: 'Travel', value: 250 },
//   { name: 'Electronics', value: 350 },
//     { name: 'Food', value: 400 },
//       { name: 'Food', value: 400 },
//   { name: 'Gym', value: 300 },
//   { name: 'Travel', value: 250 },
//   { name: 'Electronics', value: 350 },
//     { name: 'Food', value: 400 },
    
  
// ];

// const colors = ['#6C5CE7', '#00B894', '#D63031',  '#15803D'];


const spendingData = [ {
    rollNo: '110',
    userName: 'Suresh Das',
    spentOn: 'Notebook & Pen',
    spentDate: '2024-06-08',
    amount: 120.0,
    category: 'General',
  },
   {
    rollNo: '103',
    userName: 'Anjali Sharma',
    spentOn: 'Grocery Shopping',
    spentDate: '2024-06-10',
    amount: 1200.5,
    category: 'Food',
  },
    {
    rollNo: '108',
    userName: 'Vikas Mehta',
    spentOn: 'Party with Friends',
    spentDate: '2024-06-22',
    amount: 850.0,
    category: 'Social Life',
  },
    {
    rollNo: '104',
    userName: 'Rahul Verma',
    spentOn: 'Pet Vaccination',
    spentDate: '2024-06-05',
    amount: 300.0,
    category: 'Pets',
  },
    {
    rollNo: '105',
    userName: 'Priya Sinha',
    spentOn: 'Metro Pass Recharge',
    spentDate: '2024-06-01',
    amount: 100.0,
    category: 'Transport',
  },
  
  {
    rollNo: '106',
    userName: 'Aman Yadav',
    spentOn: 'Netflix Subscription',
    spentDate: '2024-06-25',
    amount: 199.0,
    category: 'Culture',
  },
    {
    rollNo: '107',
    userName: 'Neha Gupta',
    spentOn: 'Electricity Bill',
    spentDate: '2024-06-18',
    amount: 1450.0,
    category: 'Household',
  },
  {
    rollNo: '101',
    userName: 'Sangram Bal',
    spentOn: 'Online Course',
    spentDate: '2024-06-20',
    amount: 499.99,
    category: 'Education',
  },
  {
    rollNo: '102',
    userName: 'Ravi Kumar',
    spentOn: 'Amazon Purchase',
    spentDate: '2024-05-15',
    amount: 899.0,
    category: 'Gym',
  },

  {
    rollNo: '109',
    userName: 'Kavita Rao',
    spentOn: 'Doctor Visit',
    spentDate: '2024-06-12',
    amount: 700.0,
    category: 'Medical',
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

            {/* <div className="text-center flex flex-col items-center justify-center">
            
  <CustomPieChart data={sampleData} />
                <p>
                    <span className="text-green-600">● Food </span> <span className="text-red-600">● Gym </span>
                     <span className="text-pink-600">● Travel </span>
                     <span className="text-yellow-600">● Electronics</span>
                </p>
            </div> */}

            <div className="p-6">
                <h1 className='text-center my-8 text-2xl font-bold'>Expense Tracker</h1>
                {/* <h1 className="text-xl font-bold mb-4">Spending Report</h1> */}
                <SpendingTable data={spendingData} />
            </div>
        </>
    );
}

export default ExpenseTracker;
