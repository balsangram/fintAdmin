// import React, { useState } from 'react';
// import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
// import { MdBlock } from 'react-icons/md';

// type User = {
//     rollNo: string;
//     userName: string;
//     accountType: string;
//     createdAt: string;
// };

// type Props = {
//     users: User[];
// };

// const UserTable: React.FC<Props> = ({ users }) => {
//     const [visibleEyes, setVisibleEyes] = useState<{ [key: number]: boolean }>(() => users.reduce((acc, _, index) => ({ ...acc, [index]: true }), {}));

//     const toggleEye = (index: number) => {
//         setVisibleEyes((prev) => ({
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
//                         <th className="py-2 px-4">User Name</th>
//                         <th className="py-2 px-4">Account Type</th>
//                         <th className="py-2 px-4">Account Created On</th>
//                         <th className="py-2 px-4">Permissions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
//                             <td className="py-2 px-4">{user.rollNo}</td>
//                             <td className="py-2 px-4">{user.userName}</td>
//                             <td className="py-2 px-4">{user.accountType}</td>
//                             <td className="py-2 px-4">{user.createdAt}</td>
//                             <td className="py-2 px-4 flex space-x-3">
//                                 {visibleEyes[index] ? (
//                                     <Eye className="cursor-pointer text-blue-500 hover:text-blue-700" size={18} onClick={() => toggleEye(index)} />
//                                 ) : (
//                                     <EyeOff className="cursor-pointer text-gray-500 hover:text-gray-700" size={18} onClick={() => toggleEye(index)} />
//                                 )}
//                                 <Pencil className="cursor-pointer text-green-500 hover:text-green-700" size={18} />
//                                 <MdBlock className="cursor-pointer text-yellow-500 hover:text-yellow-700" size={18} />
//                                 <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" size={18} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserTable;
// export type { User };


import React, { useState } from 'react';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { MdBlock } from 'react-icons/md';

type User = {
    rollNo: string;
    userName: string;
    accountType: string;
    createdAt: string;
};

type Props = {
    users: User[];
};

const UserTable: React.FC<Props> = ({ users }) => {
    const [visibleEyes, setVisibleEyes] = useState<{ [key: number]: boolean }>(
        () => users.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
    );

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const toggleEye = (index: number) => {
        setVisibleEyes((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) =>
            value.toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="">
            {/* Search Box */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

<div className='overflow-x-auto'>
            {/* Table */}
            <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
                        <th className="py-2 px-4">Roll No</th>
                        <th className="py-2 px-4">User Name</th>
                        <th className="py-2 px-4">Account Type</th>
                        <th className="py-2 px-4">Account Created On</th>
                        <th className="py-2 px-4">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => (
                        <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-2 px-4">{user.rollNo}</td>
                            <td className="py-2 px-4">{user.userName}</td>
                            <td className="py-2 px-4">{user.accountType}</td>
                            <td className="py-2 px-4">{user.createdAt}</td>
                            <td className="py-2 px-4 flex space-x-3">
                                {visibleEyes[index] ? (
                                    <Eye className="cursor-pointer text-blue-500 hover:text-blue-700" size={18} onClick={() => toggleEye(index)} />
                                ) : (
                                    <EyeOff className="cursor-pointer text-gray-500 hover:text-gray-700" size={18} onClick={() => toggleEye(index)} />
                                )}
                                <Pencil className="cursor-pointer text-green-500 hover:text-green-700" size={18} />
                                <MdBlock className="cursor-pointer text-yellow-500 hover:text-yellow-700" size={18} />
                                <Trash2 className="cursor-pointer text-red-500 hover:text-red-700" size={18} />
                            </td>
                        </tr>
                    ))}

                    {paginatedUsers.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-500 py-4">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

           </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1
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

export default UserTable;
export type { User };
