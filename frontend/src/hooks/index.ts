import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("authtoken:", token);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with your token storage
        console.log("authtoken:", token);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        });
        setBlogs(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};

//we made this hook to get the all blogs whenever needed by just calling the hook
//we have other options too..like locally storing all blogs, storing them in context etc...
//but this is most suitable method
