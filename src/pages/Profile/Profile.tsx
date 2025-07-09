import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { editAdminProfile, getAdminProfile } from '../../api/all.api';

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
            firstName: '',
    lastName: '',
    email: '',
    address: '',
    pincode: '',
    mobileNo: '',
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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getAdminProfile(); // ✅ this returns full axios response
                console.log(response, "response");

                // ✅ Assuming structure: { data: { statusCode, data, message, success } }
                setFormData(response.data.data); // ✅ Access nested data here
            } catch (error) {
                console.log("❌ Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);
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

const handleSave = async () => {
    try {
        console.log("📤 Sending profile update...");
        const response = await editAdminProfile(formData); // Send updated form data
        console.log("✅ Profile updated successfully:", response.data);

        setFormData(response.data.data); // Update formData with response (in case backend altered it)
        setIsEditing(false);
    } catch (error) {
        console.error("❌ Failed to update profile:", error);
        // Optionally show user feedback here
    }
};

const handleDiscard = async () => {
    try {
        const response = await getAdminProfile(); // ✅ Fetch latest profile
        setFormData(response.data.data);
        setProfileImage('/assets/fintImg/person/admin.jpg'); // Optional: fetch from API if dynamic
    } catch (error) {
        console.error("❌ Failed to reset profile:", error);
    } finally {
        setIsEditing(false);
    }
};

    return (
        <div className="fullBackground m-0 p-0">

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
