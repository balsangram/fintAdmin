// import { Eye, EyeOff, Trash2 } from 'lucide-react';
// import React, { useState } from 'react';

// export interface Coupon {
//     id: string;
//     name: string;
//     dateAdded: string;
//     viewCount: number;
//     expiredOn: string;
//     status: 'Deleted' | 'Expired';
//     claimPercentage: number;
// }

// interface CouponsTableProps {
//     coupons: Coupon[];
//     onDelete: (id: string) => void;
// }

// const CouponsTable: React.FC<CouponsTableProps> = ({ coupons, onDelete }) => {
//     const [viewStates, setViewStates] = useState<Record<string, boolean>>({});

//     const toggleView = (id: string) => {
//         setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     const formatDate = (date: string) =>
//         new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         });

//     return (
//         <div className="p-4 overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//                 <thead>
//                     <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//                         <th className="px-4 py-3">S.No</th>
//                         <th className="px-4 py-3">Coupon Name</th>
//                         <th className="px-4 py-3">Date Added On</th>
//                         <th className="px-4 py-3">View Count</th>
//                         <th className="px-4 py-3">Expired On</th>
//                         <th className="px-4 py-3">Status</th>
//                         <th className="px-4 py-3">Claim %</th>
//                         <th className="px-4 py-3">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {coupons.length === 0 ? (
//                         <tr>
//                             <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
//                                 No coupons available
//                             </td>
//                         </tr>
//                     ) : (
//                         coupons.map((coupon, index) => (
//                             <tr key={coupon.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
//                                 <td className="px-4 py-3">{index + 1}</td>
//                                 <td className="px-4 py-3 font-medium">{coupon.name}</td>
//                                 <td className="px-4 py-3">{formatDate(coupon.dateAdded)}</td>
//                                 <td className="px-4 py-3">{coupon.viewCount}</td>
//                                 <td className="px-4 py-3">{formatDate(coupon.expiredOn)}</td>
//                                 <td className="px-4 py-3">
//                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                                         {coupon.status}
//                                     </span>
//                                 </td>
//                                 <td className="px-4 py-3">{coupon.claimPercentage}%</td>
//                                 <td className="px-4 py-2 flex gap-2 justify-center items-center">
//                                     <button onClick={() => toggleView(coupon.id)} className="text-gray-600 hover:text-gray-800" title={viewStates[coupon.id] ? 'Hide' : 'View'}>
//                                         {viewStates[coupon.id] ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                     <button onClick={() => onDelete(coupon.id)} className="text-red-600 hover:text-red-800" title="Delete">
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CouponsTable;

import { Eye, EyeOff, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export interface Coupon {
    id: string;
    name: string;
    dateAdded: string;
    viewCount: number;
    expiredOn: string;
    status: 'Deleted' | 'Expired';
    claimPercentage: number;
}

interface CouponsTableProps {
    coupons: Coupon[];
    onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 20;

const CouponsTable: React.FC<CouponsTableProps> = ({ coupons, onDelete }) => {
    const [viewStates, setViewStates] = useState<Record<string, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const toggleView = (id: string) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    const filteredCoupons = coupons.filter((coupon) =>
        coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.dateAdded.includes(searchTerm) ||
        coupon.expiredOn.includes(searchTerm) ||
        coupon.claimPercentage.toString().includes(searchTerm) ||
        coupon.viewCount.toString().includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);
    const paginatedCoupons = filteredCoupons.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="">
            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search coupons..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
<div className='overflow-x-auto'>
            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-3">S.No</th>
                        <th className="px-4 py-3">Coupon Name</th>
                        <th className="px-4 py-3">Date Added On</th>
                        <th className="px-4 py-3">View Count</th>
                        <th className="px-4 py-3">Expired On</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Claim %</th>
                        <th className="px-4 py-3 text-center">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCoupons.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                                No coupons found
                            </td>
                        </tr>
                    ) : (
                        paginatedCoupons.map((coupon, index) => (
                            <tr key={coupon.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                                <td className="px-4 py-3">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                                <td className="px-4 py-3 font-medium">{coupon.name}</td>
                                <td className="px-4 py-3">{formatDate(coupon.dateAdded)}</td>
                                <td className="px-4 py-3">{coupon.viewCount}</td>
                                <td className="px-4 py-3">{formatDate(coupon.expiredOn)}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {coupon.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{coupon.claimPercentage}%</td>
                                <td className="px-4 py-2 flex gap-2 justify-center items-center pt-8">
                                    <button
                                        onClick={() => toggleView(coupon.id)}
                                        className="text-gray-600 hover:text-gray-800"
                                        title={viewStates[coupon.id] ? 'Hide' : 'View'}
                                    >
                                        {viewStates[coupon.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button
                                        onClick={() => onDelete(coupon.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center  space-x-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CouponsTable;
