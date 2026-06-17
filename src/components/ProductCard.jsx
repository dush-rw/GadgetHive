import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl shadow-slate-900/5 hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden border border-slate-100 hover:border-indigo-200">
      <Link to={`/products/${product.id}`} className="relative overflow-hidden bg-slate-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {discount > 0 && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-rose-500 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-amber-400 text-slate-900 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-lg shadow-amber-400/30 flex items-center gap-1">
            <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-current" />
            <span className="hidden sm:inline">Featured</span>
          </span>
        )}
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-2 sm:mb-2.5 px-2 sm:px-2.5 py-1 bg-indigo-50 rounded-lg w-fit">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`} className="flex-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-3.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-medium">({product.reviews})</span>
        </div>

        <div className="mt-auto space-y-3 sm:space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              RFW {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                RFW {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-black hover:bg-slate-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
