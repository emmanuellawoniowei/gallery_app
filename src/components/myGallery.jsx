// src/components/MyGallery.jsx
import { useState } from 'react';
import CarouselModal from './modals/carouselModal';
import { FaTrash } from 'react-icons/fa';

export default function MyGallery({ gallery, removeFromGallery }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openCarousel = (index) => setSelectedIndex(index);
    const closeCarousel = () => setSelectedIndex(null);

    if (gallery.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p className="text-xl">📭 Your gallery is empty.</p>
                <p className="mt-2">Go to the home page and ❤️ some photos to save them here.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] my-[30px] mx-[20px] md:mx-[60px] md:my-[50px]">
                {gallery.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                    >
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description || 'Saved photo'}
                            className="w-full h-48 object-cover cursor-pointer"
                            onClick={() => openCarousel(index)}
                        />
                        <div className="p-3 flex justify-between items-center">
                            <p className="text-sm text-gray-700 truncate">
                                by {photo.user.name}
                            </p>
                            <button
                                onClick={() => removeFromGallery(photo.id)}
                                className="text-red-500 hover:text-red-700 transition"
                                aria-label="Remove from gallery"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <CarouselModal
                    photos={gallery}
                    initialIndex={selectedIndex}
                    onClose={closeCarousel}
                />
            )}
        </>
    );
}