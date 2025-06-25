import React from 'react';
import DashboardPieChart from '../../components/pieChart/DashboardPieChart';
import PetApplicationTable, { PetApplication } from '../../components/table/PetApplicationTable';
import PetCard from '../../components/cards/PetCard';
import pet1 from '../../../public/assets/fintImg/pet/Labrador.webp';
import pet2 from '../../../public/assets/fintImg/pet/Pomeranian.webp';
import pet3 from '../../../public/assets/fintImg/pet/Pug.webp';
import pet4 from '../../../public/assets/fintImg/pet/bernese-mountain-dog-royalty-free-image-1581013857.avif';
import { Link } from 'react-router-dom';

interface PieDataItem {
    name: string;
    value: number;
}

const pieData: PieDataItem[] = [
    { name: 'Successful', value: 400 },
    { name: ' On Hold', value: 300 },
    { name: 'Declined', value: 300 },
];

const applications: PetApplication[] = [
    {
        rollNo: '001',
        parentName: 'Sangram Bal',
        petName: 'Bruno',
        breed: 'Golden Retriever',
        appliedOn: '2024-06-10',
    },
    {
        rollNo: '002',
        parentName: 'Ravi Kumar',
        petName: 'Kitty',
        breed: 'Persian Cat',
        appliedOn: '2024-06-12',
    },
    {
        rollNo: '003',
        parentName: 'Ravi Kumar',
        petName: 'Kitty',
        breed: 'Persian Cat',
        appliedOn: '2024-06-12',
    },
];

const pets = [
    {
        imageUrl: pet1,
        petName: 'Bruno',
        parentName: 'Sangram Bal',
        breed: 'Labrador',
        contactNumber: '9876543210',
        address: 'Bangalore, Karnataka',
    },
    {
        imageUrl: pet2,
        petName: 'Kitty',
        parentName: 'Ravi Kumar',
        breed: 'Persian Cat',
        contactNumber: '9123456780',
        address: 'Hyderabad, Telangana',
    },
    {
        imageUrl: pet3,
        petName: 'Max',
        parentName: 'Neha Sharma',
        breed: 'Beagle',
        contactNumber: '9988776655',
        address: 'Mumbai, Maharashtra',
    },
    {
        imageUrl: pet4,
        petName: 'Snowy',
        parentName: 'Amit Joshi',
        breed: 'Husky',
        contactNumber: '9012345678',
        address: 'Delhi, India',
    },
];

function PetApplications() {
    return (
        <>
            <ol className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2">
                <Link to="/">
                                      <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                                      
                                      >Home</button>
                                  </Link>
                <li>/</li>
                <li>
                    <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Pet Applications</button>
                </li>
                {/* <li>/</li>
                <li>
                    <button className="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</button>
                </li> */}
            </ol>
            <div className="flex justify-between flex-col sm:flex-row">
                <div className="text-center w-full  sm:w-[30%] mb-8 sm:m-0">
                    <DashboardPieChart data={pieData} />
                    <p>
                        <span className="text-green-600">● Successful</span> <span className="text-red-600">● Declined</span> <span className="text-gray-600">● On Hold</span>
                    </p>
                </div>
                <div className="pb-6">
                    {/* <h1 className="text-xl font-bold mb-4">🐾 Pet Adoption Applications</h1> */}
                    <PetApplicationTable data={applications} />
                </div>
            </div>

         <h1 className="text-2xl font-bold text-gray-800 ml-6">List of Pet Parents</h1>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pets.map((pet, index) => (
                    <PetCard
                        key={index}
                        imageUrl={pet.imageUrl}
                        petName={pet.petName}
                        parentName={pet.parentName}
                        breed={pet.breed}
                        contactNumber={pet.contactNumber}
                        address={pet.address}
                        onAccept={() => console.log('Accepted:', pet.petName)}
                        onReject={() => console.log('Rejected:', pet.petName)}
                    />
                ))}
            </div>
        </>
    );
}

export default PetApplications;
