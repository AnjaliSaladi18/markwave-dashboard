import { useState, useEffect } from "react";

export default function ProductForm({ open, onClose, onSubmit, product }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    description: "",
    images: [],
    stock: "In Stock",
    price: "",
    insurance: "",
  });

  useEffect(() => {
    if (open) {
      setForm(
        product
          ? { ...product }
          : {
              name: "",
              age: "",
              location: "",
              description: "",
              images: [],
              stock: "In Stock",
              price: "",
              insurance: "",
            }
      );
    }
  }, [open, product]);

  if (!open) return null;

  const generateId = (name) => {
    const code = Math.floor(100 + Math.random() * 900);
    const base = name.split(" ")[0].toUpperCase();
    return `${base}-${code}`;
  };

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImageAt = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Name required!");
      return;
    }

    const id = product ? product.id : generateId(form.name);
    onSubmit({ ...form, id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#1f2937] w-[90%] md:max-w-[650px] p-4 dark:text-gray-200 rounded-xl shadow-xl p-4 w-full max-w-[650px] transition modal-zoom">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-[#00878a] dark:text-[#4dd0d0]">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button className="text-gray-600 dark:text-gray-300 text-lg" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={submit}>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* NAME */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Buffalo Name:
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                placeholder="Buffalo Name"
              />
            </div>

            {/* AGE */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Age:
              </label>
              <input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                placeholder="Age"
              />
            </div>

            {/* LOCATION */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Location:
              </label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                placeholder="Location"
              />
            </div>

            {/* STOCK */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Stock Status:
              </label>
              <select
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
              >
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div />

            {/* DESCRIPTION */}
            <div className="flex flex-col col-span-2">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Description:
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                rows={3}
                placeholder="Description"
              />
            </div>

            {/* PRICE */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Price (₹):
              </label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                placeholder="Price"
              />
            </div>

            {/* INSURANCE */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">
                Insurance (₹):
              </label>
              <input
                value={form.insurance}
                onChange={(e) => setForm({ ...form, insurance: e.target.value })}
                className="focus:outline-none focus:ring-0 border p-1 rounded text-sm bg-white dark:bg-[#374151] dark:border-gray-500 dark:text-gray-200"
                placeholder="Insurance"
              />
            </div>
          </div>

          {/* IMAGE PREVIEW + FILE UPLOAD */}
          <div className="flex gap-10 mt-3">

            {/* IMAGE PREVIEW */}
            <div>
              <label className="text-sm font-medium text-gray-800 dark:text-gray-300">
                Images:
              </label>

              <div className="flex gap-2 flex-wrap mt-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      className="w-20 h-14 rounded object-cover border dark:border-gray-500"
                    />

                    <button
                      type="button"
                      onClick={() => removeImageAt(i)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex justify-center items-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FILE UPLOAD */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                Add Images:
              </label>

              <label
                htmlFor="fileUpload"
                className="px-2 py-1 border border-[#00878a] text-[#00878a] 
                dark:border-[#4dd0d0] dark:text-[#4dd0d0] 
                rounded cursor-pointer hover:bg-[#00878a] hover:text-white 
                dark:hover:bg-[#4dd0d0] dark:hover:text-black transition text-sm"
              >
                Choose Files
              </label>

              <input
                id="fileUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={onFiles}
                className="hidden"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-[#00878a] dark:bg-[#0d999c] text-white rounded font-medium btn-glow"
            >
              {product ? "Save" : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
