import axios from "axios";

const API_URL = "http://localhost:5000";

interface Post {
  id: number;
  title: string;
  content: string;
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(`${API_URL}/posts`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios error fetching posts:", error.response?.data || error.message);
    } else {
      console.error("❌ Unknown error fetching posts:", error);
    }
    return [];
  }
};

export const getPostById = async (id: number): Promise<Post | null> => {
  try {
    const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios error fetching post:", error.response?.data || error.message);
    } else {
      console.error("❌ Unknown error fetching post:", error);
    }
    return null;
  }
};
