
// import React, { useState } from 'react';
// import { CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

// interface Transaction {
//     id: number;
//     amount: number;
//     debitedTo: string;
//     creditedTo: string;
//     status: 'Success' | 'Declined' | 'On Hold';
//     date: string;
// }

// interface TransactionTableProps {
//     transactions: Transaction[];
//     onApprove: (id: number) => void;
//     onReject: (id: number) => void;
// }

// const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onApprove, onReject }) => {
//     const [viewed, setViewed] = useState<Record<number, boolean>>({});

//     const toggleView = (id: number) => {
//         setViewed((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     return (
//         <div className="w-full overflow-x-auto rounded shadow-md">
//             <table className="min-w-full table-auto border text-sm">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                     <tr>
//                         <th className="px-4 py-2 border">ID No</th>
//                         <th className="px-4 py-2 border">Transaction Amount</th>
//                         <th className="px-4 py-2 border">Debited To</th>
//                         <th className="px-4 py-2 border">Credited To</th>
//                         <th className="px-4 py-2 border">Status</th>
//                         <th className="px-4 py-2 border">Date</th>
//                         <th className="px-4 py-2 border">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((txn) => (
//                         <tr key={txn.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 border">{txn.id}</td>
//                             <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
//                             <td className="px-4 py-2 border">{txn.debitedTo}</td>
//                             <td className="px-4 py-2 border">{txn.creditedTo}</td>
//                             <td className="px-4 py-2 border font-medium">
//                                 <span className={txn.status === 'Success' ? 'text-green-600' : txn.status === 'Declined' ? 'text-red-600' : 'text-yellow-600'}>{txn.status}</span>
//                             </td>
//                             <td className="px-4 py-2 border">{txn.date}</td>
//                             <td className="px-4 py-2 border space-x-2 flex items-center justify-center">
//                                 <button onClick={() => toggleView(txn.id)} className="text-gray-600 hover:text-gray-800">
//                                     {viewed[txn.id] ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default TransactionTable;

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Transaction {
    id: number;
    amount: number;
    debitedTo: string;
    creditedTo: string;
    status: 'Success' | 'Declined' | 'On Hold';
    date: string;
}

interface TransactionTableProps {
    transactions: Transaction[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}

const ITEMS_PER_PAGE = 20;

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onApprove, onReject }) => {
    const [viewed, setViewed] = useState<Record<number, boolean>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const toggleView = (id: number) => {
        setViewed((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter logic
    const filteredTransactions = transactions.filter((txn) =>
        txn.id.toString().includes(searchTerm) ||
        txn.debitedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.creditedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.date.includes(searchTerm)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="w-full rounded shadow-md">
            {/* Search Field */}
            <div className="p-4 flex justify-between items-center flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search by Name, Status or Date"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to page 1 when searching
                    }}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
<div className='overflow-x-auto'>
            {/* Table */}
            <table className="min-w-full table-auto border text-sm ">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                    <tr>
                        <th className="px-4 py-2 border">ID No</th>
                        <th className="px-4 py-2 border">Transaction Amount</th>
                        <th className="px-4 py-2 border">Debited To</th>
                        <th className="px-4 py-2 border">Credited To</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTransactions.length > 0 ? (
                        paginatedTransactions.map((txn) => (
                            <tr key={txn.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{txn.id}</td>
                                <td className="px-4 py-2 border">₹{txn.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border">{txn.debitedTo}</td>
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
                                <td className="px-4 py-2 border space-x-2 flex items-center justify-center">
                                    <button onClick={() => toggleView(txn.id)} className="text-gray-600 hover:text-gray-800">
                                        {viewed[txn.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4 text-gray-500">
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
</div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
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

export default TransactionTable;
