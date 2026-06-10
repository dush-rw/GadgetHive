import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const { getProductById, products } = useProducts();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const relatedProducts = useMemo(
    () =>
      product
        ? products
            .filter(
              (p) => p.category === product.category && p.id !== product.id,
            )
            .slice(0, 4)
        : [],
    [product, products],
  );

  const discount = product
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            Product Not Found
          </h2>
          <p className="text-slate-500 mb-6 text-[15px]">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-700 font-bold text-sm"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">
          <Link
            to="/products"
            className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="bg-white rounded-[2rem] shadow-sm shadow-slate-900/3 overflow-hidden border border-slate-100 animate-fadeInUp">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="bg-slate-50 p-6 lg:p-10 xl:p-12">
              <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-white shadow-sm border border-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="p-6 lg:p-10 xl:p-12 flex flex-col">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                  <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl uppercase tracking-wider">
                    {product.category}
                  </span>
                  {discount > 0 && (
                    <span className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl">
                      -{discount}%
                    </span>
                  )}
                  {product.featured && (
                    <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-slate-200"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-bold text-slate-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="w-px h-4 bg-slate-200"></span>
                  <span className="text-sm text-slate-500 font-medium">
                    {product.reviews} reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-7">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    RFW {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-slate-400 line-through font-medium">
                      RFW {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h3 className="font-bold text-slate-900 mb-3.5 text-sm uppercase tracking-wider">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-4 py-3"
                      >
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-700 font-medium">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold text-slate-900 text-sm">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 hover:bg-slate-100 transition-colors rounded-l-2xl"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="px-5 font-bold text-slate-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 hover:bg-slate-100 transition-colors rounded-r-2xl"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.97] ${
                      added
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : product.inStock
                          ? "bg-slate-900 hover:bg-indigo-600 text-white shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {added ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    <span>
                      {added
                        ? "Added to Cart!"
                        : product.inStock
                          ? "Add to Cart"
                          : "Out of Stock"}
                    </span>
                  </button>
                  <button className="p-4 border-2 border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2.5">
                    <Truck className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2.5">
                    <Shield className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium">1 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2.5">
                    <RotateCcw className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-14 lg:mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Related Products
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  You might also like these
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
