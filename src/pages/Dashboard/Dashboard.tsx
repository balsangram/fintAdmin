// import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import DashboardBarChart from '../../components/pieChart/DashboardBarChart';
import PaymentTable from '../../components/table/PaymentTable';
import LineChartComponent from '../../components/pieChart/LineChartComponent';
import BloodRequestTable, { BloodRequest } from '../../components/table/BloodRequestTable';
import CountCardGrid from '../../components/countCard/CountCardGrid';
import InsuranceTable from '../../components/table/InsuranceTable';
import { UserPlus, Users, Building2 } from 'lucide-react';
import { useState } from 'react';

interface PieDataItem {
  name: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  data: PieDataItem[];
  link?: string; // Made link optional
}

// Reusable ChartCard Component
const ChartCard: React.FC<ChartCardProps> = ({ title, data, link }) => {
  const navigate = useNavigate(); // Moved inside the component

  return (
    <div>
      <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
      {link ? (
        <div onClick={() => navigate(link)} className="cursor-pointer">
          <DashboardPieChart data={data} />
        </div>
      ) : (
        <DashboardPieChart data={data} />
      )}
      <p className="mt-2 text-sm text-gray-700 text-center">Added • Viewed • Expired</p>
    </div>
  );
};

// Sample Data
const pieData: PieDataItem[] = [
  { name: 'Added', value: 400 },
  { name: 'Viewed', value: 300 },
  { name: 'Expired', value: 300 },
];

const barChartData = [
  { name: 'Page A', SUCCESSFUL: 4000, DECLINED: 2400 },
  { name: 'Page B', SUCCESSFUL: 3000, DECLINED: 1398 },
  { name: 'Page C', SUCCESSFUL: 2000, DECLINED: 9800 },
  { name: 'Page D', SUCCESSFUL: 2780, DECLINED: 3908 },
];

const tableSampleData = [
  {  id: 1, name: 'Alice', to_name: 'Bob', balance: -500, paymentDate: '2025-07-10' },
  {  id: 2, name: 'Charlie', to_name: 'David', balance: 1000, paymentDate: '2025-07-09' },
  {  id: 3, name: 'Eve', to_name: 'Frank', balance: -200, paymentDate: '2025-07-08' },
  {  id: 4, name: 'Grace', to_name: 'Heidi', balance: 1200, paymentDate: '2025-07-07' },
  {  id: 5, name: 'Ivan', to_name: 'Judy', balance: -750, paymentDate: '2025-07-06' },
];


const lineChartData = [
  { name: 'Page A', Fint: 4000, Ventures: 2400, amt: 2400 },
  { name: 'Page B', Fint: 1000, Ventures: 1398, amt: 2210 },
  { name: 'Page C', Fint: 2000, Ventures: 9800, amt: 2290 },
];

const countCardData = [
  { label: 'NEW REGISTER USERS', value: 710, icon: <UserPlus />, iconBgColor: 'bg-orange-400' },
  { label: 'FINT USERS', value: 915, icon: <Users />, iconBgColor: 'bg-blue-600' },
  { label: 'VENTURES USERS', value: 580, icon: <Building2 />, iconBgColor: 'bg-green-500' },
];

const insuranceData = [
  { id: 1, petParentName: 'John Doe', applyDate: '2025-06-23', petName: 'Buddy', insuranceType: 'Health' },
  { id: 2, petParentName: 'Jane Smith', applyDate: '2025-06-24', petName: 'Whiskers', insuranceType: 'Life' },
  { id: 3, petParentName: 'Alice Johnson', applyDate: '2025-06-25', petName: 'Coco', insuranceType: 'Life' },
  { id: 4, petParentName: 'Bob Brown', applyDate: '2025-06-26', petName: 'Simba', insuranceType: 'Life' },
  { id: 5, petParentName: 'Eve Davis', applyDate: '2025-06-27', petName: 'Luna', insuranceType: 'Life' },
];

const Dashboard: React.FC = () => {
     const Navigate = useNavigate();
const [requests, setRequests] = useState<BloodRequest[]>([
  { id: 1, bloodGroup: 'A+', userName: 'John Doe', status: 'Pending', date: '2025-06-23' },
  { id: 2, bloodGroup: 'B-', userName: 'Jane Smith', status: 'Pending', date: '2025-06-24' },
  { id: 3, bloodGroup: 'O+', userName: 'Ravi Kumar', status: 'Pending', date: '2025-06-25' },
  { id: 4, bloodGroup: 'AB+', userName: 'Alice Johnson', status: 'Pending', date: '2025-06-25' },
//   { id: 5, bloodGroup: 'O-', userName: 'Bob Brown', status: 'Pending', date: '2025-06-26' },
]);
  const handleApprove = (id: number) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req)));
  };

  const handleReject = (id: number) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req)));
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-black dark:text-white-light">Dashboard</span>
          </li>
        </ol>
      </nav>

      <div className="mt-8">
        <CountCardGrid items={countCardData} />
      </div>

      <div className="flex xl:flex-row flex-col">
        <div className="p-4 space-y-6 xl:w-[60%] w-full">
          {/* Pie Chart Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <ChartCard title="E-CHANGE" data={pieData} link="/e-change" />
            <ChartCard title="RED DROP" data={pieData} link="/red-drop" />
            <ChartCard title="PET INSURANCE" data={pieData} link="/pet-applications" />

            {/* Dashboard Bar Chart */}
            <div className="lg:col-span-2">
              <h1 className="text-lg font-bold">PAYMENT</h1>
                  <div onClick={()=>{
                Navigate("/payments")
            }}>
              <DashboardBarChart data={barChartData} height={300} />
            </div>
            </div>

            {/* Coupons Card */}
             <div onClick={()=>{
                Navigate("/coupons")
            }}>
            <ChartCard title="COUPONS" data={pieData} />
            </div>

            {/* Payment Table */}
            <div className="lg:col-span-2">
              <h1 className="text-lg font-bold">PAYMENT</h1>
                 <div onClick={()=>{
                Navigate("/payments")
            }}>
              <PaymentTable data={tableSampleData} />
              </div>
            </div>

            {/* ADS Card */}
               <div onClick={()=>{
                Navigate("/ads")
            }}>
            <ChartCard title="ADS" data={pieData} />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6 xl:w-[40%] w-full">
          <div className='mb-12'>
            <h1 className="text-lg font-bold my-4">Latest Blood Requests</h1>
            <div onClick={()=>{
                Navigate("/red-drop")
            }}>
            <BloodRequestTable requests={requests} onApprove={handleApprove} onReject={handleReject} />
            </div>
          </div>

          <div className="lg:col-span-2 mb-10">
            <h1 className="text-lg font-bold mb-2">Active Users List</h1>
            <div onClick={()=>{
                Navigate("/user-list")
            }}>
            <LineChartComponent height={290} data={lineChartData} />
            </div>
          </div>

          <div>
            <h1 className="text-lg font-bold my-4">Insurance Table</h1>
            <div onClick={()=>{
                Navigate("/pet-applications")
            }}>
            <InsuranceTable data={insuranceData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;