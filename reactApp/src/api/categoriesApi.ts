import axios from "axios";

const API_URL = "http://localhost:5000";

interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}/categories`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios error fetching categories:", error.response?.data || error.message);
    } else {
      console.error("❌ Unknown error fetching categories:", error);
    }
    return [];
  }
};
