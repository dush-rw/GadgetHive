import { useMemo, useState } from "react";
import { useProducts } from "../context/useProducts";
import { Link } from "react-router-dom";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

export default function Admin() {
  const { products, addProduct, removeProduct } = useProducts();
  const [form, setForm] = useState({
    name: "",
    category: "accessories",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    rating: "4.5",
    reviews: "0",
    featured: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice);
    if (
      !form.name ||
      !form.category ||
      !price ||
      !originalPrice ||
      !form.image ||
      !form.description
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    addProduct({
      name: form.name,
      category: form.category,
      price,
      originalPrice,
      image: form.image,
      description: form.description,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      featured: form.featured,
      specs: ["New product", "Owner added"],
    });
    setMessage("Product added successfully.");
    setForm({
      name: "",
      category: "accessories",
      price: "",
      originalPrice: "",
      image: "",
      description: "",
      rating: "4.5",
      reviews: "0",
      featured: false,
    });
  };

  const handleRemove = (id) => {
    removeProduct(id);
  };

  const totalProducts = products.length;
  const featuredCount = useMemo(
    () => products.filter((p) => p.featured).length,
    [products],
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
        </Link>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 text-white p-10 sm:p-12">
            <h1 className="text-4xl font-extrabold">Store Owner Dashboard</h1>
            <p className="mt-3 text-slate-100 max-w-2xl">
              Add or remove products here. Checkout is available to all
              visitors.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-6 sm:p-10">
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Add New Product
                </h2>
                {message && (
                  <div className="mb-5 rounded-3xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-sm text-emerald-700">
                    {message}
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Product Name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      placeholder="Wireless Earbuds"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Category
                    </span>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="accessories">Accessories</option>
                      <option value="audio">Audio</option>
                      <option value="wearables">Wearables</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Price
                    </span>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      placeholder="45000"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Original Price
                    </span>
                    <input
                      name="originalPrice"
                      type="number"
                      value={form.originalPrice}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      placeholder="55000"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">
                      Image URL
                    </span>
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      placeholder="https://example.com/image.jpg"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">
                      Product Description
                    </span>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      placeholder="Short product description"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Rating
                    </span>
                    <input
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={form.rating}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Reviews
                    </span>
                    <input
                      name="reviews"
                      type="number"
                      value={form.reviews}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="flex items-center gap-3 sm:col-span-2">
                    <input
                      name="featured"
                      type="checkbox"
                      checked={form.featured}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-700">
                      Mark product as featured
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Store Summary
                </h2>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex justify-between gap-4">
                    <span>Total products</span>
                    <strong className="text-slate-900">{totalProducts}</strong>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Featured products</span>
                    <strong className="text-slate-900">{featuredCount}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Manage Product List
                </h2>
                <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-3xl border border-slate-200 p-4 bg-slate-50 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {product.category} • RFW{" "}
                          {product.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="inline-flex items-center gap-2 rounded-3xl bg-rose-50 text-rose-700 px-4 py-2 text-sm font-semibold hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
