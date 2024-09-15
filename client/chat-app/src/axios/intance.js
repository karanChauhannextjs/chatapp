// services/api.js
import axios from "axios";
import { signOut } from "next-auth/react";

// const token = getItem("lToken");
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data",
  },
});

// api.interceptors.request.use(
//   async (config) => {
//     const localeLanguage = await getCookie('NEXT_LOCALE');
//     if (config && config.headers) {
//       {
//         config.headers['languagecode'] = localeLanguage ?? 'vi';
//       }
//     }
//     // Add languageStrictMode=true to the params
//     if (config && config.params) {
//       config.params['languageStrictMode'] = true;
//     } else {
//       config.params = { languageStrictMode: true };
//     }
//     const session = await getAccessToken();
//     if (session) {
//       config.headers.Authorization = `Bearer ${session}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== "undefined") {
      if (error.response.status === 401) {
        await signOut();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
