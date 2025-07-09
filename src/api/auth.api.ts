// src/api/auth.api.ts
import axios from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
}

export const loginAdmin = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await axios.post("/admin/login", payload);
    console.log("✅ loginUser response:", response);
    return response.data.data; // assuming backend returns { statusCode, data, ... }
  } catch (error: any) {
    console.error("❌ loginUser error:", error);

    // Extract and throw useful error message
    const errorMessage =
      error?.response?.data?.message || "Login failed. Please try again.";

    throw new Error(errorMessage);
  }
};

export const logoutAdmin = async (): Promise<string> => {
  try {
    const response = await axios.post("/admin/logout"); // ✅ Corrected endpoint
    console.log("✅ Logout response:", response.data);
    return response.data.message || "Logout successful";
  } catch (error: any) {
    console.error("❌ Logout error:", error);

    const errorMessage =
      error?.response?.data?.message || "Logout failed. Please try again.";
    throw new Error(errorMessage);
  }
};

export const refreshAccessToken = async () => {
  try {
    console.log("refress token api");
    
    const response = await axios.post("/admin/refresh-token");
    console.log("✅ Token refreshed successfully",response);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to refresh access token:", error?.response || error);
    throw error;
  }
};