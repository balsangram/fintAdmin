// import React from 'react';

// type Donor = {
//     serialNo: number;
//     donorName: string;
//     bloodGroup: string;
//     donatedOn: string; // ISO Date string
//     registeredOn: string; // ISO Date string
// };

// type Props = {
//     donors: Donor[];
// };

// const DonorTable: React.FC<Props> = ({ donors }) => {
//     return (
//         <div className="p-4 overflow-x-auto">
//             <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
//                 <thead>
//                     <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
//                         <th className="py-2 px-4">Serial No</th>
//                         <th className="py-2 px-4">Donor Name</th>
//                         <th className="py-2 px-4">Blood Group</th>
//                         <th className="py-2 px-4">Donated On</th>
//                         <th className="py-2 px-4">Registered On</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {donors.map((donor) => (
//                         <tr key={donor.serialNo} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
//                             <td className="py-2 px-4">{donor.serialNo}</td>
//                             <td className="py-2 px-4">{donor.donorName}</td>
//                             <td className="py-2 px-4">{donor.bloodGroup}</td>
//                             <td className="py-2 px-4">{new Date(donor.donatedOn).toLocaleDateString()}</td>
//                             <td className="py-2 px-4">{new Date(donor.registeredOn).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DonorTable;
// export type { Donor };


import React, { useState } from 'react';

type Donor = {
    serialNo: number;
    donorName: string;
    bloodGroup: string;
    donatedOn: string; // ISO Date string
    registeredOn: string; // ISO Date string
};

type Props = {
    donors: Donor[];
};

const DonorTable: React.FC<Props> = ({ donors }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDonors = donors
        .filter((donor) =>
            donor.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3); // show only 3

    return (
        <div className="">
            {/* 🔍 Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or blood group"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

<div className='overflow-x-auto'>
            {/* 🩸 Donor Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
                        <th className="py-2 px-4">Serial No</th>
                        <th className="py-2 px-4">Donor Name</th>
                        <th className="py-2 px-4">Blood Group</th>
                        <th className="py-2 px-4">Donated On</th>
                        <th className="py-2 px-4">Registered On</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDonors.length > 0 ? (
                        filteredDonors.map((donor) => (
                            <tr
                                key={donor.serialNo}
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <td className="py-2 px-4">{donor.serialNo}</td>
                                <td className="py-2 px-4">{donor.donorName}</td>
                                <td className="py-2 px-4">{donor.bloodGroup}</td>
                                <td className="py-2 px-4">{new Date(donor.donatedOn).toLocaleDateString()}</td>
                                <td className="py-2 px-4">{new Date(donor.registeredOn).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No matching donors found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default DonorTable;
export type { Donor };
