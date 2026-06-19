import { useState } from "react";
import LoadingSpinner from "./loadingSpinner.jsx";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import CarouselModal from "./modals/carouselModal.jsx";
import { handleDownload } from "../utilities/download";
import { FaDownload } from "react-icons/fa";

const PhotoGrid = ({ 
    photos = [], 
    isLoading, 
    error, 
    addToGallery, 
    removeFromGallery, 
    isInGallery }) => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const openModal = (index) => setSelectedPhotoIndex(index);
    const closeModal = () => setSelectedPhotoIndex(null);

    console.log(photos);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;
    if (!Array.isArray(photos) || photos.length === 0) return <div className="text-center">No photos found. Try randomizing!</div>;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] my-[30px] mx-[20px] md:mx-[60px] md:my-[50px]">
                {photos.map((photo, index) => (

                    <div key={photo.id} className="relative group bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
                        <img src={photo.urls.small} alt={photo.alt_description || "Unsplash photo"}
                            className="w-full h-48 object-cover cursor-pointer" onClick={() => openModal(index)} 
                        />

                        <div className="p-3 flex justify-between items-center">
                            <p className="text-sm text-gray-700 truncate">by {photo.user.name}</p>

                            <button
                                onClick={() => isInGallery(photo.id) ? removeFromGallery(photo.id) : addToGallery(photo)}>
                                <span className="text-xl">{
                                    isInGallery(photo.id) ? <FcLike /> : <FcLikePlaceholder /> }
                                </span>
                            </button>

                            <button 
                                type="button"
                                onClick={() => handleDownload(photo)}
                                className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded-full transition hover:scale-110">
                                <FaDownload />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPhotoIndex !== null && (
                <CarouselModal photos={photos} initialIndex={selectedPhotoIndex} onClose={closeModal} />
            )}
        </>
    )
}

export default PhotoGrid;