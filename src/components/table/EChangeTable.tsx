// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// interface EChangeTransaction {
//     roleNo: number;
//     name: string;
//     amount: number;
//     debitedFrom: string;
//     creditedTo: string;
//     status: 'On Hold' | 'Success' | 'Declined';
//     date: string;
// }

// interface EChangeTableProps {
//     data: EChangeTransaction[];
//     onApprove?: (roleNo: number) => void;
//     onReject?: (roleNo: number) => void;
// }

// const EChangeTable: React.FC<EChangeTableProps> = ({ data, onApprove, onReject }) => {
//     const [viewStates, setViewStates] = useState<Record<number, boolean>>({});

//     const toggleView = (id: number) => {
//         setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="w-full overflow-x-auto rounded shadow-md">
//             <table className="min-w-full table-auto border text-sm">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                     <tr>
//                         <th className="px-4 py-2 border">Role No</th>
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">E Change Amount</th>
//                         <th className="px-4 py-2 border">Debited From</th>
//                         <th className="px-4 py-2 border">Credited To</th>
//                         <th className="px-4 py-2 border">Status</th>
//                         <th className="px-4 py-2 border">Date</th>
//                         <th className="px-4 py-2 border">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((txn) => (
//                         <tr key={txn.roleNo} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 border">{txn.roleNo}</td>
//                             <td className="px-4 py-2 border">{txn.name}</td>
//                             <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
//                             <td className="px-4 py-2 border">{txn.debitedFrom}</td>
//                             <td className="px-4 py-2 border">{txn.creditedTo}</td>
//                             <td className="px-4 py-2 border font-medium">
//                                 <span className={txn.status === 'Success' ? 'text-green-600' : txn.status === 'Declined' ? 'text-red-600' : 'text-yellow-600'}>{txn.status}</span>
//                             </td>
//                             <td className="px-4 py-2 border">{txn.date}</td>
//                             <td className="px-4 py-2 border">
//                                 <button onClick={() => toggleView(txn.roleNo)} className="text-gray-600 hover:text-gray-800">
//                                     {viewStates[txn.roleNo] ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default EChangeTable;


import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface EChangeTransaction {
    roleNo: number;
    name: string;
    amount: number;
    debitedFrom: string;
    creditedTo: string;
    status: 'On Hold' | 'Success' | 'Declined';
    date: string;
}

interface EChangeTableProps {
    data: EChangeTransaction[];
    onApprove?: (roleNo: number) => void;
    onReject?: (roleNo: number) => void;
}

const ITEMS_PER_PAGE = 20;

const EChangeTable: React.FC<EChangeTableProps> = ({ data, onApprove, onReject }) => {
    const [viewStates, setViewStates] = useState<Record<number, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const toggleView = (id: number) => {
        setViewStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter logic for search
    const filteredData = data.filter((txn) =>
        txn.roleNo.toString().includes(searchTerm) ||
        txn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.amount.toString().includes(searchTerm) ||
        txn.debitedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.creditedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.date.includes(searchTerm)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="w-full overflow-x-auto rounded shadow-md">
            {/* Search Input */}
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
<div className='overflow-x-auto'>
            {/* Table */}
            <table className="min-w-full table-auto border text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">Role No</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">E Change Amount</th>
                        <th className="px-4 py-2 border">Debited From</th>
                        <th className="px-4 py-2 border">Credited To</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((txn) => (
                            <tr key={txn.roleNo} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{txn.roleNo}</td>
                                <td className="px-4 py-2 border">{txn.name}</td>
                                <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border">{txn.debitedFrom}</td>
                                <td className="px-4 py-2 border">{txn.creditedTo}</td>
                                <td className="px-4 py-2 border font-medium">
                                    <span className={
                                        txn.status === 'Success'
                                            ? 'text-green-600'
                                            : txn.status === 'Declined'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                    }>
                                        {txn.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">{txn.date}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button onClick={() => toggleView(txn.roleNo)} className="text-gray-600 hover:text-gray-800">
                                        {viewStates[txn.roleNo] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center py-4 text-gray-500">No results found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
</div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
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
                            className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
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

export default EChangeTable;
