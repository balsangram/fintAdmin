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
  // console.log("reset password");

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
// Advertisement 
// ===============================================================================================


export const getAdminAdvertisements = async () => {
  try {
    const response = await axios.get("/admin/advertisements");
    console.log("🚀 ~ getAdminAdvertisements ~ response:", response);
    return response;
  } catch (error) {
    console.error("❌ Error fetching admin advertisements:", error);

    // Optional: Re-throw if you want to handle it higher up
    throw error;
  }
};
// ===============================================================================================
// coupons 
// ===============================================================================================
export const getAllCoupons = async () => {
  try {
    const response = await axios.get("/fint/coupons/display-all-coupons");
    console.log("🚀 ~ getAllCoupons ~ response:", response);
    return response.data; // ✅ RETURN the actual data
  } catch (error) {
    console.log("🚀 ~ getAllCoupons ~ error:", error)
    throw error;
  }
}

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
export const add_LinkLog = "/user/add-LinkLog";
export const Home_Type_importance_id = "/user/get-user-Type-importance-id";
export const Home_user_Type_importance = "/user/add-user-Type-importance";
export const Stay_Updated = "/fint/cards/stay-updated";
export const all_search = "/fint/search/all-search";
// ===============================================================================================

// ===============================================================================================