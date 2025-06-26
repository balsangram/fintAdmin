import React from 'react';
import LineChartComponent from '../../components/pieChart/LineChartComponent';
import UserTable, { User } from '../../components/table/UserTable';
import { Link } from 'react-router-dom';
import CustomPieChart from '../../components/pieChart/CustomPieChart';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';


interface PieDataItem {
    name: string;
    value: number;
}

const colors = ['#22C55E', '#FACC15']; // Custom colors: green, red, yellow


const sampleDataGraph = [
    { name: 'Page A', Ventures: 4000, Fint: 2400, amt: 2400 },
    { name: 'Page B', Ventures: 3000, Fint: 1398, amt: 2210 },
    { name: 'Page C', Ventures: 2000, Fint: 9800, amt: 2290 },
    { name: 'Page D', Ventures: 1000, Fint: 1800, amt: 2230 },
    { name: 'Page E', Ventures: 4000, Fint: 4800, amt: 2210 },
];

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },

];

const users: User[] = [
    {
        rollNo: '101',
        userName: 'sangram01',
        accountType: 'Fint User',
        createdAt: '2024-06-20',
    },
    {
        rollNo: '102',
        userName: 'ravik',
        accountType: 'Fint Ventures',
        createdAt: '2024-05-10',
    },
];

function UserList() {
    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                <Link to="/">
                                      <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                      
                                      >Home</button>
                                  </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">User List</button>
                </li>
                {/* <li>/</li>
                <li>
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
                </li> */}
            </ol>
            <div className="m-4 max-w-[40rem] hidden sm:block">
                {/* <h1>Active Users List</h1> */}
                <LineChartComponent height={290} data={sampleDataGraph} />
            </div>
            
<div className='block sm:hidden text-center'>

</div>
              <div className="text-center sm:hidden block">
                <DashboardPieChart data={pieData} colors={colors}/>
                <p>
                    <span className="text-green-600">● Fint</span> <span className="text-yellow-400">● Fint Ventures</span>
                </p>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 ml-4">User Dashboard</h1>
                <UserTable users={users} />
            </div>
        </>
    );
}

export default UserList;
