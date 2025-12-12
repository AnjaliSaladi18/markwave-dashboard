// src/pages/Dashboard/Products.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";

import ProductCard from "../../components/Products/ProductCard";
import ProductForm from "../../components/Products/ProductsForm";
import ConfirmDeleteModal from "../../components/Products/ConfirmDeleteModal";

import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../features/products/productsSlice";

export default function Products() {
  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.products);
  const products = productsState.items || [];
  const loading = productsState.loading;
  const error = productsState.error;

  // UI state
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);

  // LOAD PRODUCTS FROM JSON SERVER
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // FILTER + SEARCH + SORT
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          String(p.age).includes(q)
      );
    }

    if (stockFilter !== "") {
      list = list.filter((p) => p.stock === stockFilter);
    }

    if (sortOption) {
      list.sort((a, b) => {
        const A = String(a[sortOption] || "").toLowerCase();
        const B = String(b[sortOption] || "").toLowerCase();
        return A.localeCompare(B);
      });
    }

    return list;
  }, [products, search, stockFilter, sortOption]);

  // ADD OR UPDATE PRODUCT
  const handleSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, changes: data }));
    } else {
      dispatch(addProduct(data));
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  // DELETE PRODUCT
  const confirmDelete = () => {
    if (deleteProductData) {
      dispatch(deleteProduct(deleteProductData.id));
      setDeleteOpen(false);
      setDeleteProductData(null);
    }
  };

  return (
    <div className="flex flex-col items-center pb-10 bg-white dark:bg-[#0f172a] min-h-screen animate-fadeIn px-4 sm:px-6 lg:px-10">
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00878a] mb-6">
        Products
      </h2>

      {/* SEARCH + FILTER + SORT + ADD PRODUCT */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-3 sm:gap-4 mb-8 w-full flex-wrap">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="🔍︎ Search products..."
          className="border px-3 py-2 rounded-lg text-sm sm:text-base w-[300px]
                     border-gray-700 dark:border-gray-400 
                     dark:bg-slate-900 dark:text-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER + SORT + ADD */}
        <div className="flex gap-3 flex-wrap justify-center">

          {/* STOCK FILTER */}
          <select
            className="border px-3 py-2 rounded-lg text-gray-800 dark:text-gray-300 
                       border-gray-700 dark:border-gray-400 dark:bg-slate-900 
                       w-[140px] sm:w-[170px] text-gray-500"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* SORT */}
          <select
            className="border px-3 py-2 rounded-lg text-gray-800 dark:text-gray-300 
                       border-gray-700 dark:border-gray-400 dark:bg-slate-900 
                       w-[140px] sm:w-[170px] text-gray-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="location">Location</option>
          </select>

          {/* ADD PRODUCT BUTTON */}
          <button
            onClick={() => {
              setEditingProduct(null);
              setModalOpen(true);
            }}
            className="px-6 py-2 bg-[#00878a] text-white rounded-md font-medium 
                       hover:scale-105 transition-all duration-300 btn-glow"
          >
            Add Product
          </button>

        </div>
      </div>

      {/* LOADING / ERROR */}
      {loading && <p className="text-sm mb-3">Loading products...</p>}
      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(p) => {
              setEditingProduct(p);
              setModalOpen(true);
            }}
            onDelete={(p) => {
              setDeleteProductData(p);
              setDeleteOpen(true);
            }}
          />
        ))}
      </div>

      {/* PRODUCT FORM MODAL */}
      <ProductForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        product={editingProduct}
      />

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        open={deleteOpen}
        name={deleteProductData?.name}
        onCancel={() => {
          setDeleteOpen(false);
          setDeleteProductData(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
