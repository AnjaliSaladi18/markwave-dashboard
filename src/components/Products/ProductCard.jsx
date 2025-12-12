import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ product, onEdit, onDelete }) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = product.images?.length ? product.images : ["/placeholder.png"];

  const next = () => setCurrentImage((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div
      className={`xl:w-[350px] w-full md:w-[300px] 
        bg-white dark:bg-[#1f2937] 
        dark:text-gray-200 
        rounded-xl shadow-xl p-4 relative 
        border border-[#00878a] dark:border-gray-600 transition-transform duration-300 hover:scale-[1.02] card-hover
        ${product.stock === "Out of Stock" ? "opacity-60 dark:opacity-65" : ""}
      `}
    >

      {/* STOCK + ACTION ICONS */}
      <div className="flex justify-between items-center mb-2">

        {/* Stock Badge */}
        {product.stock === "In Stock" ? (
          <span className="bg-green-200 text-green-800 dark:bg-green-700 dark:text-white px-3 py-1 rounded-lg text-xs font-medium">
            In Stock
          </span>
        ) : (
          <span className="bg-red-200 text-red-800 dark:bg-red-600 dark:text-white px-3 py-1 rounded-lg text-xs font-medium">
            Out of Stock
          </span>
        )}

        {/* Edit/Delete */}
        <div className="flex gap-3">
          <FiEdit
            className="text-black dark:text-gray-200 cursor-pointer hover:scale-110"
            size={17}
            onClick={() => onEdit(product)}
          />
          <FiTrash
            className="text-black dark:text-gray-200 cursor-pointer hover:scale-110"
            size={17}
            onClick={() => onDelete(product)}
          />
        </div>
      </div>

      {/* IMAGE CAROUSEL */}
      <div className="relative w-full h-[250px] sm:h-[170px] rounded-lg overflow-hidden mb-3">
        <img
          src={images[currentImage]}
          className="w-full h-full"
          alt={product.name}
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 
                bg-black/40 dark:bg-black/60 
                hover:bg-black/70 dark:hover:bg-black/80 
                w-7 h-7 pb-1 rounded-full transition-transform duration-200 hover:scale-110"
              onClick={prev}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-white text-xs" />
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 
                bg-black/40 dark:bg-black/60 
                hover:bg-black/70 dark:hover:bg-black/80 
                w-7 h-7 pb-1 rounded-full transition-transform duration-200 hover:scale-110"
              onClick={next}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-white text-xs" />
            </button>
          </>
        )}
      </div>

      {/* DETAILS */}
      <h3 className="text-lg font-semibold text-black dark:text-gray-200">
        {product.name}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        <span className="font-medium text-black dark:text-gray-200">Age:</span>{" "}
        {product.age} years
      </p>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        <span className="font-medium text-black dark:text-gray-200">Location:</span>{" "}
        {product.location}
      </p>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        <span className="font-medium text-black dark:text-gray-200">ID:</span>{" "}
        {product.id}
      </p>

      <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-3">
        {product.description}
      </p>

      {/* PRICE & INSURANCE */}
      <p className="text-gray-900 dark:text-gray-100 font-semibold mt-3">
        Price: ₹{product.price?.toLocaleString()}
      </p>

      <p className="text-gray-600 dark:text-gray-400 text-xs">
        Insurance: ₹{product.insurance?.toLocaleString()}
      </p>
    </div>
  );
}
