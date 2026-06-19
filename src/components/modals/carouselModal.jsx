// src/components/CarouselModal.jsx
import { useEffect, useState, useCallback } from 'react';
import { FaDownload } from "react-icons/fa";

export default function CarouselModal({ photos, initialIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const currentPhoto = photos[currentIndex];

    const handleDownload = async () => {
        const imageUrl = currentPhoto.urls.full;

        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentPhoto.id}.jpg`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    // Navigation functions
    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    }, [photos.length]);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, [photos.length]);

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') goPrev();
            else if (e.key === 'ArrowRight') goNext();
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goPrev, goNext, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    if (!currentPhoto) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={onClose}  // Click backdrop closes modal
        >
            {/* Modal content container – prevents click on image from closing */}
            <div
                className="relative max-w-5xl w-full mx-4 bg-gray-900 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image area */}
                <div className="relative">
                    <img
                        src={currentPhoto.urls.regular}
                        alt={currentPhoto.alt_description || 'Unsplash photo'}
                        className="w-full max-h-[80vh] object-contain bg-black"
                    />

                    <button
                        type="button"
                        onClick={handleDownload}
                        className="absolute top-3 right-15 bg-black/80 text-white p-2 rounded-full transition hover:scale-110">
                        <FaDownload />
                    </button>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
                    >
                        ✕
                    </button>
                    {/* Previous button */}
                    <button
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
                    >
                        ‹
                    </button>
                    {/* Next button */}
                    <button
                        onClick={goNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
                    >
                        ›
                    </button>
                </div>

                {/* Photo info footer */}
                <div className="p-4 text-white bg-gray-800">
                    <p className="text-sm text-gray-300">
                        {currentPhoto.user?.name} • {currentPhoto.likes} likes
                    </p>
                    <p className="text-sm">
                        {currentPhoto.description || currentPhoto.alt_description || 'No description'}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                        <span>📏 {currentPhoto.width} × {currentPhoto.height}</span>
                        <span>{currentIndex + 1} / {photos.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}