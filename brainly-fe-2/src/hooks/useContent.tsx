// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

// export function useContent() {
//     const [contents, setContents] = useState([]);

//     function refresh() {
//         axios.get(`${BACKEND_URL}/api/v1/content`, {
//             headers: {
//                 "Authorization": localStorage.getItem("token")
//             }
//         })
//             .then((response) => {
//                 setContents(response.data.content)
//             })
//     }

//     useEffect(() => {
//         refresh()
//         let interval = setInterval(() => {
//             refresh()
//         }, 10 * 1000)

//         return () => {
//             clearInterval(interval);
//         }
//     }, [])

//     return {contents, refresh};
// }

import { useState, useCallback } from 'react';
import api from '../lib/api';

// This interface defines the shape of a single content item from your backend.
export interface IContent {
    _id: string;
    title: string;
    link: string;
    type: 'youtube' | 'twitter' | 'reddit' | 'instagram' | 'link' | 'article' | 'facebook';
    createdAt: string;
    updatedAt: string;
}

// This interface defines the shape of the object returned by our custom hook.
interface UseContentReturn {
    contents: IContent[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    removeContent: (contentId: string) => void;
}

export function useContent(): UseContentReturn {
    const [contents, setContents] = useState<IContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useCallback ensures this function isn't recreated on every render,
    // which is a performance optimization.
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Define the expected shape of the API response for type safety.
            const response = await api.get<{ content: IContent[] }>('/api/v1/content');
            setContents(response.data.content);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch content.");
            // In case of an error, clear out any old content to avoid showing stale data.
            setContents([]);
        } finally {
            setLoading(false);
        }
    }, []); // The empty dependency array means this function is created once and memoized.
    
    // This function allows for "optimistic updates". We remove the item from the UI
    // immediately without waiting for the API call to complete, making the app feel faster.
    const removeContent = useCallback((contentId: string) => {
        setContents(prevContents => prevContents.filter(content => content._id !== contentId));
    }, []);

    return { contents, loading, error, refresh, removeContent };
}


// import { useState, useCallback } from 'react';
// import api from '../lib/api';

// export interface IContent {
//     _id: string;
//     title: string;
//     link: string;
//     type: 'youtube' | 'twitter' | 'reddit' | 'instagram' | 'link' | 'article' | 'facebook';
//     createdAt: string;
//     updatedAt: string;
// }

// export function useContent() {
//     const [contents, setContents] = useState<IContent[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const refresh = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await api.get<{ content: IContent[] }>('/api/v1/content');
//             setContents(response.data.content);
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to fetch content.");
//         } finally {
//             setLoading(false);
//         }
//     }, []);
    
//     const removeContent = useCallback((contentId: string) => {
//         setContents(prev => prev.filter(c => c._id !== contentId));
//     }, []);

//     return { contents, loading, error, refresh, removeContent };
// }