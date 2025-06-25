// import React, { useState } from 'react';
// import { Eye, EyeOff, Trash2 } from 'lucide-react';

// export interface AdData {
//     id: number;
//     adName: string;
//     dateAdded: string;
//     adCount: number;
//     expiredOn: string;
//     status: 'Deleted' | 'Expired';
// }

// export interface AdsTableProps {
//     ads: AdData[];
//     onDelete?: (id: number) => void;
// }

// const AdsTable: React.FC<AdsTableProps> = ({ ads, onDelete }) => {
//     const [viewStates, setViewStates] = useState<Record<number, boolean>>({});

//     const toggleView = (id: number) => {
//         setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="w-full overflow-x-auto rounded shadow-md">
//             <table className="min-w-full table-auto border text-sm">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                     <tr>
//                         <th className="px-4 py-2 border">Serial No</th>
//                         <th className="px-4 py-2 border">Ad Name</th>
//                         <th className="px-4 py-2 border">Date Added On</th>
//                         <th className="px-4 py-2 border">Ad Count</th>
//                         <th className="px-4 py-2 border">Expired On</th>
//                         <th className="px-4 py-2 border">Status</th>
//                         <th className="px-4 py-2 border">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ads.map((ad, index) => (
//                         <tr key={ad.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 border text-center">{index + 1}</td>
//                             <td className="px-4 py-2 border">{ad.adName}</td>
//                             <td className="px-4 py-2 border">{ad.dateAdded}</td>
//                             <td className="px-4 py-2 border">{ad.adCount}</td>
//                             <td className="px-4 py-2 border">{ad.expiredOn}</td>
//                             <td className="px-4 py-2 border">
//                                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ad.status === 'Deleted' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                                     {ad.status}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border text-center flex gap-2 justify-center">
//                                 <button onClick={() => toggleView(ad.id)} className="text-gray-600 hover:text-gray-800">
//                                     {viewStates[ad.id] ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                                 <button onClick={() => onDelete?.(ad.id)} className="text-red-600 hover:text-red-800">
//                                     <Trash2 size={18} />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdsTable;


import React, { useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

export interface AdData {
    id: number;
    adName: string;
    dateAdded: string;
    adCount: number;
    expiredOn: string;
    status: 'Deleted' | 'Expired';
}

export interface AdsTableProps {
    ads: AdData[];
    onDelete?: (id: number) => void;
}

const ITEMS_PER_PAGE = 20;

const AdsTable: React.FC<AdsTableProps> = ({ ads, onDelete }) => {
    const [viewStates, setViewStates] = useState<Record<number, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const toggleView = (id: number) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredAds = ads.filter((ad) =>
        ad.adName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.dateAdded.includes(searchTerm) ||
        ad.expiredOn.includes(searchTerm) ||
        ad.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.adCount.toString().includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);
    const paginatedAds = filteredAds.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="w-full overflow-x-auto">
            {/* Search Field */}
            <input
                type="text"
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                className="mb-4 px-4 py-2 border rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
<div className='overflow-x-auto'>
            {/* Table */}
            <table className="min-w-full table-auto border text-sm bg-white rounded-md shadow">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">Serial No</th>
                        <th className="px-4 py-2 border">Ad Name</th>
                        <th className="px-4 py-2 border">Date Added On</th>
                        <th className="px-4 py-2 border">Ad Count</th>
                        <th className="px-4 py-2 border">Expired On</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border text-center">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAds.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                                No ads found.
                            </td>
                        </tr>
                    ) : (
                        paginatedAds.map((ad, index) => (
                            <tr key={ad.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border text-center">
                                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                </td>
                                <td className="px-4 py-2 border">{ad.adName}</td>
                                <td className="px-4 py-2 border">{ad.dateAdded}</td>
                                <td className="px-4 py-2 border">{ad.adCount}</td>
                                <td className="px-4 py-2 border">{ad.expiredOn}</td>
                                <td className="px-4 py-2 border">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ad.status === 'Deleted'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-gray-100 text-gray-700'}`}>
                                        {ad.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border text-center flex gap-2 justify-center">
                                    <button
                                        onClick={() => toggleView(ad.id)}
                                        className="text-gray-600 hover:text-gray-800"
                                        title={viewStates[ad.id] ? 'Hide' : 'View'}
                                    >
                                        {viewStates[ad.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(ad.id)}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default AdsTable;
