import React from 'react';

type PetCardProps = {
    imageUrl: string;
    petName: string;
    parentName: string;
    breed: string;
    contactNumber: string;
    address: string;
    onAccept?: () => void;
    onReject?: () => void;
};

const PetCard: React.FC<PetCardProps> = ({ imageUrl, petName, parentName, breed, contactNumber, address, onAccept, onReject }) => {
    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col justify-between">
            <img src={imageUrl} alt={petName} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{petName}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Parent:</strong> {parentName}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Breed:</strong> {breed}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Contact:</strong> {contactNumber}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> {address}
            </p>
            <div className="mt-4 flex justify-between">
                <button onClick={onAccept} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                    Accept
                </button>
                <button onClick={onReject} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                    Reject
                </button>
            </div>
        </div>
    );
};

export default PetCard;
