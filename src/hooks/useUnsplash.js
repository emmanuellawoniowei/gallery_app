import { useState, useEffect } from "react"

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const BASE_URL = 'https://api.unsplash.com'

export const useUnsplash = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomPhotos = async (count = 24) => {
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
            console.log("Error fetching Photos");
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
       fetchRandomPhotos()
    },[])

    return { photos, isLoading, error, fetchRandomPhotos }
}