import axios from "./axiosInstance";
//  ==============================================================================================
export const getAdminProfile = async (): Promise<any> => {
  try {
    const response = await axios.get("/admin/profile");
    console.log("✅ Admin profile:", response.data);
    return response;
  } catch (error: any) {
    console.error("❌ getAdminProfile error:", error);
    throw error; // ✅ Keep the original Axios error object
  }
};
//  ==============================================================================================
export const editAdminProfile = async (payload: any): Promise<any> => {
  try {
    const response = await axios.patch("/admin/editProfile", payload);
    console.log("✅ Admin profile updated:", response.data);
    return response;
  } catch (error: any) {
    console.error("❌ editAdminProfile error:", error?.response || error);

    const errorMessage =
      error?.response?.data?.message || "Failed to update admin profile";
    throw new Error(errorMessage);
  }
};

//  ==============================================================================================
interface ResetPasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const resetPasswordAdmin = async (payload: ResetPasswordPayload): Promise<any> => {
  console.log("reset password");
  
  try {
    const response = await axios.post('/admin/reset-password', payload);
    console.log("✅ Password reset successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ resetPasswordAdmin error:", error?.response || error);

    const errorMessage =
      error?.response?.data?.message || "Failed to reset password";
    throw new Error(errorMessage);
  }
};

//  ==============================================================================================


