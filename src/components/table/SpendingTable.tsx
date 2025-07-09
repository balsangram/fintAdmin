import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";

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
    const [addCategory, setAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const itemsPerPage = 10;

    const togglePermission = (index: number) => {
        setPermissions((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleAddCategory = () => {
        if (newCategory.trim() === '') {
            alert('Category name cannot be empty');
            return;
        }
        console.log('New category added:', newCategory);
        setNewCategory('');
        setAddCategory(false);
    };

    const openForm = () => {
        setAddCategory(true);
    };

    const displayCategory = () => {
        setShowCategories(true);
    };

    const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));

    const handleEditCategory = (category: string) => {
        setEditingCategory(category);
        setEditCategoryName(category);
    };

    const handleSaveEdit = (originalCategory: string) => {
        if (editCategoryName.trim() === '') {
            alert('Category name cannot be empty');
            return;
        }
        console.log(`Category updated from "${originalCategory}" to "${editCategoryName}"`);
        // Here you would typically make an API call to update the category
        setEditingCategory(null);
        setEditCategoryName('');
    };

    const handleDeleteCategory = (category: string) => {
        if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
            console.log(`Category deleted: ${category}`);
            // Here you would typically make an API call to delete the category
        }
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
        <>
            {/* Add Category Modal */}
            {addCategory && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Category</h2>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setNewCategory('');
                                    setAddCategory(false);
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCategory}
                                disabled={!newCategory.trim()}
                                className={`px-4 py-2 rounded-lg text-white transition ${newCategory.trim()
                                        ? 'bg-[#0E0955] hover:bg-blue-700'
                                        : 'bg-blue-300 cursor-not-allowed'
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Categories Popup */}
            {showCategories && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Categories</h2>
                        <div className="max-h-64 overflow-y-auto mb-4">
                            {uniqueCategories.length > 0 ? (
                                uniqueCategories.map((category) => (
                                    <div
                                        key={category}
                                        className="flex items-center justify-between py-2 border-b border-gray-200"
                                    >
                                        {editingCategory === category ? (
                                            <div className="flex items-center w-full space-x-2">
                                                <input
                                                    type="text"
                                                    value={editCategoryName}
                                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                                    className="flex-1 px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E0955]"
                                                />
                                                <button
                                                    onClick={() => handleSaveEdit(category)}
                                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingCategory(null)}
                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center w-full space-x-2">
                                                <span className="flex-1">{category}</span>
                                                <button
                                                    onClick={() => handleEditCategory(category)}
                                                    className="px-3 py-1 bg-blue-400 text-white rounded-lg hover:bg-[#0A0744] transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No categories available.</p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowCategories(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4">
                {/* Search Input and Buttons */}
                <div className="mb-4 flex justify-between items-center ">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-1/2 sm:w-1/3 md:w-1/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <div className="flex space-x-2">
                        <div className=' sm:hidden flex gap-2'>
                            <button
                                onClick={openForm}
                                className="bg-[#0E0955] text-white rounded-md px-4 py-2 hover:bg-[#0a0744] transition"
                            >
                               <IoMdAddCircleOutline />
                            </button>
                            <button
                                onClick={displayCategory}
                                className="bg-[#0E0955] text-white rounded-md px-4 py-2 hover:bg-[#0a0744] transition"
                            >
                                <MdEditDocument />
                            </button>
                        </div>
                        <div className=' hidden sm:flex sm:gap-4'>
                            <button
                                onClick={openForm}
                                className="bg-[#0E0955] text-white rounded-md px-4 py-2 hover:bg-[#0a0744] transition"
                            >
                                Add Category
                            </button>
                            <button
                                onClick={displayCategory}
                                className="bg-[#0E0955] text-white rounded-md px-4 py-2 hover:bg-[#0a0744] transition"
                            >
                                Manage Categories
                            </button>
                        </div>

                    </div>
                </div>

                <div className="overflow-x-auto">
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
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <td className="py-2 px-4">{item.rollNo}</td>
                                    <td className="py-2 px-4">{item.userName}</td>
                                    <td className="py-2 px-4">{item.spentOn}</td>
                                    <td className="py-2 px-4">{item.spentDate}</td>
                                    <td className="py-2 px-4">₹{item.amount.toFixed(2)}</td>
                                    <td className="py-2 px-4">{item.category}</td>
                                    <td className="py-2 px-4 flex items-center gap-2">
                                        {permissions[index] ? (
                                            <Eye
                                                className="cursor-pointer text-green-500 hover:text-green-700"
                                                size={20}
                                                onClick={() => togglePermission(index)}
                                            />
                                        ) : (
                                            <EyeOff
                                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                                                size={20}
                                                onClick={() => togglePermission(index)}
                                            />
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
                                className={`px-3 py-1 rounded border ${currentPage === i + 1
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
        </>
    );
};

export default SpendingTable;