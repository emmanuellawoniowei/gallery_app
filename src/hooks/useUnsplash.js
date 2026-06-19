import { useRef, useState, useEffect } from "react";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'


export const useUnsplash = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const lastRequestTime = useRef(0);

    const canMakeRequest = () => {
        const now = Date.now();
        if(now - lastRequestTime.current < 3000) return false;
        lastRequestTime.current = now;
        return true;

    }

    const fetchRandomPhotos = async (count = 24) => {
        if(!canMakeRequest()) return;

        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(`${BASE_URL}/photos/random?count=${count}`, {
                headers: { 'Authorization': `Client-ID ${ACCESS_KEY}`}
            });

            if(!response.ok) throw new Error(`API Error ${response.status}`)

            const data = await response.json()
            setPhotos(data)


        } catch (error) {
            setError(error.message)
        }finally{
            setIsLoading(false);
        };
    };


    
    const searchPhotos = async(query) => {
        if (!query.trim()) return;
        if(!canMakeRequest()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch (`${BASE_URL}/search/photos?query=${query}&per_page=24`, {
                headers: { Authorization: `Client-ID ${ACCESS_KEY}`},
            })

            if (!response.ok) {
                console.log("ERROR RESPONSE:", text);
                throw new Error(`API Error ${response.status}`);
            }

            const data = await response.json();
            setPhotos(data.results);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
       fetchRandomPhotos()
    },[]);

    return { photos, isLoading, error, fetchRandomPhotos, searchPhotos }
}