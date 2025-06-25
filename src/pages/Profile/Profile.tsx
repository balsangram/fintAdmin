import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';

// Define interface for form data
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    pincode: string;
    mobileNo: string;
}

const Profile: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: 'Ravi',
        lastName: 'Kumar',
        email: 'ravi.kumar@example.com',
        address: '123, MG Road, Bengaluru',
        pincode: '560001',
        mobileNo: '9876543210',
    });
    const [profileImage, setProfileImage] = useState<string>('/assets/fintImg/person/admin.jpg');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Perform save logic here (e.g., API call to save formData and profileImage)
    };

    const handleDiscard = () => {
        setIsEditing(false);
        setFormData({
            firstName: 'Ravi',
            lastName: 'Kumar',
            email: 'ravi.kumar@example.com',
            address: '123, MG Road, Bengaluru',
            pincode: '560001',
            mobileNo: '9876543210',
        });
        setProfileImage('/assets/fintImg/person/admin.jpg');
    };

    return (
        <div className="fullBackground m-0 p-0">
            {/* <nav className="flex text-gray-500 font-semibold dark:text-white-dark space-x-2 px-4 sm:px-6">
                <ol className="flex items-center">
                    <li>
                        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Home</button>
                    </li>
                    <li className="mx-2">/</li>
                    <li>
                        <button className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Profile</button>
                    </li>
                </ol>
            </nav> */}
            <div className="mx-auto p-4 sm:p-6   dark:bg-gray-900 mt-6 sm:mt-10 ">
                <div className="flex flex-col items-center mb-6 relative">
                    <img src={profileImage} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover mb-2" />
                    {isEditing && <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="text-xs sm:text-sm text-gray-500 mt-2" />}
                    <button onClick={handleEditToggle} className="absolute top-0 right-0 p-2 text-gray-700 dark:text-white hover:text-gray-500" aria-label="Edit Profile">
                        <FaEdit size={18} className="sm:w-5 sm:h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={!isEditing}
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly={!isEditing}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="block text-gray-700 dark:text-white text-sm sm:text-base mb-1">Mobile No</label>
                            <input
                                type="text"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm sm:text-base border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly={!isEditing}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 mx-0 sm:mx-8">
                            <button
                                type="button"
                                onClick={handleDiscard}
                                className="px-4 py-2 rounded-md border bg-[#056972] border-gray-300 dark:border-white text-white dark:text-white hover:bg-[#0A3425] dark:hover:bg-gray-800 w-full sm:w-40 md:w-48 lg:w-64 text-sm sm:text-base"
                            >
                                Discard Changes
                            </button>
                            <button type="button" onClick={handleSave} className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-600 w-full sm:w-40 md:w-48 lg:w-64 text-sm sm:text-base">
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
