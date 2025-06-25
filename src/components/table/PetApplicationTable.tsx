// import React, { useState } from 'react';
// import { Eye, EyeOff, Pencil } from 'lucide-react';

// type PetApplication = {
//     rollNo: string;
//     parentName: string;
//     petName: string;
//     breed: string;
//     appliedOn: string; // date in string format
// };

// type Props = {
//     data: PetApplication[];
// };

// const PetApplicationTable: React.FC<Props> = ({ data }) => {
//     const [visibleMap, setVisibleMap] = useState<{ [key: number]: boolean }>(() => data.reduce((acc, _, index) => ({ ...acc, [index]: true }), {}));

//     const toggleVisibility = (index: number) => {
//         setVisibleMap((prev) => ({
//             ...prev,
//             [index]: !prev[index],
//         }));
//     };

//     return (
//         <div className="p-4 overflow-x-auto">
//             <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
//                 <thead>
//                     <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
//                         <th className="py-2 px-4">Roll No</th>
//                         <th className="py-2 px-4">Pet Parent Name</th>
//                         <th className="py-2 px-4">Pet Name</th>
//                         <th className="py-2 px-4">Breed</th>
//                         <th className="py-2 px-4">Applied On</th>
//                         <th className="py-2 px-4">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
//                             <td className="py-2 px-4">{item.rollNo}</td>
//                             <td className="py-2 px-4">{item.parentName}</td>
//                             <td className="py-2 px-4">{item.petName}</td>
//                             <td className="py-2 px-4">{item.breed}</td>
//                             <td className="py-2 px-4">{new Date(item.appliedOn).toLocaleDateString()}</td>
//                             <td className="py-2 px-4 flex items-center space-x-3">
//                                 {visibleMap[index] ? (
//                                     <Eye size={18} className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => toggleVisibility(index)} />
//                                 ) : (
//                                     <EyeOff size={18} className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => toggleVisibility(index)} />
//                                 )}
//                                 <Pencil size={18} className="cursor-pointer text-green-500 hover:text-green-700" onClick={() => console.log('Edit', item.petName)} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PetApplicationTable;
// export type { PetApplication };


import React, { useState } from 'react';
import { Eye, EyeOff, Pencil } from 'lucide-react';

type PetApplication = {
    rollNo: string;
    parentName: string;
    petName: string;
    breed: string;
    appliedOn: string;
};

type Props = {
    data: PetApplication[];
};

const PetApplicationTable: React.FC<Props> = ({ data }) => {
    const [visibleMap, setVisibleMap] = useState<{ [key: number]: boolean }>(() =>
        data.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
    );
    const [searchTerm, setSearchTerm] = useState('');

    const toggleVisibility = (index: number) => {
        setVisibleMap((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const filteredData = data
        .filter(
            (item) =>
                item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.breed.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3); // limit to 3

    return (
        <div className="">
            {/* 🔍 Search Field */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search pet, parent, or breed"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
 <div className="overflow-x-auto">
            {/* 🐶 Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
                        <th className="py-2 px-4">Roll No</th>
                        <th className="py-2 px-4">Pet Parent Name</th>
                        <th className="py-2 px-4">Pet Name</th>
                        <th className="py-2 px-4">Breed</th>
                        <th className="py-2 px-4">Applied On</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <td className="py-2 px-4">{item.rollNo}</td>
                                <td className="py-2 px-4">{item.parentName}</td>
                                <td className="py-2 px-4">{item.petName}</td>
                                <td className="py-2 px-4">{item.breed}</td>
                                <td className="py-2 px-4">{new Date(item.appliedOn).toLocaleDateString()}</td>
                                <td className="py-2 px-4 flex items-center space-x-3">
                                    {visibleMap[index] ? (
                                        <Eye
                                            size={18}
                                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                                            onClick={() => toggleVisibility(index)}
                                        />
                                    ) : (
                                        <EyeOff
                                            size={18}
                                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                                            onClick={() => toggleVisibility(index)}
                                        />
                                    )}
                                    <Pencil
                                        size={18}
                                        className="cursor-pointer text-green-500 hover:text-green-700"
                                        onClick={() => console.log('Edit', item.petName)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                No matching results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PetApplicationTable;
export type { PetApplication };
