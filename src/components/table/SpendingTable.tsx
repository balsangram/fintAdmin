import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Spending = {
    rollNo: string;
    userName: string;
    spentOn: string;
    spentDate: string;
    amount: number;
    category: string;
};

type Props = {
    data: Spending[];
};

const SpendingTable: React.FC<Props> = ({ data }) => {
    const [permissions, setPermissions] = useState<{ [key: number]: boolean }>(
        () => data.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
    );

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const togglePermission = (index: number) => {
        setPermissions((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="">
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // reset to first page on search
                    }}
                    className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
<div className='overflow-x-auto'>
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
                        <th className="py-2 px-4">Roll No</th>
                        <th className="py-2 px-4">User Profile</th>
                        <th className="py-2 px-4">Spent On</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Amount Spent</th>
                        <th className="py-2 px-4">Category</th>
                        <th className="py-2 px-4">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-2 px-4">{item.rollNo}</td>
                            <td className="py-2 px-4">{item.userName}</td>
                            <td className="py-2 px-4">{item.spentOn}</td>
                            <td className="py-2 px-4">{item.spentDate}</td>
                            <td className="py-2 px-4">₹{item.amount.toFixed(2)}</td>
                            <td className="py-2 px-4">{item.category}</td>
                            <td className="py-2 px-4 flex items-center gap-2">
                                {permissions[index] ? (
                                    <Eye className="cursor-pointer text-green-500 hover:text-green-700" size={20} onClick={() => togglePermission(index)} />
                                ) : (
                                    <EyeOff className="cursor-pointer text-gray-500 hover:text-gray-700" size={20} onClick={() => togglePermission(index)} />
                                )}
                            </td>
                        </tr>
                    ))}
                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center text-gray-500 py-4">
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded border ${
                                currentPage === i + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpendingTable;
