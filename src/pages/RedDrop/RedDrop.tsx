import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import DonorTable, { Donor } from '../../components/table/DonorTable';
import DonorCard from '../../components/cards/DonorCard';
import doner1 from '../../../public/assets/fintImg/bloodDoner/bhanu.jpg';
import doner2 from '../../../public/assets/fintImg/bloodDoner/suuk.jpg';
import doner3 from '../../../public/assets/fintImg/bloodDoner/vikram.jpg';
import { MdBloodtype } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BloodNeededSection from '../../components/redDrop/BloodNeededSection';

interface PieDataItem {
    name: string;
    value: number;
}

const pieData: PieDataItem[] = [
    { name: 'Added', value: 400 },
    { name: 'Viewed', value: 300 },
    { name: 'Expired', value: 300 },
];

const donors: Donor[] = [
    {
        serialNo: 1,
        donorName: 'Sangram Bal',
        bloodGroup: 'B+',
        donatedOn: '2024-06-15',
        registeredOn: '2024-01-10',
    },
    {
        serialNo: 2,
        donorName: 'Ravi Kumar',
        bloodGroup: 'O-',
        donatedOn: '2024-06-18',
        registeredOn: '2023-12-01',
    },
    {
        serialNo: 3,
        donorName: 'Anjali Sharma',
        bloodGroup: 'A+',
        donatedOn: '2024-06-12',
        registeredOn: '2023-11-20',
    },
    {
        serialNo: 4,
        donorName: 'Anjali Sharma',
        bloodGroup: 'A+',
        donatedOn: '2024-06-12',
        registeredOn: '2023-11-20',
    },
    {
        serialNo: 5,
        donorName: 'Anjali Sharma',
        bloodGroup: 'A+',
        donatedOn: '2024-06-12',
        registeredOn: '2023-11-20',
    },
];

  const bloodLevels = [
    { group: 'A+', level: 0 },
    { group: 'O+', level: 1 },
    { group: 'B-', level: 2 },
    { group: 'AB+', level: 3 },
    { group: 'AB-', level: 3 },
  ];



const donorsDetails = [
    {
        imageUrl: doner1,
        name: 'Sangram Bal',
        bloodGroup: 'B+',
        contactNumber: '9876543210',
    },
    {
        imageUrl: doner2,
        name: 'Ravi Kumar',
        bloodGroup: 'O-',
        contactNumber: '9123456780',
    },
    {
        imageUrl: doner3,
        name: 'Anjali Sharma',
        bloodGroup: 'A+',
        contactNumber: '9988776655',
    },
];

function RedDrop() {
    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2 mb-4">
                <Link to="/">
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"

                    >Home</button>
                </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Red Drop</button>
                </li>
            </ol>

            <div className="flex flex-wrap md:flex-nowrap gap-6 mb-8">
                <div className="w-full md:w-1/2 text-center">
                    <DashboardPieChart data={pieData} />
                    <p className="mt-2 text-sm">
                        <span className="text-green-600">● Added</span> <span className="text-gray-600">● Viewed</span> <span className="text-red-600">● Expired</span>
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <DonorTable donors={donors} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row  dark:bg-gray-900  overflow-hidden">
                {/* Left Section: Blood Needed */}
                <div className="p-8 md:w-1/2">
                  
      <BloodNeededSection bloodLevels={bloodLevels} />
                   
    </div>

                {/* Right Section: List of Donors */}
                <div className="md:w-1/2 w-full bg-gray-50 dark:bg-gray-800 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">👥 List of Donors</h2>
                    <div className=" gap-4 max-h-[500px] overflow-y-auto pr-2 flex">
                        {donorsDetails.map((donor, index) => (
                            <DonorCard
                                key={index}
                                imageUrl={donor.imageUrl}
                                name={donor.name}
                                bloodGroup={donor.bloodGroup}
                                contactNumber={donor.contactNumber}
                                onEdit={() => console.log('Edit', donor.name)}
                                onDelete={() => console.log('Delete', donor.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RedDrop;
