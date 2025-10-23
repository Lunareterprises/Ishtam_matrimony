import React from 'react'
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaCircleChevronRight } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

function ImageGalleryModal({ images, currentIndex, setCurrentIndex, isOpen, setIsOpen }) {

  if (!isOpen || !images || images.length === 0) return null;

  const closeModal = () => setIsOpen(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 transition-colors"
      >
        <RxCross2 size={32} />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-4 md:left-6 text-white z-50 bg-black/40 rounded-full p-2 backdrop-blur-sm hover:bg-black/60 hover:scale-110 transition-all"
        >
          <FaChevronCircleLeft size={28} />
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-5xl max-h-[90vh] mx-auto px-8 md:px-16">
        <img
          src={`https://lunarsenterprises.com:6050${images[currentIndex]?.uf_file}`}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg transition-opacity duration-500 ease-in-out opacity-100"
        />

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-4 md:right-6 text-white z-50 bg-black/40 rounded-full p-2 backdrop-blur-sm hover:bg-black/60 hover:scale-110 transition-all"
        >
          <FaCircleChevronRight size={28} />
        </button>
      )}
    </div>
  )
}

export default ImageGalleryModal
