import React from 'react';

type DonorCardProps = {
    imageUrl: string;
    name: string;
    bloodGroup: string;
    contactNumber: string;
    onEdit?: () => void;
    onDelete?: () => void;
};

const DonorCard: React.FC<DonorCardProps> = ({ imageUrl, name, bloodGroup, contactNumber, onEdit, onDelete }) => {
    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Blood Group: <strong>{bloodGroup}</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Contact: <strong>{contactNumber}</strong>
                </p>
            </div>
            <div className="mt-4 flex justify-around">
                <button onClick={onEdit} className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    Edit
                </button>
                <button onClick={onDelete} className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DonorCard;
