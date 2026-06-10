import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { categories } from "../data/products";

export default function Products() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (categoryParam !== "all") {
      filtered = filtered.filter((p) => p.category === categoryParam);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [categoryParam, search, sortBy]);

  const handleCategoryChange = (catId) => {
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const updatedCategories = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        count:
          cat.id === "all"
            ? products.length
            : products.filter((p) => p.category === cat.id).length,
      })),
    [products],
  );

  const activeCategory =
    updatedCategories.find((c) => c.id === categoryParam) ||
    updatedCategories[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium capitalize">
              {activeCategory.name}
            </span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeCategory.name}
          </h1>
          <p className="text-slate-500 mt-2 text-[15px]">
            {categoryParam === "all"
              ? "Browse our complete collection of premium tech gadgets"
              : `Explore our ${activeCategory.name.toLowerCase()} collection`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-sm shadow-slate-900/3 p-6 lg:sticky lg:top-24 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                Categories
              </h3>
              <ul className="space-y-1.5">
                {updatedCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center justify-between text-sm font-medium ${
                        categoryParam === cat.id
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-lg font-bold ${
                          categoryParam === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm shadow-slate-900/3 p-4 sm:p-6 mb-8 border border-slate-100">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className={`animate-fadeInUp stagger-${(i % 4) + 1}`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-24">
                  <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <p className="text-center text-slate-400 text-sm mt-10 font-medium">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
